/**
 * Version Control API
 * Gerencia versões da DLL, Loader e Status
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// GET - Obter versão atual
export async function GET({ url }) {
  try {
    const type = url.searchParams.get('type'); // 'dll', 'loader', 'auth'

    if (!type) {
      return new Response(JSON.stringify({ error: 'Type required' }), { status: 400 });
    }

    // Se type é 'all', retornar todas as versões (requer autenticação)
    if (type === 'all') {
      const authHeader = url.headers?.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }

      const token = authHeader.substring(7);
      const adminToken = import.meta.env.ADMIN_TOKEN;
      
      if (token !== adminToken) {
        return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
      }

      const { data, error } = await supabase
        .from('versions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Obter versão ativa
    const { data, error } = await supabase
      .from('versions')
      .select('*')
      .eq('type', type)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data || null), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// POST - Criar nova versão
export async function POST({ request }) {
  try {
    const { type, version, downloadUrl, changelog, status = 'active' } = await request.json();

    if (!type || !version || !downloadUrl) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Validar token de admin
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const token = authHeader.substring(7);
    const adminToken = import.meta.env.ADMIN_TOKEN;
    
    if (token !== adminToken) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }

    // Desativar versão anterior se status é 'active'
    if (status === 'active') {
      await supabase
        .from('versions')
        .update({ status: 'archived' })
        .eq('type', type)
        .eq('status', 'active');
    }

    const { data, error } = await supabase
      .from('versions')
      .insert([
        {
          type,
          version,
          download_url: downloadUrl,
          changelog,
          status,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// PUT - Atualizar status de versão
export async function PUT({ request }) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Validar token de admin
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const token = authHeader.substring(7);
    const adminToken = import.meta.env.ADMIN_TOKEN;
    
    if (token !== adminToken) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }

    const { data, error } = await supabase
      .from('versions')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
