// API de downloads - Vercel Serverless Function

const DOWNLOADS = [
  {
    id: 'ff-max-x86',
    name: 'Free Fire MAX X86',
    description: 'Free Fire MAX para dispositivos x86 - OB53. Compatível com emuladores e dispositivos Intel.',
    url: 'https://download2290.mediafire.com/v3bo4r4feeqgsOPqg3nDrpYzx5KbAzSHW09WfomLJWlCyjvUaHPt1y0HwXPGyoRWGgkBqZqkhU23ggZyBTIqJEaQ5UySKvwAc5WbyUIb2psR8wm2NX6Y9jYyyFTM5ePP2tNKoLHvHlNG8b5x8KSmQi2spsfUMjohbCgGUtNROTlnUWM/669xh6lc1rjfsl8/Free+Fire+MAX+X86+OB53+%281%29.xapk',
    image: 'https://play-lh.googleusercontent.com/EJ83sg58Oo2gAjMHFxFVLM6Z53kuH4_R0M7Yq7gts5fWSIlFchUlmskG1vJKMoncmfOxBXcgJyIaO-nak6sO-MM=s48-rw',
    version: 'OB53',
    size: '~440 MB',
  },
  {
    id: 'ff-v7a',
    name: 'Free Fire V7A',
    description: 'Free Fire para dispositivos ARM64-v8a - OB53. Versão otimizada para smartphones Android.',
    url: 'https://download2288.mediafire.com/sip182aurm7gtWXO0dYVX2zokwSjvhRpF5vyeov4wzT98xsNV1IwqGGgWPhPxCtSahw8egAb_Z4N6jbilNquQ7l-_u8YWRkP8Yw7nvv8Q4-YHsehvPUmVmAxjJnVKUtRrUerN8auKttORzdwD_-Jg9GwCQPf2G-rw6UbgPgm3wyMOf4/xpqrafanwfhwsgt/Free+fire+V7A+OB53+%281%29.xapk',
    image: 'https://play-lh.googleusercontent.com/Tzh1vMigK1Cn7_KIaMvKBVQRQapIMWMMqqyA6UqJTAYRpino4vvX6ZvYcVjZ_D8g19-DfHKCVeO2QPWl8vHGzw=s48-rw',
    version: 'OB53',
    size: '~350 MB',
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
