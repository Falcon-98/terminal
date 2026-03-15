# Falcon 98 Terminal - Next.js Version

A modern, interactive web-based terminal interface built with Next.js, TypeScript, and Tailwind CSS. This terminal showcases the professional portfolio and information about Falcon 98 and Ashen Wijesingha.

## Features

- 🚀 **Modern Stack**: Built with Next.js 16, TypeScript, and Tailwind CSS
- 💻 **Interactive Terminal**: Full-featured terminal interface with 25+ commands
- ⌨️ **Command Features**:
  - Tab completion for commands
  - Command history (up/down arrows)
  - Password protected secret command
  - Matrix effect easter egg
- 🎨 **Responsive Design**: Works on desktop, tablet, and shows a message on mobile
- 🔍 **SEO Optimized**: Full meta tags, Open Graph, and Twitter Cards
- ♿ **Accessible**: ARIA labels and keyboard navigation support

## Available Commands

### Information Commands
- `help` - Show available commands
- `whois` - About Falcon 98 company
- `about` - About Ashen Wijesingha
- `skills` - Technical skills & expertise
- `experience` - Professional work history
- `education` - Educational background
- `leadership` - Leadership roles & achievements
- `whoami` - Philosophical question

### Portfolio & Contact
- `projects` - Featured projects
- `social` - Social media links
- `contact` - Contact information

### System Commands
- `clear` - Clear terminal screen
- `history` - Show command history
- `banner` - Display welcome banner
- `date` - Current date and time
- `pwd` - Current directory
- `ls` - List directory contents
- `neofetch` - System information
- `uptime` - Terminal uptime

### Quick Links
- `github` - Open GitHub profile
- `linkedin` - Open LinkedIn profile
- `website` - Open Falcon 98 website
- `email` - Open email client
- `qr` - Open QR Code Generator project

### Easter Eggs
- `secret` - Unlock secret content (password: falcon98)
- `matrix` - Enter the Matrix effect

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

No environment variables are required for basic functionality.

## Project Structure

```
nextjs-terminal/
├── public/
│   └── logo.png          # Falcon 98 logo
├── src/
│   ├── app/
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout with metadata
│   │   └── page.tsx      # Home page
│   ├── components/
│   │   └── Terminal.tsx  # Terminal component
│   ├── hooks/
│   │   └── useTerminal.ts # Terminal logic hook
│   ├── lib/
│   │   └── commands-data.ts # Command data and content
│   └── types/
│       └── index.ts      # TypeScript types
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: System monospace fonts (Courier New, Monaco, Menlo)
- **Build Tool**: Turbopack

## Original Version

The original static HTML/CSS/JS version is located in the parent directory:
- `../index.html` - Main HTML file
- `../css/style.css` - Styles
- `../js/` - JavaScript files

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is proprietary to Falcon 98 Corporation.

## Author

**Ashen Wijesingha** - Founder & CEO of Falcon 98
- Website: [falcon98.com](https://falcon98.com)
- LinkedIn: [ashen-wijesingha](https://linkedin.com/in/ashen-wijesingha)
- GitHub: [Falcon-98](https://github.com/Falcon-98)
