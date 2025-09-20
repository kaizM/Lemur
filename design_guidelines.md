# Lemur Gas Station AI Dashboard Design Guidelines

## Design Approach
**System-Based Approach**: Using Material Design principles adapted for an industrial/utility dashboard environment. This application prioritizes functionality, efficiency, and accessibility for gas station employees working in various lighting conditions.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Primary: 210 100% 25% (Deep industrial blue for reliability)
- Primary Light: 210 80% 35% (For hover states and accents)
- Success: 140 70% 40% (Task completion, temperature normal)
- Warning: 35 90% 55% (Temperature alerts, pending tasks)
- Error: 0 75% 50% (Critical alerts, overdue tasks)

**Dark Mode (Primary):**
- Background: 220 15% 8% (Deep charcoal)
- Surface: 220 12% 12% (Card backgrounds)
- Text Primary: 0 0% 95% (High contrast white)
- Text Secondary: 0 0% 70% (Muted text)

**Light Mode (Secondary):**
- Background: 210 25% 98% (Clean white-blue)
- Surface: 0 0% 100% (Pure white cards)
- Text Primary: 220 15% 15% (Dark text)
- Text Secondary: 220 10% 45% (Muted text)

### B. Typography
- **Primary Font**: Inter (Google Fonts) - Modern, highly legible
- **Headings**: 600-700 weight, sized for clear hierarchy
- **Body Text**: 400-500 weight, optimized for readability
- **UI Elements**: 500 weight for buttons and navigation

### C. Layout System
**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, and 12
- Tight spacing: p-2, m-2 (component internals)
- Standard spacing: p-4, gap-4 (general layout)
- Section spacing: p-6, mb-6 (card padding, section breaks)
- Large spacing: p-8, gap-8 (major layout divisions)
- Extra large: p-12, mb-12 (page-level spacing)

### D. Component Library

**Dashboard Tiles**: Large, touch-friendly cards (minimum 120px height) with clear icons and labels
**Forms**: Clean, labeled inputs with validation states
**Tables**: Striped rows with clear headers for task lists and temperature logs
**Navigation**: Top bar with role-based menu items and logout
**Alerts**: Toast notifications for temperature warnings and task reminders
**Modals**: For task completion, photo uploads, and admin functions
**Buttons**: Primary (filled), secondary (outline), and text variants

### E. Key Design Patterns

**PIN Authentication**: Large numeric keypad with clear visual feedback
**Task Interface**: Card-based layout with visual status indicators (pending, completed, verified)
**Temperature Monitoring**: Color-coded status with clear threshold indicators
**Admin Panel**: Tabbed interface for employee management and system configuration
**Mobile-First**: Responsive design optimized for tablets and mobile devices used on-the-go

### F. Accessibility & Usability
- High contrast ratios for various lighting conditions
- Large touch targets (minimum 44px) for gloved hands
- Clear visual hierarchy with consistent spacing
- Status indicators using both color and icons
- Dark mode as primary interface for low-light environments

## Images
No hero images or decorative photography needed. Use simple, industrial-style icons from Heroicons for:
- Dashboard navigation (clipboard, thermometer, calendar, etc.)
- Task status indicators
- Temperature monitoring symbols
- Navigation and UI controls

The design should feel professional, reliable, and optimized for the operational needs of gas station employees working in various conditions.