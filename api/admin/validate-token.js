/**
 * Validar Token de Admin
 */

export async function POST({ request }) {
  try {
    const { token } = await request.json();

    if (!token) {
      return new Response(JSON.stringify({ error: 'Token required' }), { status: 400 });
    }

    const adminToken = import.meta.env.ADMIN_TOKEN;
    
    if (token === adminToken) {
      return new Response(JSON.stringify({ valid: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ valid: false, error: 'Invalid token' }), { status: 401 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
