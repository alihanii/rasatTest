# Nuxt Blog Platform

A modern blog platform built with Nuxt 3, featuring a modular architecture, analytics dashboard, and beautiful UI.

## Features

- 📱 Responsive design
- 📊 Analytics dashboard with Chart.js
- 📝 Blog post management
- 🎨 Modern UI with Tailwind CSS
- 🏗️ Modular architecture
- 🔄 State management with Pinia

## Project Structure

```
├── modules/                # Feature modules
│   ├── home/              # Home module
│   ├── posts/             # Posts module
│   └── stats/             # Stats module
├── components/            # Shared components
├── composables/           # Shared composables
├── layouts/              # Layout components
├── middleware/           # Route middleware
├── plugins/             # Nuxt plugins
├── types/               # TypeScript types
└── utils/              # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nuxt-blog-platform
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build

### Module Structure

Each feature module follows this structure:

```
module/
├── pages/           # Route components
├── components/      # Module-specific components
├── composables/     # Module-specific composables
├── store/          # State management
└── utils/          # Module-specific utilities
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
