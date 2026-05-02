# Schema do Banco de Dados

## Tabela: `users`

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  discord_id VARCHAR(20) UNIQUE NOT NULL,
  
  -- Dados do Discord (preenchidos pelo admin)
  username VARCHAR(100),
  global_name VARCHAR(100),
  avatar_url TEXT,
  
  -- Conta Web (preenchidos no registro)
  has_web_account BOOLEAN DEFAULT FALSE,
  password_hash TEXT,
  web_account_created_at TIMESTAMP,
  
  -- HWID (capturado no registro do site)
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

-- Índices
CREATE INDEX idx_discord_id ON users(discord_id);
CREATE INDEX idx_hwid ON users(hwid);
CREATE INDEX idx_is_active ON users(is_active);
```

## Fluxo de Dados

### 1. Admin adiciona usuário no BD
```sql
INSERT INTO users (discord_id, username, is_active, expires_at)
VALUES ('123456789', 'username', TRUE, '2025-12-31');
```

### 2. Usuário cria conta no site
```sql
UPDATE users 
SET 
  has_web_account = TRUE,
  password_hash = '$2a$10$...',
  hwid = 'abc123...',
  web_account_created_at = NOW()
WHERE discord_id = '123456789';
```

### 3. Usuário faz login na DLL
- DLL envia: `discord_id` + `hwid` (do PC)
- Backend verifica:
  - Discord ID existe?
  - HWID bate com o cadastrado?
  - Licença ativa e não expirada?

## Exemplo de Queries

### Verificar se Discord ID existe e pode criar conta
```sql
SELECT discord_id, has_web_account, is_active, expires_at
FROM users
WHERE discord_id = $1;
```

### Criar conta web
```sql
UPDATE users
SET 
  has_web_account = TRUE,
  password_hash = $2,
  hwid = $3,
  web_account_created_at = NOW()
WHERE discord_id = $1
  AND has_web_account = FALSE;
```

### Login web (com senha)
```sql
SELECT *
FROM users
WHERE discord_id = $1
  AND has_web_account = TRUE
  AND is_active = TRUE;
```

### Login DLL (sem senha, só HWID)
```sql
SELECT *
FROM users
WHERE discord_id = $1
  AND hwid = $2
  AND is_active = TRUE
  AND (expires_at IS NULL OR expires_at > NOW());
```

## Variáveis de Ambiente (.env)

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# JWT
JWT_SECRET=your-super-secret-key-change-this

# API
API_URL=https://your-domain.vercel.app
```

## Próximos Passos

1. Criar banco de dados (Supabase, Railway, Vercel Postgres)
2. Executar o schema SQL
3. Configurar variáveis de ambiente
4. Implementar as queries nas APIs
5. Testar fluxo completo
