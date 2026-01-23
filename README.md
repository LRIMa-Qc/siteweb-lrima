# LRIMa Website

Laboratoire de Recherche Informatique Maisonneuve - Official website built with Next.js 15 and Payload CMS.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **CMS**: [Payload CMS 3.x](https://payloadcms.com/)
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Internationalization**: Paraglide.js (French/English)
- **Testing**: Vitest (integration) + Playwright (E2E)
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18.20.2+ or 20.9.0+
- pnpm 9 or 10
- MongoDB (local or cloud)

## 🛠️ Local Development

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

**Generate a secure PAYLOAD_SECRET:**

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

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Access Payload Admin

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) and create your first admin user.

## 📁 Project Structure

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

## 🧪 Testing

### Run all tests

```bash
pnpm test
```

### Run integration tests only

```bash
pnpm test:int
```

### Run E2E tests only

```bash
pnpm test:e2e
```

## 🔧 Scripts

| Command               | Description              |
| --------------------- | ------------------------ |
| `pnpm dev`            | Start development server |
| `pnpm build`          | Build for production     |
| `pnpm start`          | Start production server  |
| `pnpm lint`           | Run ESLint               |
| `pnpm test`           | Run all tests            |
| `pnpm generate:types` | Generate Payload types   |

## 🌍 Internationalization

The site supports French (default) and English. Language files are located in:

- `messages/fr.json`
- `messages/en.json`

To add translations:

```bash
pnpm machine-translate
```

## 🚀 Deployment to Vercel

### 1. Push to GitHub

Ensure your code is pushed to a GitHub repository.

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository

### 3. Configure Environment Variables

Add the following environment variables in Vercel:

| Variable               | Value                                |
| ---------------------- | ------------------------------------ |
| `DATABASE_URI`         | Your MongoDB Atlas connection string |
| `MONGODB_URI`          | Same as DATABASE_URI                 |
| `PAYLOAD_SECRET`       | Your secure 64+ character secret     |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app`     |

### 4. Deploy

Click "Deploy" and Vercel will automatically build and deploy your site.

### 5. Set up MongoDB Atlas

For production, use [MongoDB Atlas](https://www.mongodb.com/atlas):

1. Create a free cluster
2. Create a database user
3. Whitelist Vercel's IP addresses (or allow access from anywhere: `0.0.0.0/0`)
4. Get your connection string and add it to Vercel

## 📝 Collections

| Collection       | Description                      |
| ---------------- | -------------------------------- |
| **Users**        | Admin users with authentication  |
| **Media**        | Uploaded images and files        |
| **News**         | News articles and announcements  |
| **Members**      | Lab team members and researchers |
| **Publications** | Academic publications and papers |

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

- **Email**: lrima@cmaisonneuve.qc.ca
- **Address**: Collège de Maisonneuve, 3800 rue Sherbrooke Est, Montréal (Québec) H1X 2A2, Canada
