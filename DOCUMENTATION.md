# Kaaryar Studio Website Builder — Full Documentation

## Overview

A full-featured that allows non-technical users to create, edit, and manage multi-page websites through a visual interface.

## Architecture

### Frontend

- **React 19** with functional components and hooks
- **Zustand** for global state management (pages, current page, selection)
- **CSS Modules** for scoped styling
- **React Router DOM** for routing

### Backend (Development)

- **json-server** – Simple REST API with `db.json`

### Key Design Patterns

- **Registry Pattern** (`registry.js`) – Easy to extend with new sections
- **Component Composition** – Shared `PageRenderer` for admin & public
- **Immutable State Updates** – Safe Zustand updates
- **Separation of Concerns** – UI, Logic, API, Utils

## State Management (`src/Store/pageStore.js`)

Key actions:

- `fetchPages`, `fetchPageById`
- `createPage`, `saveCurrentPage`, `deletePage`
- `addSection`, `removeSection`, `moveSection`
- `updateSectionData`, `updatePageMeta`

## Section System

Each section consists of:

1. **Component** (`*.jsx`) – Renders the public view
2. **Settings** – Form for editing data in admin
3. **Defaults** – Initial data structure
4. **Registration** in `registry.js`

### Example: Adding a New Section

See `README.md` → "Adding a New Section"

## API Layer

```js
// src/Shared/API/pages.api.js
pagesApi.getAll(), .getById(), .getBySlug(), .create(), .update(), .remove()
```
