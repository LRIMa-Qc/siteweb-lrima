# LRIMa Website

Laboratoire de Recherche Informatique Maisonneuve - Official website built with Next.js 15 and Payload CMS.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **CMS**: Payload CMS 3.x
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Internationalization**: Paraglide.js (French/English)
- **Testing**: Vitest (integration) + Playwright (E2E)
- **Deployment**: Vercel

## Prerequisites

- Node.js 18.20.2+ or 20.9.0+
- pnpm 9 or 10
- MongoDB (local or cloud)

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/LRIMa-Qc/lrima-website.git
cd lrima-website
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and configure:

- `DATABASE_URI` - MongoDB connection string
- `PAYLOAD_SECRET` - Generate a secure secret (see below)
- `NEXT_PUBLIC_SITE_URL` - Your site URL

Generate a secure PAYLOAD_SECRET:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Start MongoDB (Docker)

```bash
docker-compose up -d
```

### 5. Run development server

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

### 6. Access Payload Admin

Navigate to http://localhost:3000/admin and create your first admin user.

## Project Structure

```
src/
├── app/
│   ├── (frontend)/     # Public-facing pages
│   │   └── [locale]/   # Localized routes (fr/en)
│   └── (payload)/      # Payload admin routes
├── collections/        # Payload CMS collections
│   ├── Media.ts
│   ├── Members.ts
│   ├── News.ts
│   ├── Publications.ts
│   └── Users.ts
├── components/         # React components
│   ├── footer/
│   ├── header/
│   ├── landing/
│   └── ui/
├── lib/               # Utilities and constants
├── paraglide/         # Generated i18n files
└── payload.config.ts  # Payload configuration
```

## Testing

Run all tests:

```bash
pnpm test
```

Run integration tests only:

```bash
pnpm test:int
```

Run E2E tests only:

```bash
pnpm test:e2e
```

## Scripts

| Command               | Description              |
| --------------------- | ------------------------ |
| `pnpm dev`            | Start development server |
| `pnpm build`          | Build for production     |
| `pnpm start`          | Start production server  |
| `pnpm lint`           | Run ESLint               |
| `pnpm test`           | Run all tests            |
| `pnpm generate:types` | Generate Payload types   |

## Internationalization

The site supports French (default) and English. Language files are located in:

- `messages/fr.json`
- `messages/en.json`

To add translations:

```bash
pnpm machine-translate
```

## Deployment to Vercel

### 1. Push to GitHub

Ensure your code is pushed to a GitHub repository.

### 2. Import to Vercel

1. Go to vercel.com and sign in
2. Click "Add New Project"
3. Import your GitHub repository

### 3. Configure Environment Variables

Add the following environment variables in Vercel:

| Variable               | Value                                | Required |
| ---------------------- | ------------------------------------ | -------- |
| `DATABASE_URI`         | Your MongoDB Atlas connection string | Yes      |
| `MONGODB_URI`          | Same as DATABASE_URI                 | Yes      |
| `PAYLOAD_SECRET`       | Your secure 64+ character secret     | Yes      |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel URL                      | Yes      |
| `RESEND_API_KEY`       | API key from resend.com              | Yes      |
| `RESEND_FROM_EMAIL`    | Verified sender email                | Yes      |
| `BLOB_READ_WRITE_TOKEN`| Vercel Blob storage token            | Yes      |

### 4. Deploy

Click "Deploy" and Vercel will automatically build and deploy your site.

### 5. Set up MongoDB Atlas

For production, use MongoDB Atlas:

1. Create a free cluster
2. Create a database user
3. Whitelist Vercel's IP addresses (or allow access from anywhere: 0.0.0.0/0)
4. Get your connection string and add it to Vercel

## Environments & Branching Strategy

The project uses a two-branch deployment strategy with shared resources:

| Branch | URL | Purpose |
| ------ | --- | ------- |
| `main` | [lrima.ca](https://lrima.ca) / [www.lrima.ca](https://www.lrima.ca) | Production |
| `dev`  | [dev.lrima.ca](https://dev.lrima.ca) | Development / Preview |

### Shared Resources

Both environments share the same:
- **MongoDB database** - Content changes appear on both sites
- **Vercel Blob storage** - Uploaded media is shared
- **Environment variables** - Same API keys for both

This simplifies content management since edits in Payload admin affect both environments.

### Git Workflow

```bash
# Daily development
git checkout dev
# make changes...
git push origin dev
# → auto-deploys to dev.lrima.ca

# Deploy to production
git checkout main
git merge dev
git push origin main
# → auto-deploys to lrima.ca
```

### Environment-Specific Variables

If needed, you can set different values per environment in Vercel:

| Variable | Production | Preview |
| -------- | ---------- | ------- |
| `NEXT_PUBLIC_SITE_URL` | `https://lrima.ca` | `https://dev.lrima.ca` |

## Collections

| Collection   | Description                      |
| ------------ | -------------------------------- |
| Users        | Admin users with authentication  |
| Media        | Uploaded images and files        |
| News         | News articles and announcements  |
| Members      | Lab team members and researchers |
| Publications | Academic publications and papers |

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Features

### Contact Form

The contact form uses [Resend](https://resend.com) to send emails. To configure:

1. Create an account at [resend.com](https://resend.com)
2. Add your domain in Resend Dashboard → Domains
3. Add the DNS records to your domain provider (Cloudflare, etc.)
4. Create an API key in Resend Dashboard → API Keys
5. Set environment variables:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   RESEND_FROM_EMAIL=LRIMa <contact@yourdomain.com>
   ```

### Image Optimization

Images from Vercel Blob storage are automatically optimized via Next.js Image Optimization. The `next.config.mjs` includes remote patterns for `*.public.blob.vercel-storage.com`.

### Vercel Blob Storage

Media uploads are stored in Vercel Blob. To configure:

1. In Vercel Dashboard → Storage → Create Database → Blob
2. Copy the `BLOB_READ_WRITE_TOKEN` to your environment variables

## Contact

- **Email**: lrima@cmaisonneuve.qc.ca
- **Website**: [lrima.ca](https://lrima.ca)
- **Address**: Collège de Maisonneuve, 3800 rue Sherbrooke Est, Montréal (Québec) H1X 2A2, Canada
