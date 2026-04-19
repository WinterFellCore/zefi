# 🎨 Guia de Customização Visual

Como personalizar cores, fontes e estilos da loja ZEFI.

## 🌈 Mudando as Cores

### Arquivo: `src/styles/theme.css`

#### Cor Principal (Rosa)

```css
:root {
	--theme-primary: #ff4da6;  /* Rosa principal */
	--theme-primary-hover: #ff2d95;  /* Rosa ao passar o mouse */
}
```

**Exemplos de outras cores:**

```css
/* Azul */
--theme-primary: #4da6ff;
--theme-primary-hover: #2d95ff;

/* Verde */
--theme-primary: #4dff6a;
--theme-primary-hover: #2dff50;

/* Roxo */
--theme-primary: #a64dff;
--theme-primary-hover: #952dff;

/* Laranja */
--theme-primary: #ff6a4d;
--theme-primary-hover: #ff502d;
```

#### Cores de Fundo

```css
:root {
	--theme-bg: #0f0f10;  /* Fundo principal (quase preto) */
	--theme-surface-1: #141416;  /* Fundo dos cards */
	--theme-surface-2: #1a1a1a;  /* Fundo alternativo */
}
```

**Para um tema mais claro:**

```css
--theme-bg: #1a1a1c;
--theme-surface-1: #242426;
--theme-surface-2: #2a2a2c;
```

**Para um tema ainda mais escuro:**

```css
--theme-bg: #000000;
--theme-surface-1: #0a0a0a;
--theme-surface-2: #111111;
```

#### Cores de Texto

```css
:root {
	--theme-on-bg: #eaeaea;  /* Texto principal */
	--theme-text-secondary: #aaa;  /* Texto secundário */
}
```

#### Bordas

```css
:root {
	--theme-border-color: #1f1f22;  /* Cor das bordas */
}
```

## 🔤 Mudando as Fontes

### Arquivo: `src/styles/theme.css`

```css
:root {
	--theme-font-family-sans: Arial, -apple-system, BlinkMacSystemFont, sans-serif;
}
```

**Fontes alternativas:**

```css
/* Roboto (moderna) */
--theme-font-family-sans: 'Roboto', Arial, sans-serif;

/* Inter (clean) */
--theme-font-family-sans: 'Inter', Arial, sans-serif;

/* Poppins (arredondada) */
--theme-font-family-sans: 'Poppins', Arial, sans-serif;

/* Montserrat (elegante) */
--theme-font-family-sans: 'Montserrat', Arial, sans-serif;
```

**Para usar fontes do Google Fonts:**

1. Adicione no `<head>` do arquivo `src/layouts/Base.astro`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
```

2. Use no `theme.css`:

```css
--theme-font-family-sans: 'Inter', Arial, sans-serif;
```

## 📐 Mudando Bordas e Cantos

### Arquivo: `src/styles/theme.css`

```css
:root {
	--theme-shape-radius: 12px;  /* Cantos arredondados dos cards */
	--theme-button-border-radius: 8px;  /* Cantos dos botões */
}
```

**Mais arredondado:**

```css
--theme-shape-radius: 20px;
--theme-button-border-radius: 12px;
```

**Cantos retos:**

```css
--theme-shape-radius: 0px;
--theme-button-border-radius: 0px;
```

**Super arredondado (pílula):**

```css
--theme-shape-radius: 24px;
--theme-button-border-radius: 50px;
```

## 🎭 Mudando o Logo

### Arquivo: `src/components/Logo.astro`

#### Mudar o texto:

```astro
<p class="zefi-logo">MINHA LOJA <span class="zefi-symbol">{;}</span></p>
```

#### Mudar o símbolo:

```astro
<p class="zefi-logo">ZEFI <span class="zefi-symbol">★</span></p>
```

#### Remover o símbolo:

```astro
<p class="zefi-logo">ZEFI</p>
```

#### Usar uma imagem:

```astro
<img src="/logo.png" alt="Logo" class="zefi-logo-img" />

<style>
	.zefi-logo-img {
		height: 40px;
		width: auto;
	}
</style>
```

## 🎬 Mudando Animações

### Arquivo: `src/components/sections/heros/ZefiHeroSection.astro`

#### Velocidade das animações:

```css
.fade {
	animation: fadeUp 0.8s forwards;  /* 0.8s = velocidade */
}

/* Mais rápido */
animation: fadeUp 0.4s forwards;

/* Mais lento */
animation: fadeUp 1.5s forwards;
```

#### Delays (atrasos):

```css
.delay1 {
	animation-delay: 0.3s;  /* Espera 0.3s antes de animar */
}

.delay2 {
	animation-delay: 0.6s;
}
```

#### Desabilitar animações:

```css
.fade {
	opacity: 1;
	transform: translateY(0);
	animation: none;
}
```

## 📏 Mudando Tamanhos

### Título do Hero

Arquivo: `src/components/sections/heros/ZefiHeroSection.astro`

```css
.zefi-logo {
	font-size: clamp(4rem, 15vw, 8rem);
	/* Mínimo: 4rem, Ideal: 15vw, Máximo: 8rem */
}

