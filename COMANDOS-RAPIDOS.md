# Comandos Rápidos

## 🚀 Instalação e Deploy

```bash
# 1. Instalar dependências
npm install

# 2. Testar localmente
npm run dev

# 3. Build para produção
npm run build

# 4. Preview do build
npm run preview

# 5. Deploy no Vercel
vercel

# 6. Deploy em produção
vercel --prod
```

## 🔧 Configuração

### Adicionar links de download

Edite: `src/pages/api/downloads.ts`

```typescript
const DOWNLOADS = [
  {
    id: 'loader',
    name: 'ZEFI Loader',
    description: 'Descrição',
    url: 'SEU_LINK_AQUI', // ← Mude aqui
    version: '1.0.0',
    size: '2.5 MB',
  },
];
```

### Mudar cores

Edite: `src/styles/theme.css`

```css
:root {
  --theme-primary: #42467e; /* Cor principal */
  --theme-bg: #1b191d; /* Fundo */
}
```

## 🧪 Testar

```bash
# Testar login
http://localhost:4321/login

# Testar downloads
http://localhost:4321/downloads

# Testar API diretamente
curl -X POST http://localhost:4321/api/auth \
  -H "Content-Type: application/json" \
  -d '{"discord_id":"SEU_ID"}'
```

## 📝 Estrutura de arquivos

```
odyssey-main/
├── src/
│   ├── pages/
│   │   ├── login.astro          ← Página de login
│   │   ├── downloads.astro      ← Página de downloads
│   │   └── api/
│   │       ├── auth.ts          ← API de autenticação
│   │       └── downloads.ts     ← API de downloads
│   └── styles/
│       └── theme.css            ← Cores do tema
├── astro.config.mjs             ← Configuração do Astro
└── package.json                 ← Dependências
```

## 🎨 Personalização rápida

### Mudar texto do login

Edite: `src/pages/login.astro`

Linha 14: `<h1>Login</h1>`
Linha 15: `<p>Entre com seu Discord ID</p>`

### Mudar texto dos downloads

Edite: `src/pages/downloads.astro`

Linha 20: `<h1>Downloads</h1>`
Linha 21: `<p>Seus arquivos disponíveis para download</p>`

## 🔒 Segurança

### Proteger rotas

As rotas `/downloads` e `/api/downloads` já estão protegidas por token.

### Expiração do token

Token expira em 24 horas. Para mudar:

Edite: `src/pages/api/downloads.ts`

Linha 52: `const maxAge = 24 * 60 * 60 * 1000; // 24 horas`

## 📱 Responsivo

O site já é responsivo e funciona em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🐛 Debug

### Ver logs no navegador

Abra o Console (F12) e veja os erros.

### Ver logs no Vercel

1. Acesse: https://vercel.com/dashboard
2. Clique no seu projeto
3. Vá em "Functions"
4. Veja os logs

### Testar API manualmente

```bash
# Testar autenticação
curl -X POST https://seu-site.vercel.app/api/auth \
  -H "Content-Type: application/json" \
  -d '{"discord_id":"123456789"}'

# Testar downloads
curl https://seu-site.vercel.app/api/downloads \
  -H "Authorization: Bearer SEU_TOKEN"
```

