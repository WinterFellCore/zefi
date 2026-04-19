# 🚀 Início Rápido - ZEFI

Guia para começar a usar o projeto em 5 minutos.

## ✅ Pré-requisitos

Você precisa ter instalado:

- **Node.js** (versão 18 ou superior)
  - Download: https://nodejs.org/
  - Verifique: `node --version`

- **npm** (vem com Node.js)
  - Verifique: `npm --version`

## 📦 Instalação

### 1. Abra o terminal na pasta do projeto

```bash
cd odyssey-main
```

### 2. Instale as dependências

```bash
npm install
```

Isso vai instalar todas as bibliotecas necessárias. Pode demorar alguns minutos.

## 🎯 Comandos Principais

### Iniciar servidor de desenvolvimento

```bash
npm run dev
```

Isso vai:
- Iniciar o servidor local
- Abrir automaticamente no navegador
- URL: `http://localhost:4321`
- Hot reload: mudanças aparecem automaticamente

**Para parar o servidor:** Pressione `Ctrl+C` no terminal

### Build para produção

```bash
npm run build
```

Cria uma versão otimizada do site na pasta `dist/`

### Preview do build

```bash
npm run preview
```

Visualiza a versão de produção localmente antes de fazer deploy

## 📁 Estrutura de Arquivos Importantes

```
odyssey-main/
├── src/
│   ├── pages/
│   │   └── index.astro          ← Página principal
│   ├── components/
│   │   ├── products/
│   │   │   └── ProductCard.astro  ← Card de produto
│   │   └── sections/heros/
│   │       └── ZefiHeroSection.astro  ← Hero da home
│   ├── config/
│   │   ├── products.js          ← EDITE AQUI: Produtos
│   │   ├── settings.js          ← Configurações gerais
│   │   ├── nav.js               ← Menu de navegação
│   │   └── footer.js            ← Links do footer
│   └── styles/
│       ├── theme.css            ← EDITE AQUI: Cores e tema
│       └── global.css           ← Estilos globais
├── public/                      ← Imagens e arquivos estáticos
└── package.json                 ← Dependências do projeto
```

## 🎨 Primeiras Customizações

### 1. Mudar as cores

Edite `src/styles/theme.css`:

```css
:root {
	--theme-primary: #ff4da6;  /* Sua cor principal */
	--theme-primary-hover: #ff2d95;  /* Cor ao passar mouse */
}
```

### 2. Adicionar/Editar produtos

Edite `src/config/products.js`:

```javascript
export const products = [
	{
		id: 'meu-produto',
		name: 'Meu Produto',
		description: 'Descrição curta',
		features: [
			'Recurso 1',
			'Recurso 2',
			'Recurso 3'
		],
		price: 99.00,
		currency: 'BRL',
		popular: false
	}
];
```

### 3. Mudar o logo

Edite `src/components/Logo.astro`:

```astro
<p class="zefi-logo">MEU LOGO</p>
```

### 4. Mudar navegação

Edite `src/config/nav.js`:

```javascript
export const nav = [
	{ title: 'Início', slug: '/' },
	{ title: 'Produtos', slug: '/#produtos' },
	{ title: 'Contato', slug: '/contato' },
];
```

## 🌐 Deploy (Publicar Online)

### Opção 1: Netlify (Recomendado - Grátis)

1. Crie conta em https://netlify.com
2. Conecte seu repositório GitHub
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy automático!

### Opção 2: Vercel (Grátis)

1. Crie conta em https://vercel.com
2. Importe seu projeto
3. Deploy automático!

### Opção 3: GitHub Pages (Grátis)

1. Edite `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://seu-usuario.github.io',
  base: '/nome-do-repo',
});
```

2. Adicione script no `package.json`:
```json
"scripts": {
  "deploy": "npm run build && npx gh-pages -d dist"
}
```

3. Execute:
```bash
npm run deploy
```

## 🐛 Problemas Comuns

### Erro: "Cannot find module"

**Solução:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Porta 4321 já está em uso

**Solução:**
```bash
npm run dev -- --port 3000
```

### Mudanças não aparecem

**Solução:**
1. Salve o arquivo (`Ctrl+S`)
2. Limpe o cache do navegador (`Ctrl+Shift+R`)
3. Reinicie o servidor (`Ctrl+C` e `npm run dev`)

### Erro de build

**Solução:**
```bash
npm run build -- --verbose
```

Isso mostra mais detalhes do erro.

## 📚 Próximos Passos

1. ✅ Rode o projeto (`npm run dev`)
2. ✅ Customize as cores (`src/styles/theme.css`)
3. ✅ Adicione seus produtos (`src/config/products.js`)
4. ✅ Mude o logo (`src/components/Logo.astro`)
5. ✅ Faça o deploy (Netlify/Vercel)

## 📖 Documentação Adicional

- **ZEFI-README.md** - Visão geral do projeto
- **COMO-ADICIONAR-PRODUTOS.md** - Guia detalhado de produtos
- **CUSTOMIZACAO-VISUAL.md** - Guia de customização visual
- **INTEGRACAO-PAGAMENTO.md** - Como adicionar pagamentos

## 🆘 Precisa de Ajuda?

### Documentação Oficial

- Astro: https://docs.astro.build/
- Odyssey Theme: https://odyssey-theme.sapling.supply/

### Comandos Úteis

```bash
# Ver versão do Node
node --version

# Ver versão do npm
npm --version

# Limpar cache do npm
npm cache clean --force

# Atualizar dependências
npm update

# Ver dependências desatualizadas
npm outdated
```

## ⚡ Dicas de Performance

1. **Otimize imagens** antes de adicionar em `public/`
   - Use WebP quando possível
   - Comprima com TinyPNG ou similar

2. **Minimize CSS customizado**
   - Use as variáveis CSS do tema
   - Evite duplicação de estilos

3. **Teste em diferentes dispositivos**
   - Desktop
   - Tablet
   - Mobile

## 🎉 Pronto!

Seu site ZEFI está rodando! Agora é só customizar e publicar.

**Comando para iniciar:**
```bash
npm run dev
```

**URL local:**
```
http://localhost:4321
```

Boa sorte com sua loja! 🚀
