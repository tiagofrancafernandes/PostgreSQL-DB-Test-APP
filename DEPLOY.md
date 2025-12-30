# Deploy to Vercel - Step by Step Guide

**English** | [Português](DEPLOY.pt-BR.md)

## Prerequisites

- A Vercel account (sign up at https://vercel.com)
- A PostgreSQL database accessible from the internet
- Git installed on your machine

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

## Step 2: Login to Vercel

```bash
vercel login
```

Follow the authentication prompts in your browser.

## Step 3: Prepare Your Database

Make sure your PostgreSQL database is accessible from the internet. If you're using a local database, you'll need to use a cloud PostgreSQL provider like:

- **Vercel Postgres** (recommended)
- **Supabase**
- **Railway**
- **Neon**
- **ElephantSQL**

### Using Vercel Postgres (Recommended)

1. Go to your Vercel dashboard
2. Create a new project or select an existing one
3. Go to the "Storage" tab
4. Click "Create Database" → "Postgres"
5. Copy the connection string

## Step 4: Deploy to Vercel

From your project directory:

```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **What's your project's name?** → pg-db-test-app (or your choice)
- **In which directory is your code located?** → ./

## Step 5: Configure Environment Variables

After deployment, you need to add the DATABASE_URL:

### Option A: Via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Your PostgreSQL connection string
   - **Environment**: All (Production, Preview, Development)
5. Click **Save**

### Option B: Via CLI

```bash
vercel env add DATABASE_URL
```

Paste your database URL when prompted and select all environments.

## Step 6: Redeploy

After adding environment variables, trigger a new deployment:

```bash
vercel --prod
```

## Step 7: Test Your Deployment

Your API will be available at:

```
https://your-project-name.vercel.app/count
```

Test it:

```bash
# Default table
curl https://your-project-name.vercel.app/count

# Specific table
curl https://your-project-name.vercel.app/count?table=users

# POST request
curl -X POST https://your-project-name.vercel.app/count \
  -H "Content-Type: application/json" \
  -d '{"table": "users"}'
```

## Troubleshooting

### Database Connection Errors

If you get connection errors:

1. **Check your DATABASE_URL**:
   - Make sure it's correct
   - Verify it includes `?sslmode=disable` or `?sslmode=require` (depending on your provider)

2. **SSL Mode**:
   - Most cloud providers require SSL: use `?sslmode=require`
   - Local databases usually don't: use `?sslmode=disable`

3. **Firewall/IP Whitelist**:
   - Some providers require whitelisting Vercel IPs
   - Check your database provider's documentation

### View Logs

```bash
vercel logs
```

Or check logs in the Vercel dashboard under **Deployments** → Select deployment → **Logs**.

## Environment Variables Format

```bash
# For cloud databases (with SSL)
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require

# For local databases (without SSL)
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=disable
```

## Continuous Deployment

### Option 1: GitHub Integration

1. Push your code to GitHub
2. Go to Vercel dashboard
3. Click **Import Project**
4. Select your GitHub repository
5. Vercel will automatically deploy on every push to main branch

### Option 2: Manual Deployment

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Custom Domain

To add a custom domain:

1. Go to project **Settings** → **Domains**
2. Add your domain
3. Configure DNS records as instructed

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
