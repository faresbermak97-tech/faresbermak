# Project Setup Guide

This guide will help you set up the Fares Bermak portfolio website on your local machine.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/faresbermak.git
   cd faresbermak
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Fill in the actual values for the environment variables in `.env.local`

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

The application requires the following environment variables to be configured in `.env.local`:

### Email Configuration (Required for contact form)

Choose one of the following email providers:

#### Option 1: Resend (Recommended)
```
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=your_email@example.com
RESEND_TO_EMAIL=recipient@example.com
```

#### Option 2: SendGrid
```
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=your_email@example.com
SENDGRID_TO_EMAIL=recipient@example.com
```

#### Option 3: Nodemailer with SMTP
```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_username
SMTP_PASS=your_password
SMTP_FROM_EMAIL=your_email@example.com
SMTP_TO_EMAIL=recipient@example.com
```

### Optional Variables

```
# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# API Keys
API_KEY=your_api_key_here
```

## Build and Deployment

1. Generate sitemap (optional):
   ```bash
   npm run sitemap
   # or
   yarn sitemap
   ```

2. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```

   Note: The build script automatically generates the sitemap before building the application.

3. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Project Structure

```
faresbermak/
├── public/               # Static assets
│   ├── Pictures/        # Images
│   └── sitemap.xml      # Generated sitemap
├── scripts/             # Utility scripts
│   └── generate-sitemap.js
├── src/                 # Source code
│   ├── app/             # Next.js app directory
│   ├── components/      # React components
│   └── hooks/           # Custom React hooks
├── .env.example         # Example environment variables
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
└── SETUP.md            # This file
```

## SEO Optimization

The project includes several SEO optimizations:

1. **Sitemap**: Automatically generated with `npm run sitemap` or during the build process
2. **Meta tags**: Configured in the layout file
3. **Image optimization**: Next.js Image component with proper sizing
4. **Performance optimizations**: Configured in next.config.js

## Troubleshooting

If you encounter any issues:

1. Make sure all environment variables are properly set
2. Clear the Next.js cache:
   ```bash
   rm -rf .next
   ```
3. Reinstall dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

For more information, refer to the [Next.js documentation](https://nextjs.org/docs).
