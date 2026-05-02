# 🚀 Guia de Configuração - Sistema de Autenticação Web

## ✅ Checklist Completo

### **1️⃣ Supabase - Criar Tabela Completa**

Acesse: https://supabase.com/dashboard/project/[SEU_PROJETO]/sql

Cole e execute este SQL:

```sql
-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS public.users (
  id BIGSERIAL PRIMARY KEY,
  discord_id VARCHAR(20) UNIQUE NOT NULL,
  
  -- Dados do Discord (preenchidos pelo admin)
  username VARCHAR(100),
  global_name VARCHAR(100),
  avatar_url TEXT,
  
  -- Conta Web (preenchidos no registro do site)
  has_web_account BOOLEAN DEFAULT FALSE,
  password_hash TEXT,
  web_hwid VARCHAR(64),
  web_account_created_at TIMESTAMP,
  
  -- HWID da DLL (preenchido no primeiro login da DLL)
  hwid VARCHAR(64),
  
  -- Status da licença
  is_active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMP,
  
  -- Metadados
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  
  -- Logs de acesso
  last_login_ip VARCHAR(45),
  login_count INTEGER DEFAULT 0
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_discord_id ON public.users(discord_id);
CREATE INDEX IF NOT EXISTS idx_hwid ON public.users(hwid);
CREATE INDEX IF NOT EXISTS idx_is_active ON public.users(is_active);
CREATE INDEX IF NOT EXISTS idx_has_web_account ON public.users(has_web_account);

-- Habilitar RLS (Row Level Security) - Opcional
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura/escrita via service_role (sua API)
CREATE POLICY "Enable all access for service role" ON public.users
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

---

### **2️⃣ API (WinterFellCore/xereca-auth) - Criar 3 Endpoints**

#### **Estrutura de pastas:**
```
xereca-auth/
├── api/
│   ├── verify.js              (já existe - DLL)
│   ├── check-web-account.js   (CRIAR)
│   ├── register-web.js        (CRIAR)
│   └── login-web.js           (CRIAR)
└── package.json
```

#### **A) Criar: `api/check-web-account.js`**

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { discord_id } = req.body;

  if (!discord_id) {
    return res.status(400).json({ success: false, message: 'Discord ID obrigatório' });
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('discord_id, has_web_account, is_active')
      .eq('discord_id', discord_id)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        exists: false,
        message: 'Discord ID não encontrado. Entre em contato com o administrador.',
      });
    }

    if (user.has_web_account) {
      return res.status(200).json({
        success: true,
        exists: true,
        has_web_account: true,
        message: 'Este Discord ID já possui uma conta. Faça login.',
      });
    }

    return res.status(200).json({
      success: true,
      exists: true,
      has_web_account: false,
      message: 'Discord ID encontrado! Você pode criar sua conta.',
    });
  } catch (error) {
    console.error('Check error:', error);
    return res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
}
```

#### **B) Criar: `api/register-web.js`**

```javascript
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { discord_id, password, hwid } = req.body;

  if (!discord_id || !password || !hwid) {
    return res.status(400).json({
      success: false,
      message: 'Discord ID, senha e HWID são obrigatórios',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Senha deve ter no mínimo 6 caracteres',
    });
  }

  try {
    // Verificar se Discord ID existe e não tem conta web
    const { data: user, error: checkError } = await supabase
      .from('users')
      .select('discord_id, has_web_account')
      .eq('discord_id', discord_id)
      .single();

    if (checkError || !user) {
      return res.status(404).json({
        success: false,
        message: 'Discord ID não encontrado no sistema.',
      });
    }

    if (user.has_web_account) {
      return res.status(409).json({
        success: false,
        message: 'Este Discord ID já possui uma conta. Faça login.',
      });
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(password, 10);

    // Atualizar usuário
    const { error: updateError } = await supabase
      .from('users')
      .update({
        password_hash: passwordHash,
        web_hwid: hwid,
        has_web_account: true,
        web_account_created_at: new Date().toISOString(),
      })
      .eq('discord_id', discord_id);

    if (updateError) {
      throw updateError;
    }

    return res.status(201).json({
      success: true,
      message: 'Conta criada com sucesso!',
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
}
```

