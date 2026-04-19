# ZEFI - Loja Adaptada do Template Odyssey

Este projeto é uma adaptação do template Odyssey Theme para a loja ZEFI.

## 🚀 Características

- ✅ Design dark moderno com cores personalizadas (#ff4da6)
- ✅ Hero section com animações suaves
- ✅ Cards de produtos responsivos
- ✅ Sistema de tema customizado
- ✅ Performance otimizada com Astro
- ✅ SEO otimizado

## 📦 Estrutura do Projeto

```
odyssey-main/
├── src/
│   ├── components/
│   │   ├── products/
│   │   │   └── ProductCard.astro       # Card de produto
│   │   ├── sections/heros/
│   │   │   └── ZefiHeroSection.astro   # Hero section da ZEFI
│   │   └── Logo.astro                   # Logo customizado
│   ├── config/
│   │   ├── products.js                  # Dados dos produtos
│   │   ├── settings.js                  # Configurações gerais
│   │   ├── nav.js                       # Navegação
│   │   └── footer.js                    # Footer
│   ├── pages/
│   │   └── index.astro                  # Página principal
│   ├── layouts/
│   │   └── Page.astro                   # Layout principal
│   └── styles/
│       ├── theme.css                    # Tema ZEFI (cores, etc)
│       └── global.css                   # Estilos globais
```

## 🎨 Customização

### Cores do Tema

As cores estão definidas em `src/styles/theme.css`:

```css
--theme-primary: #ff4da6;
--theme-primary-hover: #ff2d95;
--theme-bg: #0f0f10;
--theme-surface-1: #141416;
```

### Produtos

Edite os produtos em `src/config/products.js`:

```javascript
export const products = [
  {
    id: 'zfi-remote',
    name: 'ZFI Remote',
    description: 'Free Fire Remote',
    features: [...],
    price: 60.00,
    currency: 'BRL',
    popular: false
  },
  // ...
];
```

### Navegação

Edite a navegação em `src/config/nav.js`:

```javascript
export const nav = [
  { title: 'Início', slug: '/' },
  { title: 'Produtos', slug: '/#produtos' },
];
```

## 🛠️ Comandos

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📝 Próximos Passos

1. **Adicionar funcionalidade de compra**: Integrar com sistema de pagamento (Stripe, MercadoPago, etc)
2. **Criar página de produto individual**: Detalhes completos de cada produto
3. **Adicionar autenticação**: Sistema de login/registro
4. **Dashboard de usuário**: Área do cliente
5. **Sistema de licenças**: Gerenciamento de chaves/licenças
6. **Adicionar redes sociais**: Links no footer
7. **Criar página de FAQ**: Perguntas frequentes
8. **Adicionar analytics**: Google Analytics ou similar

## 🎯 Funcionalidades Implementadas

- ✅ Hero section com animações
- ✅ Grid de produtos responsivo
- ✅ Cards de produtos com hover effects
- ✅ Badge "POPULAR" para produtos em destaque
- ✅ Tema dark customizado
- ✅ Logo ZEFI com símbolo {;}
- ✅ Header fixo com backdrop blur
- ✅ Footer customizado
- ✅ Scroll suave para âncoras
- ✅ Design mobile-first

## 📱 Responsividade

O site é totalmente responsivo e funciona perfeitamente em:
- Desktop (1920px+)
- Laptop (1440px)
- Tablet (768px)
- Mobile (320px+)

## 🌐 Deploy

O site pode ser deployado em:
- Netlify (configuração já incluída em `netlify.toml`)
- Vercel
- GitHub Pages
- Cloudflare Pages

## 📄 Licença

Baseado no Odyssey Theme. Customizado para ZEFI.
