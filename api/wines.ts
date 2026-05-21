import { createClient } from '@supabase/supabase-js';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  // Intentar leer de process.env o del entorno global directo de Edge
  const supabaseUrl = process.env.SUPABASE_URL || Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || Deno.env.get('SUPABASE_ANON_KEY');

  // Si siguen faltando en producción, devolvemos el error estructurado
  if (!supabaseUrl || !supabaseAnonKey) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Las credenciales no fueron inyectadas correctamente en Vercel.',
        data: [] 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    const { data: wines, error } = await supabase
      .from('wines')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;

    return new Response(
      JSON.stringify({
        success: true,
        count: wines?.length || 0,
        data: wines
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error de conexión con la tabla de Supabase',
        details: error instanceof Error ? error.message : String(error),
        data: []
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}