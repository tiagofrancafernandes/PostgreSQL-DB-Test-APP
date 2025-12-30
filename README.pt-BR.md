# PostgreSQL Count API

[English](README.md) | **Português**

Aplicação simples com uma rota que conta os itens de uma tabela PostgreSQL usando Drizzle ORM.

## Configuração

1. Instalar dependências:
```bash
npm install
```

2. Configurar variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure a URL do banco de dados:
```
DATABASE_URL=postgresql://postgres:postgres@172.17.0.1:1010/postgres?sslmode=disable
PORT=3000
```

## Criar a tabela no banco

Execute o seguinte SQL no seu banco PostgreSQL:

```sql
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Inserir alguns dados de teste
INSERT INTO items (name) VALUES
    ('Item 1'),
    ('Item 2'),
    ('Item 3');
```

## Executar localmente

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000/count`

O servidor reinicia automaticamente quando você modificar os arquivos (hot reload habilitado).

## Deploy na Vercel

Para instruções detalhadas de deployment, veja o [Guia de Deploy](DEPLOY.pt-BR.md).

Início rápido:

1. Instalar Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Configurar variável de ambiente:
```bash
vercel env add DATABASE_URL
```

4. Fazer redeploy:
```bash
vercel --prod
```

Veja [DEPLOY.pt-BR.md](DEPLOY.pt-BR.md) para instruções completas passo a passo, solução de problemas e melhores práticas.

## Endpoints

### GET /count

Retorna a contagem de registros de uma tabela específica.

#### Usar tabela padrão (migrations):
```bash
curl http://localhost:3000/count
```

**Resposta:**
```json
{
    "count": 5,
    "table": "migrations"
}
```

#### Especificar tabela via query parameter:
```bash
# Contar registros da tabela users
curl http://localhost:3000/count?table=users

# Contar registros da tabela roles
curl http://localhost:3000/count?table=roles

# Contar registros da tabela items
curl http://localhost:3000/count?table=items
```

**Resposta:**
```json
{
    "count": 10,
    "table": "users"
}
```

### POST /count

Você também pode especificar a tabela via body do request:

```bash
curl -X POST http://localhost:3000/count \
  -H "Content-Type: application/json" \
  -d '{"table": "users"}'
```

**Resposta:**
```json
{
    "count": 10,
    "table": "users"
}
```

## Exemplos de uso

```bash
# Tabela padrão
http://localhost:3000/count

# Contar usuários
http://localhost:3000/count?table=users

# Contar roles
http://localhost:3000/count?table=roles

# Contar items
http://localhost:3000/count?table=items
```

## CORS

CORS está habilitado para qualquer origem (`*`).
