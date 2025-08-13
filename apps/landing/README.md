# Peak Health Landing App

A modern, responsive landing page for Peak Health built with Next.js and CSS Modules.

## Features

- **Modern Design**: Clean, professional design with gradient accents and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **SEO Optimized**: Built-in SEO features with meta tags and structured data
- **Performance**: Optimized for fast loading with Next.js App Router
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA labels

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: CSS Modules (no Tailwind)
- **Icons**: Lucide React
- **TypeScript**: Full TypeScript support
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Run the development server:

```bash
pnpm dev
```

3. Open [http://localhost:3024](http://localhost:3024) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── landing/           # Landing page specific components
│   │   ├── HeroSection.tsx
│   │   ├── FeatureSection.tsx
│   │   ├── TestimonialSection.tsx
│   │   └── CTASection.tsx
│   ├── shared/            # Shared components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/                # UI components (future)
└── lib/                   # Utility functions (future)
```

## Components

### Landing Components

- **HeroSection**: Main hero with call-to-action and app mockup
- **FeatureSection**: Feature showcase with icons and descriptions
- **TestimonialSection**: Customer testimonials and social proof
- **CTASection**: Final call-to-action with trial offer

### Shared Components

- **Header**: Navigation with logo, menu, and action buttons
- **Footer**: Site footer with links, social media, and newsletter signup

## Styling

This project uses CSS Modules for styling, following the user's preference to avoid Tailwind CSS. Each component has its own `.module.css` file with scoped styles.

### CSS Variables

The app uses CSS custom properties for consistent theming:

```css
:root {
  --primary: #3b82f6;
  --secondary: #f1f5f9;
  --foreground: #0f172a;
  --background: #ffffff;
  /* ... more variables */
}
```

## SEO Features

- Meta tags for social media (Open Graph, Twitter Cards)
- Structured data for better search engine understanding
- Semantic HTML structure
- Optimized images and performance

## Future Enhancements

- [ ] Blog integration with MDX
- [ ] Pro and Enterprise landing page variants
- [ ] A/B testing capabilities
- [ ] Analytics integration
- [ ] Contact form functionality
- [ ] Newsletter signup integration
- [ ] Internationalization (i18n)

## Deployment

The app is configured for easy deployment on:

- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Drag and drop the `out` folder after building
- **Static Hosting**: Build with `pnpm build` and serve the `out` directory

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is part of the Peak Health platform.
