export const config = {
  runtime: 'edge', // Usamos el motor Edge para evitar problemas con tipos de Node locales
};

export default async function handler(request: Request) {
  // Manejar problemas de CORS básicos
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Responder rápido al preflight de CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  // Filtrar que solo acepte métodos POST
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: `Método ${request.method} no permitido. Usá POST.` }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Capturar el cuerpo del JSON enviado por el curl
    const body = await request.json();
    const { email, password, name } = body;

    // Validación básica
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Faltan datos obligatorios: email y password.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // --- MOCK DE RESPUESTA EXITOSA ---
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Usuario procesado correctamente',
        user: {
          name: name || 'Usuario WinesArg',
          email: email,
          token: 'mock-jwt-token-generado'
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Error interno o JSON inválido',
        details: error instanceof Error ? error.message : String(error)
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}