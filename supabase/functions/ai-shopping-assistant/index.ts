import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, context, user_id } = await req.json();
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }
    
    const supabase = createClient(supabaseUrl!, supabaseKey!);
    
    // Get user preferences and shopping history
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user_id)
      .single();
    
    const { data: recentLists } = await supabase
      .from('lists')
      .select('title, list_type, list_items(custom_name)')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(3);
    
    // Build context for AI
    const userContext = {
      budget_limit: profile?.budget_limit || 'Not specified',
      household_size: profile?.household_size || 1,
      dietary_restrictions: profile?.dietary_restrictions || [],
      health_preferences: profile?.health_preferences || [],
      recent_shopping: recentLists || []
    };
    
    const systemPrompt = `You are SmartBundle AI, an intelligent shopping assistant that helps users find the best deals and make smart shopping decisions. 

    User Context:
    - Budget: ${userContext.budget_limit}
    - Household Size: ${userContext.household_size}
    - Dietary Restrictions: ${userContext.dietary_restrictions.join(', ') || 'None'}
    - Health Preferences: ${userContext.health_preferences.join(', ') || 'None'}
    - Recent Shopping: ${JSON.stringify(userContext.recent_shopping)}

    Your capabilities:
    1. Product recommendations based on budget and preferences
    2. Price comparison and deal finding
    3. Bundle optimization for cost savings
    4. Health and eco-friendly alternatives
    5. Smart shopping list organization

    Always provide:
    - Specific product recommendations with estimated prices
    - Money-saving tips and bundle deals
    - Health/eco scores when relevant
    - Reasoning for your recommendations
    - Actionable next steps

    Be helpful, concise, and focus on practical advice that saves money and time.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Save recommendation to database
    const { error: saveError } = await supabase
      .from('recommendations')
      .insert([{
        user_id,
        query,
        ai_reasoning: aiResponse,
        confidence_score: 0.85 // Mock confidence score
      }]);
    
    if (saveError) {
      console.error('Error saving recommendation:', saveError);
    }
    
    return new Response(JSON.stringify({ 
      recommendation: aiResponse,
      context: userContext 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-shopping-assistant function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});