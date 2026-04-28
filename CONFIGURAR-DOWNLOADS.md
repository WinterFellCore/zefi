# Configuração de Downloads

## Como adicionar seus links de download

### 1. Editar a API de Downloads

Abra o arquivo `src/pages/api/downloads.ts` e substitua os links na constante `DOWNLOADS`:

```typescript
const DOWNLOADS = [
  {
    id: 'loader',
    name: 'ZEFI Loader',
    description: 'Loader principal do ZEFI. Versão mais recente com todas as features.',
    url: 'SEU_LINK_AQUI', // ← SUBSTITUA ESTE LINK
    version: '1.0.0',
    size: '2.5 MB',
  },
  // ... adicione mais downloads aqui
];
```

### 2. Adicionar novos downloads

Para adicionar um novo download, adicione um novo objeto no array:

```typescript
{
  id: 'meu-arquivo',           // ID único
  name: 'Nome do Arquivo',     // Nome exibido
  description: 'Descrição',    // Descrição do arquivo
  url: 'https://...',          // Link direto de download
  version: '1.0.0',            // Versão (opcional)
  size: '5 MB',                // Tamanho (opcional)
}
```

### 3. Tipos de links suportados

Você pode usar:
- **Google Drive**: Use links diretos (não compartilhamento)
- **Dropbox**: Use links diretos de download
- **GitHub Releases**: Links diretos dos assets
- **MediaFire**: Links diretos
- **Seu próprio servidor**: Qualquer URL pública

### 4. Exemplo de configuração completa

```typescript
const DOWNLOADS = [
  {
    id: 'loader-v1',
    name: 'ZEFI Loader v1.0',
    description: 'Loader principal com anti-detecção.',
    url: 'https://github.com/seu-usuario/releases/download/v1.0/loader.zip',
    version: '1.0.0',
    size: '2.5 MB',
  },
  {
    id: 'config-default',
    name: 'Config Padrão',
    description: 'Configuração recomendada para iniciantes.',
    url: 'https://drive.google.com/uc?export=download&id=SEU_ID_AQUI',
    version: '1.0.0',
    size: '15 KB',
  },
  {
    id: 'tutorial-video',
    name: 'Tutorial em Vídeo',
    description: 'Como instalar e usar o ZEFI.',
    url: 'https://www.youtube.com/watch?v=SEU_VIDEO_ID',
    version: '1.0.0',
    size: 'Online',
  },
];
```

### 5. Configurar API de Autenticação

No arquivo `src/pages/api/auth.ts`, você pode configurar:

```typescript
// URL da sua API de autenticação
const API_URL = 'https://xereca-auth.vercel.app/api/verify';

// Versão do app
const APP_VERSION = '1.0';
```

### 6. Testar o sistema

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse: `http://localhost:4321/login`

3. Digite um Discord ID válido

4. Você será redirecionado para `/downloads` com os arquivos disponíveis

### 7. Segurança

⚠️ **IMPORTANTE**: 
- Os links de download ficam protegidos por autenticação
- Apenas usuários autenticados podem acessar `/downloads`
- O token expira em 24 horas
- Use HTTPS em produção

### 8. Personalização adicional

Você pode personalizar:
- Cores no `src/styles/theme.css`
- Textos nas páginas `login.astro` e `downloads.astro`
- Adicionar mais campos nos downloads (tags, categorias, etc.)

### 9. Deploy

Quando fizer deploy, certifique-se de:
- Usar variáveis de ambiente para URLs sensíveis
- Configurar CORS se necessário
- Usar HTTPS
- Proteger as rotas de API

## Suporte

Se precisar de ajuda, entre em contato com o suporte.

