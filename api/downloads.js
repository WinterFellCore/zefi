// API de downloads - Vercel Serverless Function

const DOWNLOADS = [
  {
    id: 'ff-max-x86',
    name: 'Free Fire MAX X86',
    description: 'Free Fire MAX para dispositivos x86 - OB53. Compatível com emuladores e dispositivos Intel.',
    url: 'https://www.mediafire.com/file/669xh6lc1rjfsl8/Free_Fire_MAX_X86_OB53_%25281%2529.xapk/file',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/41/b5/1c/41b51c10-c3df-b309-de20-f3aa04b9d0d5/Placeholder.mill/400x400bb.webp',
    version: 'OB53',
    size: '~800 MB',
  },
  {
    id: 'ff-v7a',
    name: 'Free Fire V7A',
    description: 'Free Fire para dispositivos ARM64-v8a - OB53. Versão otimizada para smartphones Android.',
    url: 'https://download2288.mediafire.com/gq9kewctgczgLLk8_A5LSRll_HzggZEd0zX3XiQNt-S98BCs6qHEoIp1Rq65LQJf350QFCIYFh9I1g9SAh3ajFuCbMUYHwspzcaOI3fDkq2ASymWVD0bcyPbX8er9TutuuB2t8ZS4fEcRROi2mfahO8Y_Oivw5vUlgch-aJkXPY0rOY/xpqrafanwfhwsgt/Free+fire+V7A+OB53+%281%29.xapk',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/41/b5/1c/41b51c10-c3df-b309-de20-f3aa04b9d0d5/Placeholder.mill/400x400bb.webp',
    version: 'OB53',
    size: '~700 MB',
  },
];

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token de autenticação não fornecido',
      });
    }

    const token = authHeader.substring(7);
    
    // Validar token
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      const [discord_id, timestamp] = decoded.split(':');
      
      const tokenAge = Date.now() - parseInt(timestamp);
      const maxAge = 24 * 60 * 60 * 1000; // 24 horas
      
      if (tokenAge > maxAge) {
        return res.status(401).json({
          success: false,
          message: 'Token expirado. Faça login novamente.',
        });
      }
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido',
      });
    }

    return res.status(200).json({
      success: true,
      downloads: DOWNLOADS,
    });
  } catch (error) {
    console.error('Downloads error:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro no servidor. Tente novamente mais tarde.',
    });
  }
}
