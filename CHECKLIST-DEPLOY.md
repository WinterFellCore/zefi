# ✅ Checklist de Deploy - ZEFI

Use este checklist antes de publicar seu site em produção.

## 🔍 Pré-Deploy

### Configurações Básicas

- [ ] Atualizar `src/config/settings.js` com URL de produção
  ```javascript
  url: `https://seudominio.com`
  ```

- [ ] Verificar título e descrição SEO
  ```javascript
  title: `ZEFI | Performance sem limites`
  description: `Controle total na sua mão...`
  ```

- [ ] Adicionar favicon personalizado em `public/favicon.png`

- [ ] Adicionar imagem social em `public/social.png` (1200x630px)

### Conteúdo

- [ ] Todos os produtos estão corretos em `src/config/products.js`
  - [ ] Nomes
  - [ ] Descrições
  - [ ] Preços
  - [ ] Features

- [ ] Links de navegação funcionando (`src/config/nav.js`)

- [ ] Links do footer atualizados (`src/config/footer.js`)

- [ ] Adicionar links de redes sociais no footer (se aplicável)

### Visual

- [ ] Logo está correto (`src/components/Logo.astro`)

- [ ] Cores do tema estão finalizadas (`src/styles/theme.css`)

- [ ] Testar em diferentes navegadores:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

- [ ] Testar em diferentes dispositivos:
  - [ ] Desktop (1920px)
  - [ ] Laptop (1440px)
  - [ ] Tablet (768px)
  - [ ] Mobile (375px)

### Performance

- [ ] Otimizar todas as imagens
  - [ ] Converter para WebP quando possível
  - [ ] Comprimir com TinyPNG ou similar
  - [ ] Tamanho máximo: 500KB por imagem

- [ ] Remover console.logs do código

- [ ] Testar build de produção localmente
  ```bash
  npm run build
  npm run preview
  ```

- [ ] Verificar Lighthouse Score
  - [ ] Performance > 90
  - [ ] Accessibility > 90
  - [ ] Best Practices > 90
  - [ ] SEO > 90

## 🌐 Configuração de Deploy

### Opção 1: Netlify

- [ ] Criar conta em https://netlify.com

- [ ] Conectar repositório GitHub/GitLab

- [ ] Configurar build settings:
  ```
  Build command: npm run build
  Publish directory: dist
  ```

- [ ] Adicionar variáveis de ambiente (se necessário)

- [ ] Configurar domínio customizado

- [ ] Ativar HTTPS

- [ ] Configurar redirects (se necessário)
  - Criar arquivo `public/_redirects`:
  ```
  /*    /index.html   200
  ```

### Opção 2: Vercel

- [ ] Criar conta em https://vercel.com

- [ ] Importar projeto do GitHub

- [ ] Vercel detecta Astro automaticamente

- [ ] Adicionar variáveis de ambiente (se necessário)

- [ ] Configurar domínio customizado

- [ ] HTTPS é automático

### Opção 3: Cloudflare Pages

- [ ] Criar conta em https://pages.cloudflare.com

- [ ] Conectar repositório

- [ ] Configurar build:
  ```
  Build command: npm run build
  Build output directory: dist
  ```

- [ ] Configurar domínio

## 🔒 Segurança

- [ ] Adicionar `.env` ao `.gitignore`
  ```
  .env
  .env.local
  .env.production
  ```

- [ ] Nunca commitar chaves de API

- [ ] Usar variáveis de ambiente para dados sensíveis

- [ ] Configurar CORS se necessário

- [ ] Adicionar Content Security Policy (opcional)

## 📊 Analytics e Monitoramento

### Google Analytics (Opcional)

- [ ] Criar conta Google Analytics

- [ ] Adicionar tracking code em `src/layouts/Base.astro`:
  ```html
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
  ```

### Outras Ferramentas

- [ ] Configurar Google Search Console
  - [ ] Adicionar propriedade
  - [ ] Verificar domínio
  - [ ] Enviar sitemap

- [ ] Configurar Hotjar ou similar (opcional)

- [ ] Configurar Sentry para error tracking (opcional)

## 🔗 SEO

### Meta Tags

- [ ] Verificar meta tags em `src/components/head/BaseHead.astro`
  - [ ] Title
  - [ ] Description
  - [ ] Open Graph tags
  - [ ] Twitter Card tags

### Sitemap

- [ ] Sitemap é gerado automaticamente em `/sitemap-index.xml`

- [ ] Verificar se sitemap está acessível após deploy

- [ ] Enviar sitemap ao Google Search Console

### Robots.txt

- [ ] Criar `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  
  Sitemap: https://seudominio.com/sitemap-index.xml
  ```

## 💳 Sistema de Pagamento (Se Implementado)

- [ ] Testar em modo sandbox/teste

- [ ] Configurar webhooks

- [ ] Testar fluxo completo de compra

- [ ] Configurar emails de confirmação

- [ ] Testar diferentes métodos de pagamento:
  - [ ] PIX
  - [ ] Cartão de crédito
  - [ ] Boleto

- [ ] Configurar páginas de sucesso/erro

- [ ] Testar sistema de licenças

## 📧 Email

- [ ] Configurar serviço de email (SendGrid, Mailgun, etc)

- [ ] Criar templates de email:
  - [ ] Confirmação de compra
  - [ ] Envio de licença
  - [ ] Recuperação de senha (se aplicável)

- [ ] Testar envio de emails

## 🔄 CI/CD (Opcional)

- [ ] Configurar GitHub Actions para testes automáticos

- [ ] Configurar deploy automático no push para main

- [ ] Configurar preview deploys para PRs

## 📱 PWA (Opcional)

- [ ] Adicionar manifest.json

- [ ] Adicionar service worker

- [ ] Testar instalação como app

## 🧪 Testes Finais

### Funcionalidade

- [ ] Todos os links funcionam

- [ ] Navegação mobile funciona

- [ ] Botões de compra funcionam (ou mostram mensagem apropriada)

- [ ] Formulários funcionam (se houver)

- [ ] Scroll suave funciona

### Performance

- [ ] Tempo de carregamento < 3 segundos

- [ ] First Contentful Paint < 1.8s

- [ ] Time to Interactive < 3.8s

- [ ] Cumulative Layout Shift < 0.1

### Acessibilidade

- [ ] Testar com leitor de tela

- [ ] Navegação por teclado funciona

- [ ] Contraste de cores adequado

- [ ] Alt text em todas as imagens

### Cross-browser

- [ ] Chrome (Desktop e Mobile)

- [ ] Firefox (Desktop e Mobile)

- [ ] Safari (Desktop e Mobile)

- [ ] Edge

## 📋 Pós-Deploy

### Imediato

- [ ] Verificar se site está no ar

- [ ] Testar todas as páginas

- [ ] Verificar certificado SSL

- [ ] Testar em mobile real

- [ ] Compartilhar em redes sociais (teste preview)

### Primeira Semana

- [ ] Monitorar analytics

- [ ] Verificar erros no console

- [ ] Coletar feedback de usuários

- [ ] Ajustar conforme necessário

### Primeiro Mês

- [ ] Analisar métricas de performance

- [ ] Otimizar baseado em dados reais

- [ ] Implementar melhorias

- [ ] Adicionar novas features

## 🚨 Troubleshooting

### Site não carrega

- [ ] Verificar build logs
- [ ] Verificar configurações de deploy
- [ ] Verificar DNS (se domínio customizado)

### Imagens não aparecem

- [ ] Verificar caminhos das imagens
- [ ] Verificar se imagens estão em `public/`
- [ ] Verificar build output

### Estilos quebrados

- [ ] Limpar cache do navegador
- [ ] Verificar se CSS foi incluído no build
- [ ] Verificar console para erros

### Performance ruim

- [ ] Otimizar imagens
- [ ] Verificar tamanho do bundle
- [ ] Usar CDN para assets

## 📞 Contatos Importantes

### Serviços

- **Hospedagem:** _____________
- **Domínio:** _____________
- **Email:** _____________
- **Pagamento:** _____________

### Credenciais

⚠️ **NUNCA commitar credenciais no Git!**

Manter em local seguro:
- [ ] Acesso ao painel de hospedagem
- [ ] Acesso ao registrador de domínio
- [ ] Chaves de API
- [ ] Senhas de email

## ✅ Deploy Checklist Final

Antes de fazer deploy:

1. [ ] Todos os itens acima foram verificados
2. [ ] Build local funciona perfeitamente
3. [ ] Testes em diferentes dispositivos OK
4. [ ] Performance está boa
5. [ ] SEO está configurado
6. [ ] Analytics está configurado (se desejado)
7. [ ] Backup do código está feito

**Status:** [ ] Pronto para deploy!

---

## 🎉 Após Deploy Bem-Sucedido

- [ ] Celebrar! 🎊
- [ ] Compartilhar com amigos
- [ ] Postar em redes sociais
- [ ] Começar a promover
- [ ] Coletar feedback
- [ ] Planejar próximas features

**Data do Deploy:** ___/___/______

**URL de Produção:** _______________________

**Notas:**
_________________________________________________
_________________________________________________
_________________________________________________
