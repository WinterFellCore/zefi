// API de autenticação - Vercel Serverless Function

const API_URL = 'https://xereca-auth.vercel.app/api/verify';
const DISCORD_API_URL = 'https://discord-lookup-id.vercel.app/api/discord';
const APP_VERSION = '1.0';

async function fetchDiscordData(discordId) {
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

export default async function handler(req, res) {
  // CORS headers - mais permissivo
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  console.log('[AUTH] Method:', req.method);
  console.log('[AUTH] Headers:', req.headers);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('[AUTH] Method not allowed:', req.method);
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed',
      receivedMethod: req.method 
    });
  }

  try {
    const { discord_id } = req.body;

    console.log('[AUTH] Discord ID recebido:', discord_id);
    console.log('[AUTH] Body completo:', req.body);

    if (!discord_id) {
      return res.status(400).json({
        success: false,
        message: 'Discord ID é obrigatório',
      });
    }

    // Chamar API de autenticação (mesmo formato do x86)
    console.log('[AUTH] Chamando API xereca-auth...');
    const authPayload = {
      discord_id: discord_id,
      hwid: 'web-' + Date.now(),
      app: 'panel',
      version: APP_VERSION,
    };
    
    console.log('[AUTH] Payload:', authPayload);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authPayload),
    });

    const data = await response.json();
    console.log('[AUTH] Resposta da API:', data);

    if (data.ok || data.allowed) {
      // Buscar informações do Discord
      console.log('[AUTH] Buscando dados do Discord...');
      const discordUser = await fetchDiscordData(discord_id);
      console.log('[AUTH] Dados do Discord:', discordUser);

      // Gerar token
      const token = Buffer.from(`${discord_id}:${Date.now()}`).toString('base64');

      return res.status(200).json({
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
      });
    } else {
      console.log('[AUTH] Acesso negado:', data.message);
      return res.status(401).json({
        success: false,
        message: data.message || 'Acesso negado. Verifique seu Discord ID.',
      });
    }
  } catch (error) {
    console.error('[AUTH] Erro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro no servidor. Tente novamente mais tarde.',
      error: error.message,
    });
  }
}
