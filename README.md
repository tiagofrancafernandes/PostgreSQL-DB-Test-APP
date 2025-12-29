# PostgreSQL Count API

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
DATABASE_URL=postgresql://postgres:postgres@172.17.0.1:1010/postgres?sslmode=false
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

## Deploy na Vercel

1. Instalar Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Configurar variável de ambiente na Vercel:
- Acesse o dashboard da Vercel
- Vá em Settings > Environment Variables
- Adicione `DATABASE_URL` com a URL do seu banco PostgreSQL

## Endpoints

### GET /count

Retorna a contagem de itens na tabela `items`.

**Resposta:**
```json
{
    "count": 3
}
```

## CORS

CORS está habilitado para qualquer origem (`*`).
