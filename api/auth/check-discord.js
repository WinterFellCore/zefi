// API para verificar se Discord ID existe e se já tem conta web
// Chama a API xereca-auth para validar

const API_URL = 'https://xereca-auth.vercel.app/api/check-web-account';

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
    const { discord_id } = req.body;

    if (!discord_id) {
      return res.status(400).json({
        success: false,
        message: 'Discord ID é obrigatório',
      });
    }

    // Chamar API xereca-auth para verificar
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ discord_id }),
    });

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (error) {
    console.error('Check Discord error:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro no servidor. Tente novamente mais tarde.',
    });
  }
}
