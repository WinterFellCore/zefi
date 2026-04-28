import type { APIRoute } from 'astro';

// Lista de downloads disponíveis
// SUBSTITUA OS LINKS PELOS SEUS LINKS REAIS
const DOWNLOADS = [
  {
    id: 'loader',
    name: 'ZEFI Loader',
    description: 'Loader principal do ZEFI. Versão mais recente com todas as features.',
    url: 'https://seu-link-aqui.com/zefi-loader.zip', // SUBSTITUA
    version: '1.0.0',
    size: '2.5 MB',
  },
  {
    id: 'config',
    name: 'ZEFI Config',
    description: 'Arquivo de configuração padrão para começar a usar.',
    url: 'https://seu-link-aqui.com/zefi-config.json', // SUBSTITUA
    version: '1.0.0',
    size: '15 KB',
  },
  {
    id: 'docs',
    name: 'Documentação',
    description: 'Guia completo de instalação e uso do ZEFI.',
    url: 'https://seu-link-aqui.com/zefi-docs.pdf', // SUBSTITUA
    version: '1.0.0',
    size: '1.2 MB',
  },
  {
    id: 'injector',
    name: 'ZEFI Injector',
    description: 'Injector otimizado para Free Fire. Compatível com todas as versões.',
    url: 'https://seu-link-aqui.com/zefi-injector.exe', // SUBSTITUA
    version: '2.1.0',
    size: '3.8 MB',
  },
];

export const GET: APIRoute = async ({ request }) => {
  try {
    // Verificar token de autenticação
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Token de autenticação não fornecido',
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const token = authHeader.substring(7);
    
    // Validar token (em produção, use JWT e valide corretamente)
    try {
      const decoded = atob(token);
      const [discord_id, timestamp] = decoded.split(':');
      
      // Verificar se o token não expirou (24 horas)
      const tokenAge = Date.now() - parseInt(timestamp);
      const maxAge = 24 * 60 * 60 * 1000; // 24 horas
      
      if (tokenAge > maxAge) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Token expirado. Faça login novamente.',
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
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Token inválido',
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Retornar lista de downloads
    return new Response(
      JSON.stringify({
        success: true,
        downloads: DOWNLOADS,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Downloads error:', error);
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

