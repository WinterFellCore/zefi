import type { APIRoute } from 'astro';

// Configuração da API (mesma do x86)
const API_URL = 'https://xereca-auth.vercel.app/api/verify';
const DISCORD_API_URL = 'https://discord-lookup-id.vercel.app/api/discord';
const APP_VERSION = '1.0';

// Função para buscar dados do Discord
async function fetchDiscordData(discordId: string) {
  try {
    const response = await fetch(`${DISCORD_API_URL}?id=${discordId}`);
    if (!response.ok) return null;
    
    const data = await response.json();
    return {
      username: data.username || '',
      global_name: data.global_name || data.username || '',
      avatar_url: data.avatar_url || '',
    };
  } catch (error) {
    console.error('Error fetching Discord data:', error);
    return null;
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { discord_id } = body;

    if (!discord_id) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Discord ID é obrigatório',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Chamar API de autenticação (mesma do x86)
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: discord_id,
        hwid: 'web-' + Date.now(), // HWID temporário para web
        version: APP_VERSION,
      }),
    });

    const data = await response.json();

    if (data.ok || data.allowed) {
      // Buscar informações do Discord (mesma API do x86)
      const discordUser = await fetchDiscordData(discord_id);

      // Gerar token simples (em produção, use JWT)
      const token = btoa(`${discord_id}:${Date.now()}`);

      return new Response(
        JSON.stringify({
          success: true,
          token,
          user: {
            discord_id,
            allowed: true,
            expires_at: data.expires_at,
            username: discordUser?.username || '',
            global_name: discordUser?.global_name || '',
            avatar_url: discordUser?.avatar_url || '',
          },
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: data.message || 'Acesso negado. Verifique seu Discord ID.',
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    console.error('Auth error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Erro no servidor. Tente novamente mais tarde.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};