#### **C) Criar: `api/login-web.js`**

```javascript
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { discord_id, password } = req.body;

  if (!discord_id || !password) {
    return res.status(400).json({
      success: false,
      message: 'Discord ID e senha são obrigatórios',
    });
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('discord_id', discord_id)
      .single();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Discord ID ou senha incorretos',
      });
    }

    if (!user.has_web_account) {
      return res.status(403).json({
        success: false,
        message: 'Você precisa criar uma conta primeiro',
      });
    }

    // Verificar senha
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Discord ID ou senha incorretos',
      });
    }

    // Verificar se está ativo
    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Sua conta está inativa',
      });
    }

    // Verificar expiração
    if (user.expires_at && new Date(user.expires_at) < new Date()) {
      return res.status(403).json({
        success: false,
        message: 'Sua licença expirou',
      });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { discord_id: user.discord_id },
      process.env.JWT_SECRET || 'change-this-secret',
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        discord_id: user.discord_id,
        username: user.username,
        global_name: user.global_name,
        avatar_url: user.avatar_url,
        expires_at: user.expires_at,
        is_active: user.is_active,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
}
```

---

### **3️⃣ Instalar Dependências**

No projeto `WinterFellCore/xereca-auth`:

```bash
npm install bcryptjs jsonwebtoken
```

---

### **4️⃣ Configurar Variáveis de Ambiente**

No **Vercel** (projeto `xereca-auth`):

1. Vá em **Settings** → **Environment Variables**
2. Adicione:

```
JWT_SECRET=seu-secret-super-seguro-mude-isso-123456
```

---

### **5️⃣ Testar o Fluxo**

#### **Passo 1: Adicionar usuário no Supabase**
```sql
INSERT INTO users (discord_id, is_active, expires_at)
VALUES ('123456789', true, '2025-12-31');
```

#### **Passo 2: Acessar o site**
1. Ir em `/register`
2. Digitar Discord ID: `123456789`
3. Criar senha
4. Fazer login em `/login`

#### **Passo 3: Testar DLL**
- DLL continua usando apenas Discord ID + HWID
- Não precisa de senha

---

## 🔄 Fluxo Completo

```
┌─────────────────────────────────────────────────────────────┐
│                    ADMIN ADICIONA USUÁRIO                    │
│              INSERT INTO users (discord_id, ...)             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  USUÁRIO ACESSA /register                    │
│         1. Digita Discord ID                                 │
│         2. API verifica se existe (check-web-account)        │
│         3. Se OK: Cria senha + captura HWID                  │
│         4. API salva (register-web)                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CONTA WEB CRIADA ✅                       │
│         has_web_account = true                               │
│         Discord ID bloqueado para novos registros            │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
        ┌───────────────────┐  ┌───────────────────┐
        │   LOGIN NO SITE   │  │   LOGIN NA DLL    │
        │  Discord ID +     │  │  Discord ID +     │
        │     Senha         │  │     HWID          │
        │  (login-web)      │  │  (verify)         │
        └───────────────────┘  └───────────────────┘
```

---

## ❓ FAQ

**Q: A DLL precisa de senha?**
A: Não! A DLL continua usando apenas Discord ID + HWID.

**Q: Posso criar várias contas com o mesmo Discord ID?**
A: Não! Depois de criar a conta web, o Discord ID fica bloqueado.

**Q: O que acontece se eu perder a senha?**
A: Você precisará criar um endpoint de reset de senha ou pedir ao admin para resetar.

**Q: O HWID do site é o mesmo da DLL?**
A: Não! São diferentes:
- **DLL**: HWID real do PC (MachineGuid)
- **Site**: Fingerprint do navegador

---

## 🎯 Próximos Passos

1. ✅ Executar SQL no Supabase
2. ✅ Criar os 3 arquivos na API
3. ✅ Instalar dependências
4. ✅ Configurar JWT_SECRET
5. ✅ Testar registro
6. ✅ Testar login
7. ✅ Testar DLL

---

**Dúvidas?** Qualquer problema, me avisa!
