# 💳 Guia de Integração de Pagamento

Este guia mostra como adicionar funcionalidade de compra aos produtos da ZEFI.

## Opções de Pagamento no Brasil

### 1. MercadoPago (Recomendado para Brasil)

**Vantagens:**
- Aceita PIX, cartão, boleto
- Taxas competitivas
- Fácil integração
- Suporte em português

**Instalação:**
```bash
npm install mercadopago
```

**Exemplo de integração:**

```javascript
// src/pages/api/create-payment.js
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: import.meta.env.MERCADOPAGO_ACCESS_TOKEN
});

export async function post({ request }) {
  const { productId, quantity } = await request.json();
  
  const preference = {
    items: [
      {
        title: 'ZFI Remote',
        unit_price: 60.00,
        quantity: 1,
      }
    ],
    back_urls: {
      success: 'https://seusite.com/success',
      failure: 'https://seusite.com/failure',
      pending: 'https://seusite.com/pending'
    },
    auto_return: 'approved',
  };

  const response = await mercadopago.preferences.create(preference);
  return new Response(JSON.stringify({ id: response.body.id }), {
    status: 200,
  });
}
```

### 2. Stripe

**Vantagens:**
- Internacional
- Muito usado
- Ótima documentação

**Instalação:**
```bash
npm install @stripe/stripe-js stripe
```

### 3. PagSeguro

**Vantagens:**
- Popular no Brasil
- Aceita várias formas de pagamento

## Implementação Básica

### 1. Atualizar ProductCard.astro

```astro
---
// src/components/products/ProductCard.astro
export interface Props {
  id: string;
  name: string;
  // ... outros props
}

const { id, name, price, ... } = Astro.props;
---

<div class="product-card">
  <!-- ... conteúdo do card ... -->
  
  <button 
    class="buy-button" 
    data-product-id={id}
    data-product-name={name}
    data-product-price={price}
  >
    Comprar Agora
  </button>
</div>

<script>
  document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', async (e) => {
      const target = e.target as HTMLButtonElement;
      const productId = target.dataset.productId;
      const productName = target.dataset.productName;
      const productPrice = target.dataset.productPrice;
      
      // Chamar API de pagamento
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId, 
          productName, 
          productPrice 
        })
      });
      
      const { checkoutUrl } = await response.json();
      window.location.href = checkoutUrl;
    });
  });
</script>
```

### 2. Criar API Route

```javascript
// src/pages/api/create-payment.js
export async function post({ request }) {
  const { productId, productName, productPrice } = await request.json();
  
  // Integrar com seu gateway de pagamento
  // Exemplo com MercadoPago, Stripe, etc.
  
  return new Response(JSON.stringify({ 
    checkoutUrl: 'https://checkout.mercadopago.com/...' 
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
```

### 3. Criar Páginas de Sucesso/Erro

```astro
---
// src/pages/success.astro
import Layout from '../layouts/Page.astro';
---

<Layout>
  <div class="success-page">
    <h1>✅ Pagamento Aprovado!</h1>
    <p>Obrigado pela sua compra. Você receberá as instruções por email.</p>
  </div>
</Layout>
```

## Sistema de Licenças

Após o pagamento ser confirmado, você precisa:

1. **Gerar uma chave de licença única**
2. **Enviar por email para o cliente**
3. **Armazenar no banco de dados**

### Exemplo de geração de licença:

```javascript
// src/utils/license.js
import crypto from 'crypto';

export function generateLicense(productId, userId) {
  const data = `${productId}-${userId}-${Date.now()}`;
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  
  // Formato: XXXX-XXXX-XXXX-XXXX
  return hash.substring(0, 16).toUpperCase().match(/.{1,4}/g).join('-');
}
```

## Webhook para Confirmação de Pagamento

```javascript
// src/pages/api/webhook.js
export async function post({ request }) {
  const payload = await request.json();
  
  // Verificar assinatura do webhook
  // Processar pagamento confirmado
  // Gerar licença
  // Enviar email
  
  if (payload.status === 'approved') {
    const license = generateLicense(payload.productId, payload.userId);
    await sendLicenseEmail(payload.email, license);
    await saveLicenseToDatabase(license, payload);
  }
  
  return new Response('OK', { status: 200 });
}
```

## Variáveis de Ambiente

Crie um arquivo `.env`:

```env
# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=seu_token_aqui
MERCADOPAGO_PUBLIC_KEY=sua_chave_publica

# Email (para enviar licenças)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha

# Database
DATABASE_URL=sua_url_do_banco
```

## Banco de Dados

Você vai precisar armazenar:

```sql
CREATE TABLE licenses (
  id SERIAL PRIMARY KEY,
  license_key VARCHAR(19) UNIQUE NOT NULL,
  product_id VARCHAR(50) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  payment_id VARCHAR(255) UNIQUE NOT NULL,
  product_id VARCHAR(50) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Próximos Passos

1. Escolher gateway de pagamento
2. Criar conta no gateway escolhido
3. Implementar API routes
4. Configurar webhooks
5. Implementar sistema de licenças
6. Configurar envio de emails
7. Testar em modo sandbox
8. Deploy em produção

## Recursos Úteis

- [MercadoPago Docs](https://www.mercadopago.com.br/developers/pt)
- [Stripe Docs](https://stripe.com/docs)
- [Astro API Routes](https://docs.astro.build/en/core-concepts/endpoints/)
