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
