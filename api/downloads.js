// API de downloads - Vercel Serverless Function

const DOWNLOADS = [
  {
    id: 'loader',
    name: 'ZEFI Loader',
    description: 'Loader principal do ZEFI. Versão mais recente com todas as features.',
    url: 'https://seu-link-aqui.com/zefi-loader.zip',
    version: '1.0.0',
    size: '2.5 MB',
  },
  {
    id: 'config',
    name: 'ZEFI Config',
    description: 'Arquivo de configuração padrão para começar a usar.',
    url: 'https://seu-link-aqui.com/zefi-config.json',
    version: '1.0.0',
    size: '15 KB',
  },
  {
    id: 'docs',
    name: 'Documentação',
    description: 'Guia completo de instalação e uso do ZEFI.',
    url: 'https://seu-link-aqui.com/zefi-docs.pdf',
    version: '1.0.0',
    size: '1.2 MB',
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
