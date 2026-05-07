# Database Schema - Version Control

## Tabela: `versions`

Gerencia todas as versões de DLL, Loader e Auth.

```sql
CREATE TABLE versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL, -- 'dll', 'loader', 'auth'
  version VARCHAR(20) NOT NULL, -- '1.0.0', '1.0.1', etc
  download_url TEXT NOT NULL, -- URL para download
  changelog TEXT, -- Notas de versão
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'paused', 'archived'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT valid_type CHECK (type IN ('dll', 'loader', 'auth')),
  CONSTRAINT valid_status CHECK (status IN ('active', 'paused', 'archived'))
);

-- Índices para performance
CREATE INDEX idx_versions_type ON versions(type);
CREATE INDEX idx_versions_status ON versions(status);
CREATE INDEX idx_versions_created_at ON versions(created_at DESC);
```

## Tabela: `admins`

Armazena tokens de admin para autenticação.

```sql
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(100) NOT NULL UNIQUE,
  token VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_used TIMESTAMP
);

-- Índice para busca rápida
CREATE INDEX idx_admins_token ON admins(token);
```

## Tabela: `version_history`

Histórico de mudanças de versão.

```sql
CREATE TABLE version_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version_id UUID NOT NULL REFERENCES versions(id),
  action VARCHAR(50) NOT NULL, -- 'created', 'paused', 'resumed', 'archived'
  admin_id UUID REFERENCES admins(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índice para histórico
CREATE INDEX idx_version_history_version_id ON version_history(version_id);
```

## Exemplos de Uso

### Inserir nova versão DLL
```sql
INSERT INTO versions (type, version, download_url, changelog, status)
VALUES (
  'dll',
  '1.0.5',
  'https://cdn.example.com/dll/v1.0.5/fertel.dll',
  'Fixed collider aimbot offset\nAdded warning icon',
  'active'
);
```

### Pausar versão
```sql
UPDATE versions
SET status = 'paused'
WHERE type = 'dll' AND status = 'active';
```

### Obter versão ativa
```sql
SELECT * FROM versions
WHERE type = 'dll' AND status = 'active'
ORDER BY created_at DESC
LIMIT 1;
```

### Histórico de versões
```sql
SELECT * FROM versions
WHERE type = 'dll'
ORDER BY created_at DESC;
```
