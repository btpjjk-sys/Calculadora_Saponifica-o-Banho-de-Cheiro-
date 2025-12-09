# Design Guidelines: Saponification Calculator

## Design Approach
**Design System Foundation:** Material Design principles adapted for scientific applications
- Clean, data-focused interface prioritizing clarity and precision
- Scientific aesthetic with friendly, approachable touches
- Emphasis on functional hierarchy and logical information flow

## Layout System

**Container Structure:**
- Main container: `max-w-7xl mx-auto px-4`
- Card-based sections using `max-w-4xl` for form areas
- Two-column desktop layout (lg:grid-cols-2) for oil selection + results
- Single column mobile stack

**Spacing Primitives:**
Use Tailwind units: 2, 3, 4, 6, 8, 12, 16
- Component padding: `p-6` or `p-8`
- Section gaps: `gap-6` or `gap-8`
- Form field spacing: `space-y-4`
- Card spacing: `mb-8`

## Typography

**Font Family:**
- Primary: Inter or Work Sans (clean, scientific readability)
- Monospace: JetBrains Mono for numerical displays

**Hierarchy:**
- Page title: `text-3xl font-bold`
- Section headers: `text-xl font-semibold`
- Card titles: `text-lg font-medium`
- Labels: `text-sm font-medium`
- Body text: `text-base`
- Results/numbers: `text-2xl font-bold` (monospace)
- Helper text: `text-sm opacity-75`

## Component Library

### Cards & Containers
- Rounded corners: `rounded-xl` (16px)
- Shadows: `shadow-lg` for elevated cards, `shadow-md` for standard
- Borders: `border border-gray-200` for subtle definition
- Background: white cards on subtle gray page background

### Form Elements
- Input fields: `rounded-lg` with `border-2` on focus
- Dropdowns: Full-width with clear label hierarchy
- Radio buttons: Custom styled with clear visual states
- Number inputs: Right-aligned text for numerical values
- All inputs: Consistent height `h-12`

### Oil Management List
- List items: Card-based with `rounded-lg` borders
- Each item displays: Oil name (bold), weight (large monospace), remove button
- Hover state: Subtle background change
- Empty state: Dashed border card with centered helper text

### Buttons
- Primary CTA ("Calcular Receita"): Large, prominent `px-8 py-4 rounded-lg text-lg font-semibold`
- Secondary actions: `px-4 py-2 rounded-md text-sm font-medium`
- Icon buttons (remove): `rounded-full` with icon only
- Button hierarchy: Primary (solid), Secondary (outline), Tertiary (ghost)

### Results Dashboard
- Three prominent metric cards in grid layout
- Each card: Large number display (monospace), descriptive label below
- Visual hierarchy: Number dominates, label supports
- Icon + text combination for clarity

### Attribute Visualization (Critical Feature)
- Seven horizontal progress bars displaying attributes
- Each bar includes:
  - Attribute label (left-aligned, `text-sm font-medium`)
  - Numerical value (right-aligned, `text-sm font-bold`)
  - Progress bar with dynamic color based on Cor_Oleo_Atributo logic:
    - Green (#10b981): Value = 10 (ideal)
    - Yellow (#f59e0b): Value 5-9 or 11-15 (acceptable)
    - Red (#ef4444): Value 0-4 or 16-20 (out of range)
  - Bar height: `h-3`, rounded `rounded-full`
  - Container spacing: `space-y-3`
- Visual feedback showing optimal vs. problematic ranges at a glance

### Icons
Use Lucide React icons strategically:
- Droplet for oil/water quantities
- Beaker/Flask for base calculations
- Plus for add actions
- X for remove actions
- AlertCircle for warnings/out of range indicators
- CheckCircle for ideal values

## Responsive Behavior

**Mobile (default):**
- Single column stack
- Full-width cards
- Larger touch targets (min `h-12`)
- Generous padding `p-4`

**Tablet (md:):**
- Begin two-column for configuration vs. results
- Maintain readable line lengths

**Desktop (lg:):**
- Full two-column layout: Left (oil selection + config), Right (results + attributes)
- Sticky results panel option for long forms
- Maximum content width `max-w-7xl`

## Visual Rhythm
- Consistent card elevation creates clear section separation
- White space between sections: `mb-8` or `mb-12`
- Form sections grouped logically with subtle dividers
- Clear visual path: Select oils → Configure → Calculate → View results

## Accessibility
- All form inputs with visible labels
- Clear focus states on interactive elements
- High contrast for text readability
- Progress bars include numerical values (not color-only)
- Sufficient touch target sizes (minimum 44px)

## Key UI Patterns
- Progressive disclosure: Show results only after calculation
- Immediate feedback: Visual confirmation when oils added/removed
- Error prevention: Disabled calculate button until minimum requirements met
- Clear CTAs: Single primary action per section