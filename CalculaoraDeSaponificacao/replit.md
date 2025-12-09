# Saponification Calculator

## Overview

A specialized web application for artisanal soap makers to calculate precise saponification recipes. The calculator determines the exact amounts of lye (NaOH or KOH) and water needed based on selected oils, while also displaying the resulting soap's quality attributes like hardness, cleansing power, and conditioning properties.

The application is built in Portuguese (Brazilian) as it targets Portuguese-speaking soap makers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled using Vite
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state, React useState for local component state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Development**: Vite dev server with HMR integration for the frontend

### Project Structure
```
client/           # Frontend React application
  src/
    components/   # Reusable UI components
    pages/        # Page-level components
    lib/          # Utilities and business logic (soapLogic.ts)
    hooks/        # Custom React hooks
server/           # Backend Express application
shared/           # Shared types and schemas between frontend/backend
```

### Business Logic
The core saponification calculations are implemented in `client/src/lib/soapLogic.ts`:
- `AtributosSabonete` class: Defines soap quality attributes (hardness, cleansing, conditioning, etc.)
- `Oleo` class: Represents oils with their saponification indices and attribute contributions
- `OILS_DATA`: Pre-defined database of common soap-making oils with their properties
- Recipe generation functions calculate lye and water amounts based on oil weights, superfat percentage, and lye purity

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` using Drizzle's schema builder
- **Storage**: Currently uses in-memory storage (`MemStorage` class) with interface designed for easy database swap
- **Validation**: Zod schemas generated from Drizzle schemas using drizzle-zod

### Design System
Follows Material Design principles adapted for scientific applications:
- Clean, data-focused interface prioritizing clarity and precision
- Card-based layout with responsive grid (two-column on desktop, single column on mobile)
- Custom color palette with semantic colors for attribute quality indicators (green/yellow/red)
- Typography: Inter for UI, JetBrains Mono for numerical displays

## External Dependencies

### Database
- PostgreSQL (configured via `DATABASE_URL` environment variable)
- Drizzle Kit for migrations (`npm run db:push`)

### UI Libraries
- Radix UI primitives for accessible component foundations
- Lucide React for icons
- Embla Carousel for carousel functionality
- React Day Picker for calendar components
- Recharts for data visualization

### Build Tools
- Vite for frontend bundling and development server
- esbuild for production server bundling
- TypeScript for type checking

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` for error overlay
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner` for development features