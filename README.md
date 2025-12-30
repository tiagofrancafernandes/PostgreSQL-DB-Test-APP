# PostgreSQL Count API

**English** | [Português](README.pt-BR.md)

Simple application with a single route that counts items from a PostgreSQL table using Drizzle ORM.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit the `.env` file and configure the database URL:
```
DATABASE_URL=postgresql://postgres:postgres@172.17.0.1:1010/postgres?sslmode=disable
PORT=3000
```

## Create database table

Execute the following SQL in your PostgreSQL database:

```sql
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert test data
INSERT INTO items (name) VALUES
    ('Item 1'),
    ('Item 2'),
    ('Item 3');
```

## Run locally

```bash
npm run dev
```

The API will be available at `http://localhost:3000/count`

The server restarts automatically when you modify files (hot reload enabled).

## Deploy to Vercel

For detailed deployment instructions, see the [Deploy Guide](DEPLOY.md).

Quick start:

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Configure environment variable:
```bash
vercel env add DATABASE_URL
```

4. Redeploy:
```bash
vercel --prod
```

See [DEPLOY.md](DEPLOY.md) for complete step-by-step instructions, troubleshooting, and best practices.

## Endpoints

### GET /count

Returns the count of records from a specific table.

#### Use default table (migrations):
```bash
curl http://localhost:3000/count
```

**Response:**
```json
{
    "count": 5,
    "table": "migrations"
}
```

#### Specify table via query parameter:
```bash
# Count records from users table
curl http://localhost:3000/count?table=users

# Count records from roles table
curl http://localhost:3000/count?table=roles

# Count records from items table
curl http://localhost:3000/count?table=items
```

**Response:**
```json
{
    "count": 10,
    "table": "users"
}
```

### POST /count

You can also specify the table via request body:

```bash
curl -X POST http://localhost:3000/count \
  -H "Content-Type: application/json" \
  -d '{"table": "users"}'
```

**Response:**
```json
{
    "count": 10,
    "table": "users"
}
```

## Usage examples

```bash
# Default table
http://localhost:3000/count

# Count users
http://localhost:3000/count?table=users

# Count roles
http://localhost:3000/count?table=roles

# Count items
http://localhost:3000/count?table=items
```

## CORS

CORS is enabled for any origin (`*`).
