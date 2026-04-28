# Sistema de Login com Discord ID

## ✅ O que foi criado

### 1. Página de Login (`/login`)
- Design com tema x86 (roxo/azul escuro)
- Campo para Discord ID
- Animação de loading
- Mensagens de erro
- Salva Discord ID no localStorage

### 2. Página de Downloads (`/downloads`)
- Protegida por autenticação
- Mostra perfil do usuário (avatar, nome, tempo restante)
- Grid de downloads com cards estilizados
- Botão de logout
- Redireciona para login se não autenticado

### 3. API de Autenticação (`/api/auth`)
- Valida Discord ID
- Conecta com a API xereca-auth
- Retorna token de acesso
- Busca dados do Discord (opcional)

### 4. API de Downloads (`/api/downloads`)
- Protegida por token
- Lista de downloads configurável
- Validação de token (expira em 24h)

## 🎨 Design

O sistema usa o mesmo tema do menu x86:
- **Fundo**: `#1b191d` (cinza escuro)
- **Cards**: `#1f1d21` (cinza médio)
- **Destaque**: `#42467e` (roxo/azul)
- **Texto**: `#b0afb0` (cinza claro)

## 🚀 Como usar

### 1. Configure os links de download

Edite `src/pages/api/downloads.ts`:

```typescript
const DOWNLOADS = [
  {
    id: 'loader',
    name: 'ZEFI Loader',
    description: 'Descrição do arquivo',
    url: 'SEU_LINK_AQUI', // ← Coloque seu link aqui
    version: '1.0.0',
    size: '2.5 MB',
  },
  // Adicione mais downloads...
];
```

### 2. Teste localmente

```bash
npm run dev
```

Acesse: `http://localhost:4321/login`

### 3. Fluxo de uso

1. Usuário acessa `/login`
2. Digite o Discord ID
3. Sistema valida com a API
4. Se válido, redireciona para `/downloads`
5. Mostra perfil e lista de downloads
6. Usuário pode baixar os arquivos

## 📝 Envie seus links

Agora você pode me enviar os links de download que quer adicionar! Formato:

```
Nome: ZEFI Loader
Descrição: Loader principal
Link: https://...
Tamanho: 2.5 MB
```

Ou me envie uma lista e eu adiciono no código para você!

## 🔒 Segurança

- ✅ Páginas protegidas por autenticação
- ✅ Token expira em 24 horas
- ✅ Validação de Discord ID via API
- ✅ Links de download só acessíveis após login

## 🎯 Próximos passos

1. Me envie os links de download
2. Eu adiciono no código
3. Você testa
4. Deploy!

## 📱 Responsivo

O sistema é totalmente responsivo e funciona em:
- Desktop
- Tablet
- Mobile

## 🛠️ Personalização

Você pode personalizar:
- Cores em `src/styles/theme.css`
- Textos nas páginas
- Adicionar mais campos nos downloads
- Integrar com Discord Bot para buscar avatares

