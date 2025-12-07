# Fares Bermak Portfolio

A modern, responsive portfolio website for Fares Bermak, showcasing services as a Remote Virtual Assistant & Data Entry Expert.

![Portfolio Screenshot](/Pictures/hero-image.webp)

## Features

- **Modern Design**: Clean, professional interface with smooth animations and transitions
- **Responsive Layout**: Optimized for all devices, from mobile to desktop
- **Interactive Components**: Engaging UI elements with hover effects and micro-interactions
- **Accessibility**: WCAG-compliant with keyboard navigation support
- **SEO Optimized**: Meta tags, sitemap, and semantic HTML for better search engine visibility
- **Performance**: Optimized images, lazy loading, and efficient code splitting
- **Multilingual Support**: Greetings in 10 languages reflecting trilingual capabilities (Arabic, English, French)

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics & Speed Insights
- **Code Quality**: ESLint with Next.js configuration

## Services Offered

### Virtual Assistant & Admin Support
Complete day-to-day operational support including calendar management, inbox organization, client communications, meeting preparation, and document control.

### Data Entry & Management
Fast, accurate data capture with structured spreadsheets designed for analysis. Processes 200-400+ records monthly with 99%+ accuracy.

### IT Support Help Desk L1
Helps remote teams integrate software tools, manage cloud systems, and resolve technical issues quickly.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   # TODO: Replace YOUR_GITHUB_USERNAME with your actual GitHub username
   git clone https://github.com/faresbermak97-tech/faresbermak.git
   cd faresbermak
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

   Configure variables in `.env.local` as needed for email services.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
│   │   ├── api/         # API routes
│   │   ├── error.tsx    # Error boundary
│   │   ├── not-found.tsx # 404 page
│   │   ├── global-error.tsx # Global error handler
│   │   ├── opengraph-image.tsx # Dynamic OG image
│   │   ├── robots.ts    # Robots.txt generation
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   ├── components/      # React components
│   │   ├── sections/    # Page sections
│   │   └── ui/          # UI components
│   ├── config/          # Configuration files
│   │   └── site.config.ts # Site configuration
│   ├── hooks/           # Custom React hooks
│   └── utils/           # Utility functions
├── .env.example         # Example environment variables
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
└── SETUP.md            # Detailed setup guide
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes sitemap generation)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run sitemap` - Generate sitemap

## Environment Variables

See `.env.example` for a list of required environment variables. These include:

- Email service configuration (for contact form)
  - Gmail SMTP (currently configured)
  - Resend (alternative)
  - SendGrid (alternative)
- Analytics (optional)

## Deployment

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

**Current deployment:** [https://faresbermak.vercel.app](https://faresbermak.vercel.app)

For other deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Email**: faresbermak97@gmail.com
- **Phone**: +213 542 346 579
- **LinkedIn**: [faresbermak-va](https://www.linkedin.com/in/faresbermak-va/)
- **Instagram**: [@bermak_fares](https://www.instagram.com/bermak_fares/)
- **Website**: [faresbermak.vercel.app](https://faresbermak.vercel.app)