# Lemur Gas Station AI Management Dashboard

## Overview

Lemur is an AI-powered gas station management dashboard designed to streamline daily operations through intelligent task automation and monitoring. The system serves as a central hub for employees and managers to handle various operational aspects including task management, temperature monitoring, inventory tracking, and external system integrations. The application emphasizes simplicity with a PIN-based login system and large, touch-friendly tile interface optimized for industrial use.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The application uses a modern React-based frontend built with TypeScript and Vite for development tooling. The component architecture follows a modular design with shadcn/ui providing the base component library, customized with Tailwind CSS for styling. The design system implements Material Design principles adapted for industrial environments, featuring both light and dark themes with the primary focus on dark mode for reduced eye strain during long shifts.

Key architectural decisions include:
- **Component-based architecture**: Reusable components for dashboard tiles, task cards, temperature monitoring, and management panels
- **State management**: Local React state with React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Styling approach**: Utility-first CSS with Tailwind, custom design tokens for industrial theming
- **Responsive design**: Mobile-first approach with touch-optimized interfaces

### Backend Architecture  

The backend follows a minimal Express.js architecture with TypeScript, implementing a RESTful API pattern. The server uses a modular approach with separate concerns for routing, storage, and database operations. The system is designed to be database-agnostic through the storage interface pattern, currently implementing in-memory storage with plans for PostgreSQL integration via Drizzle ORM.

Core backend components:
- **Express server**: Lightweight HTTP server with middleware for logging and error handling  
- **Storage abstraction**: Interface-based storage system allowing for multiple implementations
- **Database integration**: Drizzle ORM configured for PostgreSQL with Neon serverless database
- **API structure**: RESTful endpoints with consistent error handling and response formatting

### Authentication & Authorization

The system implements a simplified PIN-based authentication system optimized for industrial environments where complex passwords are impractical. Users authenticate with 4-6 digit PINs, with role-based access control differentiating between employees and managers.

Design rationale:
- **PIN-based login**: Faster access for frequent logins during shifts
- **Role-based access**: Simple binary role system (employee/manager) with different interface permissions
- **Session management**: Server-side session handling with secure cookies

### Data Architecture

The application manages several key data entities:
- **Users**: Employee records with PIN authentication and role assignments
- **Tasks**: Work assignments with status tracking, completion verification, and photo attachments
- **Temperature readings**: Equipment monitoring with AI-driven alert thresholds
- **Custom tiles**: Manager-configurable external system integrations

Database schema uses PostgreSQL with Drizzle ORM for type-safe database operations. The schema is designed for scalability with proper indexing for frequently queried data like temperature readings and task assignments.

### AI Features & Business Logic

The system incorporates intelligent monitoring and task management:
- **Dynamic temperature monitoring**: AI adjusts check frequencies based on temperature trends
- **Automated alerts**: Smart notifications for critical temperature thresholds
- **Task prioritization**: Intelligent task scheduling and assignment
- **Pattern recognition**: Learning from historical data to predict maintenance needs

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with hooks and concurrent features
- **Express.js**: Backend web framework for API endpoints
- **TypeScript**: Type safety across the entire stack
- **Vite**: Build tool and development server with HMR support

### Database & ORM
- **Drizzle ORM**: Type-safe database toolkit for PostgreSQL operations
- **@neondatabase/serverless**: Serverless PostgreSQL database driver
- **PostgreSQL**: Primary database for production data storage

### UI Framework & Styling
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Radix UI**: Headless component primitives for accessibility
- **shadcn/ui**: Pre-built component library with customizable design tokens
- **Lucide React**: Icon library for consistent iconography

### State Management & Data Fetching
- **React Query (@tanstack/react-query)**: Server state management and caching
- **React Hook Form**: Form state management with validation
- **Zod**: Runtime type validation and schema parsing

### Development & Build Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with autoprefixer
- **TSX**: TypeScript execution for development server

### Third-party Integrations
- **External lottery systems**: Configurable links to lottery management platforms
- **LRTRI inventory system**: Integration with cigarette inventory tracking
- **Photo upload services**: Future integration for task completion verification
- **Notification services**: Planned integration for temperature alerts and task reminders

The architecture supports extensibility through the custom tile system, allowing managers to add external service integrations without code changes. This modular approach enables the system to adapt to different gas station operational requirements and third-party service ecosystems.