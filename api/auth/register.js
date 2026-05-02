// API de Registro Web - Cria conta com Discord ID
// Verifica se Discord ID existe no BD e se ainda não tem conta web

const API_URL = 'https://xereca-auth.vercel.app/api/register-web';
const DISCORD_API_URL = 'https://discord-lookup-id.vercel.app/api/discord';

async function fetchDiscordData(discordId) {
  try {
    const response = await fetch(`${DISCORD_API_URL}?id=${discordId}`);
    if (!response.ok) return null;
    
    const data = await response.json();
    let avatar_url = '';
    if (data.avatar && data.id) {
      avatar_url = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png?size=128`;
    }
    
    return {
      username: data.username || '',
      global_name: data.global_name || data.username || '',
      avatar_url: avatar_url,
    };
  } catch (error) {
    return null;
  }
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { discord_id, username, password, hwid } = req.body;

    // Validações
    if (!discord_id || !username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Discord ID, username e senha são obrigatórios',
      });
    }

    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({
        success: false,
        message: 'Username deve ter entre 3 e 20 caracteres',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Senha deve ter no mínimo 6 caracteres',
      });
    }

    // Chamar API xereca-auth para registrar
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        discord_id, 
        username, 
        password,
        hwid: hwid || null,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Buscar dados do Discord
      const discordUser = await fetchDiscordData(discord_id);
      
      return res.status(200).json({
        success: true,
        token: data.token,
        user: {
          discord_id: data.user.discord_id,
          username: data.user.username,
          global_name: discordUser?.global_name || data.user.global_name || discordUser?.username || username,
          avatar_url: discordUser?.avatar_url || data.user.avatar_url || '',
          expires_at: data.user.expires_at,
          is_active: data.user.is_active,
        },
      });
    }

    return res.status(response.status).json(data);

  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro no servidor. Tente novamente mais tarde.',
    });
  }
}
