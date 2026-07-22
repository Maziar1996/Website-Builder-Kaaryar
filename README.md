# Kaaryar Studio — Website Builder

A simple **visual website builder** with an admin panel and public frontend, built as a technical assessment for Kaaryar Studio's Frontend position.

## ✨ Features

### Admin Panel (`/admin`)

- Full **CRUD** operations for pages (title + slug)
- **Live visual editor** with real-time preview
- Add sections from a registry
- Reorder sections (Up/Down)
- Click-to-edit settings panel for each section
- Persistent storage via `json-server`

### Public Website

- Dynamic page rendering based on slug (`/`, `/services`, `/about`, `/contact`)
- Shared `PageRenderer` component for both admin and public views
- Fully responsive and RTL (Persian-ready)

## 🛠 Tech Stack

| Layer     | Technology             |
| --------- | ---------------------- |
| Framework | React 19 + Vite        |
| Styling   | CSS Modules            |
| State     | Zustand                |
| Routing   | React Router DOM v7    |
| Backend   | json-server (REST API) |
| Build     | Vite                   |

## Project Structure

plain
kaaryar-website-builder/
├── public/
│ ├── icons/ # SVG icons and decorative assets
│ └── images/ # Static images (logos, team, testimonials, etc.)
├── src/
│ ├── App/
│ │ ├── App.jsx # Root router setup
│ │ └── Routes.jsx # Route definitions
│ ├── Components/
│ │ ├── PageRenderer/ # Shared page rendering engine
│ │ └── UI/ # Reusable UI primitives (Button, Input, Heading, etc.)
│ ├── Hooks/
│ │ └── useSlideshow.js # Custom hook for carousels and slideshows
│ ├── Pages/
│ │ ├── AdminDashboard/ # Page list and creation
│ │ ├── PageEditor/ # Visual editor (3-panel layout)
│ │ ├── PublicPage/ # Public site renderer
│ │ └── NotFound/ # 404 page
│ ├── Sections/
│ │ ├── registry.js # Section type registry
│ │ ├── defaults.js # Default data for all section types
│ │ ├── Header/
│ │ ├── Hero/
│ │ ├── Features/
│ │ ├── Grid/
│ │ ├── Process/
│ │ ├── Testimonials/
│ │ ├── CTA/
│ │ ├── FAQ/
│ │ ├── Contact/
│ │ ├── Footer/
│ │ └── Content/
│ ├── Shared/
│ │ ├── API/ # HTTP client and page API
│ │ ├── Styles/ # Global CSS and CSS variables
│ │ └── Utils/ # Helper utilities (slug, text, array, id)
│ ├── Store/
│ │ └── pageStore.js # Zustand store for global state
│ └── main.jsx # Application entry point
├── db.json # json-server database (pages and sections)
├── index.html # HTML entry point (RTL, Vazirmatn font)
├── package.json
├── vite.config.js # Vite config with API proxy
└── eslint.config.js # ESLint flat config

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd karyar-website-builder

# Install dependencies
npm install

# Start development servers
npm run dev
```
