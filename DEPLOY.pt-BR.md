# Deploy na Vercel - Guia Passo a Passo

[English](DEPLOY.md) | **Português**

## Pré-requisitos

- Uma conta na Vercel (cadastre-se em https://vercel.com)
- Um banco de dados PostgreSQL acessível pela internet
- Git instalado na sua máquina

## Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

## Passo 2: Fazer Login na Vercel

```bash
vercel login
```

Siga as instruções de autenticação no navegador.

## Passo 3: Preparar o Banco de Dados

Certifique-se de que seu banco PostgreSQL está acessível pela internet. Se estiver usando um banco local, você precisará usar um provedor de PostgreSQL na nuvem como:

- **Vercel Postgres** (recomendado)
- **Supabase**
- **Railway**
- **Neon**
- **ElephantSQL**

### Usando Vercel Postgres (Recomendado)

1. Vá para o dashboard da Vercel
2. Crie um novo projeto ou selecione um existente
3. Vá para a aba "Storage"
4. Clique em "Create Database" → "Postgres"
5. Copie a string de conexão

## Passo 4: Fazer Deploy na Vercel

No diretório do projeto:

```bash
vercel
```

Siga as instruções:
- **Set up and deploy?** → Yes
- **Which scope?** → Selecione sua conta
- **Link to existing project?** → No
- **What's your project's name?** → pg-db-test-app (ou sua escolha)
- **In which directory is your code located?** → ./

## Passo 5: Configurar Variáveis de Ambiente

Após o deploy, você precisa adicionar a DATABASE_URL:

### Opção A: Via Dashboard da Vercel

1. Acesse https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione uma nova variável:
   - **Name**: `DATABASE_URL`
   - **Value**: Sua string de conexão PostgreSQL
   - **Environment**: All (Production, Preview, Development)
5. Clique em **Save**

### Opção B: Via CLI

```bash
vercel env add DATABASE_URL
```

Cole a URL do banco quando solicitado e selecione todos os ambientes.

## Passo 6: Fazer Redeploy

Após adicionar as variáveis de ambiente, faça um novo deployment:

```bash
vercel --prod
```

## Passo 7: Testar o Deployment

Sua API estará disponível em:

```
https://nome-do-seu-projeto.vercel.app/count
```

Teste:

```bash
# Tabela padrão
curl https://nome-do-seu-projeto.vercel.app/count

# Tabela específica
curl https://nome-do-seu-projeto.vercel.app/count?table=users

# Requisição POST
curl -X POST https://nome-do-seu-projeto.vercel.app/count \
  -H "Content-Type: application/json" \
  -d '{"table": "users"}'
```

## Solução de Problemas

### Erros de Conexão com o Banco

Se você receber erros de conexão:

1. **Verifique sua DATABASE_URL**:
   - Certifique-se de que está correta
   - Verifique se inclui `?sslmode=disable` ou `?sslmode=require` (dependendo do provedor)

2. **Modo SSL**:
   - A maioria dos provedores na nuvem exige SSL: use `?sslmode=require`
   - Bancos locais geralmente não exigem: use `?sslmode=disable`

3. **Firewall/Lista de IPs**:
   - Alguns provedores exigem adicionar os IPs da Vercel na whitelist
   - Consulte a documentação do seu provedor de banco de dados

### Visualizar Logs

```bash
vercel logs
```

Ou verifique os logs no dashboard da Vercel em **Deployments** → Selecione o deployment → **Logs**.

## Formato das Variáveis de Ambiente

```bash
# Para bancos na nuvem (com SSL)
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require

# Para bancos locais (sem SSL)
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=disable
```

## Deploy Contínuo

### Opção 1: Integração com GitHub

1. Envie seu código para o GitHub
2. Vá para o dashboard da Vercel
3. Clique em **Import Project**
4. Selecione seu repositório do GitHub
5. A Vercel fará deploy automaticamente a cada push na branch main

### Opção 2: Deploy Manual

```bash
# Deploy para preview
vercel

# Deploy para produção
vercel --prod
```

## Domínio Personalizado

Para adicionar um domínio personalizado:

1. Vá em **Settings** → **Domains** do projeto
2. Adicione seu domínio
3. Configure os registros DNS conforme instruído

## Recursos Adicionais

- [Documentação da Vercel](https://vercel.com/docs)
- [Documentação do Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Documentação do Drizzle ORM](https://orm.drizzle.team/)
