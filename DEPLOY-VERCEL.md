# Deploy no Vercel - Instruções

## ⚠️ IMPORTANTE: Node.js 20+

Este projeto requer Node.js 20 ou superior. Certifique-se de ter a versão correta instalada:

```bash
node --version
# Deve mostrar v20.x.x ou superior
```

Se precisar atualizar o Node.js:
- Windows: Baixe em https://nodejs.org/
- Mac: `brew install node@20`
- Linux: `nvm install 20`

## 🔧 Passo 1: Instalar dependências

Antes de fazer o deploy, você precisa instalar o adaptador Vercel:

```bash
npm install
```

Ou se preferir instalar manualmente:

```bash
npm install @astrojs/vercel --save-dev
```

## 🚀 Passo 2: Testar localmente

Antes de fazer deploy, teste localmente:

```bash
npm run dev
```

Acesse: `http://localhost:4321/login`

Teste o login com um Discord ID válido.

## 📦 Passo 3: Build local (opcional)

Para testar o build antes do deploy:

```bash
npm run build
npm run preview
```

## ☁️ Passo 4: Deploy no Vercel

### Opção A: Via CLI (Recomendado)

1. Instale o Vercel CLI (se ainda não tiver):
```bash
npm install -g vercel
```

2. Faça login:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Para deploy em produção:
```bash
vercel --prod
```

### Opção B: Via GitHub (Automático)

1. Faça commit das mudanças:
```bash
git add .
git commit -m "Add login system with Discord API"
git push
```

2. O Vercel vai detectar automaticamente e fazer o deploy

## ✅ Verificar se funcionou

Após o deploy, teste:

1. Acesse: `https://seu-site.vercel.app/login`
2. Digite um Discord ID válido
3. Deve redirecionar para `/downloads`
4. Deve mostrar foto e nome do Discord

## 🐛 Troubleshooting

### Erro 404 nas rotas de API

Se ainda der 404, verifique:

1. O arquivo `astro.config.mjs` tem `output: 'hybrid'`
2. O adaptador Vercel está instalado
3. As rotas de API estão em `src/pages/api/`

### Erro de CORS

Se der erro de CORS, adicione headers nas APIs:

```typescript
headers: {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}
```

### API não responde

Verifique os logs no Vercel:
1. Acesse o dashboard do Vercel
2. Vá em "Functions"
3. Veja os logs das APIs

## 📝 Configurações importantes

### Variáveis de ambiente (opcional)

Se quiser usar variáveis de ambiente:

1. No Vercel Dashboard, vá em Settings > Environment Variables
2. Adicione:
   - `API_URL` = https://xereca-auth.vercel.app/api/verify
   - `DISCORD_API_URL` = https://discord-lookup-id.vercel.app/api/discord

3. Use no código:
```typescript
const API_URL = import.meta.env.API_URL || 'https://xereca-auth.vercel.app/api/verify';
```

## 🎯 Próximos passos

Após o deploy funcionar:

1. Configure os links de download em `src/pages/api/downloads.ts`
2. Personalize as cores/textos se necessário
3. Adicione seu domínio customizado no Vercel

## 📞 Suporte

Se continuar com problemas:
1. Verifique os logs do Vercel
2. Teste as APIs diretamente: `https://seu-site.vercel.app/api/auth`
3. Verifique se o Discord ID é válido na API xereca-auth