/* Maior */
font-size: clamp(6rem, 20vw, 12rem);

/* Menor */
font-size: clamp(3rem, 10vw, 6rem);
```

### Subtítulos

```css
.hero-subtitle {
	font-size: clamp(1.5rem, 4vw, 2.5rem);
}
```

### Cards de Produtos

Arquivo: `src/components/products/ProductCard.astro`

```css
.product-card {
	padding: 2rem;  /* Espaçamento interno */
}

/* Mais espaçoso */
padding: 3rem;

/* Mais compacto */
padding: 1.5rem;
```

## 🎨 Efeitos de Hover (Mouse)

### Cards de Produtos

Arquivo: `src/components/products/ProductCard.astro`

```css
.product-card:hover {
	border-color: var(--theme-primary);
	transform: translateY(-4px);  /* Move 4px para cima */
	box-shadow: 0 8px 24px rgba(255, 77, 166, 0.15);
}

/* Efeito mais sutil */
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(255, 77, 166, 0.1);

/* Efeito mais dramático */
transform: translateY(-8px) scale(1.02);
box-shadow: 0 16px 48px rgba(255, 77, 166, 0.3);
```

### Botões

```css
.buy-button:hover {
	background: var(--theme-primary-hover);
	transform: scale(1.02);  /* Aumenta 2% */
}

/* Sem efeito de escala */
transform: none;

/* Efeito de pulsar */
transform: scale(1.05);
```

## 🌟 Adicionando Gradientes

### Fundo do Hero

Arquivo: `src/components/sections/heros/ZefiHeroSection.astro`

```css
.zefi-hero {
	background: linear-gradient(135deg, #0f0f10 0%, #1a0a15 100%);
}

/* Gradiente azul */
background: linear-gradient(135deg, #0a0f1a 0%, #0a1520 100%);

/* Gradiente roxo */
background: linear-gradient(135deg, #0f0a1a 0%, #150a1a 100%);

/* Gradiente com 3 cores */
background: linear-gradient(135deg, #0f0f10 0%, #1a0a15 50%, #0a0f1a 100%);
```

### Texto com Gradiente

```css
.zefi-logo {
	background: linear-gradient(135deg, #ff4da6 0%, #ff2d95 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

/* Gradiente arco-íris */
background: linear-gradient(135deg, #ff4da6 0%, #4da6ff 50%, #4dff6a 100%);
```

## 💫 Efeitos de Fundo

### Partículas/Círculos no Hero

Arquivo: `src/components/sections/heros/ZefiHeroSection.astro`

```css
.zefi-hero::before {
	content: '';
	position: absolute;
	background: 
		radial-gradient(circle at 20% 50%, rgba(255, 77, 166, 0.1) 0%, transparent 50%),
		radial-gradient(circle at 80% 80%, rgba(255, 77, 166, 0.08) 0%, transparent 50%);
}

/* Mais círculos */
background: 
	radial-gradient(circle at 20% 50%, rgba(255, 77, 166, 0.1) 0%, transparent 50%),
	radial-gradient(circle at 80% 80%, rgba(255, 77, 166, 0.08) 0%, transparent 50%),
	radial-gradient(circle at 50% 20%, rgba(77, 166, 255, 0.08) 0%, transparent 50%);

/* Remover efeito */
background: none;
```

## 📱 Responsividade

### Ajustar para Mobile

Arquivo: `src/components/products/ProductCard.astro`

```css
@media (max-width: 768px) {
	.product-card {
		padding: 1.5rem;  /* Menos padding no mobile */
	}
	
	.product-header h3 {
		font-size: 1.25rem;  /* Título menor */
	}
}
```

## 🎯 Dicas Rápidas

### Mudar cor do badge "POPULAR"

```css
.popular-badge {
	background: var(--theme-primary);  /* Mude para outra cor */
	background: #4da6ff;  /* Azul */
	background: #4dff6a;  /* Verde */
}
```

### Mudar espaçamento entre produtos

Arquivo: `src/pages/index.astro`

```css
.products-grid {
	gap: 2rem;  /* Espaço entre cards */
}

/* Mais espaço */
gap: 3rem;

/* Menos espaço */
gap: 1rem;
```

### Mudar largura máxima do container

Arquivo: `src/styles/theme.css`

```css
:root {
	--container-max-width: 1100px;
}

/* Mais largo */
--container-max-width: 1400px;

/* Mais estreito */
--container-max-width: 900px;
```

## 🔄 Aplicando as Mudanças

1. Edite os arquivos CSS/Astro
2. Salve (`Ctrl+S` ou `Cmd+S`)
3. O navegador recarrega automaticamente
4. Se não recarregar, pressione `F5`

## 🎨 Ferramentas Úteis

- **Coolors.co** - Gerar paletas de cores
- **Google Fonts** - Fontes gratuitas
- **CSS Gradient** - Criar gradientes
- **Cubic-bezier.com** - Criar animações customizadas
