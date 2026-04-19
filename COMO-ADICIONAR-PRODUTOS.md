# 📦 Como Adicionar Novos Produtos

Guia simples para adicionar novos produtos à loja ZEFI.

## Passo 1: Editar o arquivo de produtos

Abra o arquivo `src/config/products.js` e adicione um novo produto ao array:

```javascript
export const products = [
	// Produtos existentes...
	
	// Novo produto
	{
		id: 'zfi-premium',  // ID único (sem espaços, use hífen)
		name: 'ZFI Premium',  // Nome que aparece no card
		description: 'Versão Premium com todos os recursos',  // Descrição curta
		features: [  // Lista de recursos (cada item é uma linha)
			'Todos os recursos do UEFI',
			'Suporte prioritário 24/7',
			'Atualizações automáticas',
			'Configurações personalizadas',
			'Anti-ban avançado'
		],
		price: 150.00,  // Preço em reais
		currency: 'BRL',  // Moeda (BRL = Real Brasileiro)
		popular: true  // true = mostra badge "POPULAR", false = não mostra
	}
];
```

## Exemplo Completo

```javascript
// src/config/products.js
export const products = [
	{
		id: 'zfi-remote',
		name: 'ZFI Remote',
		description: 'Free Fire Remote',
		features: [
			'Stream Mode • Mobile Control',
			'Aimbot, Silent Aim, No Recoil',
			'ESP Full (Box, Line, Skeleton)',
			'Observer Mode • Spinbot'
		],
		price: 60.00,
		currency: 'BRL',
		popular: false
	},
	{
		id: 'zfi-uefi',
		name: 'ZFI UEFI',
		description: 'UEFI 22H2 Method',
		features: [
			'Aimbot, Silent Aim, No Recoil',
			'ESP Full (Box, Line, Skeleton)',
			'Undetected Method'
		],
		price: 100.00,
		currency: 'BRL',
		popular: true  // Este produto terá o badge "POPULAR"
	},
	{
		id: 'zfi-internal',
		name: 'ZFI Internal',
		description: 'x86 / V7A Support',
		features: [
			'Aimbot, Silent Aim, No Recoil',
			'ESP Full (Box, Line, Skeleton)',
			'Stable Injection'
		],
		price: 80.00,
		currency: 'BRL',
		popular: false
	},
	// Adicione novos produtos aqui
	{
		id: 'zfi-lite',
		name: 'ZFI Lite',
		description: 'Versão básica para iniciantes',
		features: [
			'Aimbot básico',
			'ESP simples',
			'Suporte por email'
		],
		price: 40.00,
		currency: 'BRL',
		popular: false
	}
];
```

## Campos Explicados

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | string | ✅ Sim | Identificador único do produto (use kebab-case) |
| `name` | string | ✅ Sim | Nome do produto exibido no card |
| `description` | string | ✅ Sim | Descrição curta (1 linha) |
| `features` | array | ✅ Sim | Lista de recursos/características |
| `price` | number | ✅ Sim | Preço em formato decimal (ex: 60.00) |
| `currency` | string | ❌ Não | Moeda (padrão: 'BRL') |
| `popular` | boolean | ❌ Não | Mostrar badge "POPULAR" (padrão: false) |

## Dicas de Formatação

### Features (Recursos)

Você pode usar diferentes formatos:

```javascript
// Formato simples
features: [
	'Recurso 1',
	'Recurso 2',
	'Recurso 3'
]

// Com separadores
features: [
	'Categoria A • Categoria B',
	'Recurso principal',
	'Outro recurso'
]

// Com quebras de linha (use <br> no texto)
features: [
	'Primeira linha<br>Segunda linha',
	'Outro recurso'
]
```

### Preços

```javascript
// Correto ✅
price: 60.00
price: 100.50
price: 149.99

// Incorreto ❌
price: "60"
price: 60
price: "R$ 60,00"
```

### Popular Badge

```javascript
// Mostrar badge "POPULAR"
popular: true

// Não mostrar badge
popular: false

// Ou simplesmente omitir (padrão é false)
// popular não precisa estar presente
```

## Ordem dos Produtos

Os produtos aparecem na ordem em que estão no array. Para reordenar:

```javascript
export const products = [
	// Este aparece primeiro
	{ id: 'produto-1', ... },
	
	// Este aparece segundo
	{ id: 'produto-2', ... },
	
	// Este aparece terceiro
	{ id: 'produto-3', ... },
];
```

## Remover um Produto

Para remover, simplesmente delete ou comente o objeto:

```javascript
export const products = [
	{
		id: 'zfi-remote',
		// ...
	},
	// {
	//   id: 'zfi-old',  // Produto removido
	//   ...
	// },
	{
		id: 'zfi-uefi',
		// ...
	},
];
```

## Editar um Produto Existente

Basta encontrar o produto pelo `id` e modificar os campos:

```javascript
{
	id: 'zfi-remote',
	name: 'ZFI Remote Pro',  // Nome alterado
	description: 'Nova descrição',
	features: [
		'Novo recurso adicionado',  // Recurso adicionado
		'Recurso existente'
	],
	price: 70.00,  // Preço alterado
	popular: true  // Agora é popular
}
```

## Testando as Mudanças

Após editar o arquivo:

1. Salve o arquivo (`Ctrl+S` ou `Cmd+S`)
2. O servidor de desenvolvimento recarrega automaticamente
3. Atualize o navegador para ver as mudanças

Se o servidor não estiver rodando:

```bash
npm run dev
```

## Exemplo: Adicionando Plano Anual

```javascript
{
	id: 'zfi-uefi-anual',
	name: 'ZFI UEFI Anual',
	description: 'UEFI 22H2 - Plano Anual com Desconto',
	features: [
		'Todos os recursos do UEFI',
		'12 meses de acesso',
		'Economia de 20%',
		'Atualizações gratuitas',
		'Suporte prioritário'
	],
	price: 960.00,  // 100 x 12 = 1200, com 20% desconto = 960
	currency: 'BRL',
	popular: true
}
```

## Validação

Certifique-se de que:

- ✅ Cada produto tem um `id` único
- ✅ Todos os campos obrigatórios estão preenchidos
- ✅ O preço está em formato numérico (não string)
- ✅ O array `features` tem pelo menos 1 item
- ✅ Não há vírgula após o último produto do array

## Problemas Comuns

### Erro: "Unexpected token"
- Verifique se não faltam vírgulas entre os objetos
- Verifique se não há vírgula após o último item

### Produtos não aparecem
- Verifique se salvou o arquivo
- Verifique se o servidor está rodando
- Verifique o console do navegador para erros

### Layout quebrado
- Verifique se todos os campos obrigatórios estão presentes
- Verifique se o formato do preço está correto
