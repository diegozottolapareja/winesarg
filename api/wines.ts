import { createClient } from '@supabase/supabase-js';

// 1. Capturar y validar variables de entorno
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las variables de entorno SUPABASE_URL y/o SUPABASE_ANON_KEY en el servidor.');
}

// 2. Inicializar el cliente (fuera del handler para optimizar conexiones)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const config = {
  runtime: 'edge', // Ejecución global y veloz
};

export default async function handler(request: Request) {
  // Encabezados para manejar CORS y formato JSON
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Responder rápido al preflight de CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  // Filtrar que solo acepte peticiones GET
  if (request.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: `Método ${request.method} no permitido. Usá GET.` }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // 3. Consultar la tabla de vinos directamente en Supabase
    const { data: wines, error } = await supabase
      .from('wines')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    // Responder con los datos reales de la base de datos
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
        error: 'Error al consultar la base de datos de vinos',
        details: error instanceof Error ? error.message : String(error)
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}