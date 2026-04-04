# 🌾 FarmerAI - Modern Sustainable Agriculture Design System

## 📋 Overview

**Design Theme**: Modern Sustainable Agriculture  
**Primary Aesthetic**: Clean, professional farm-tech interface with natural, earthy tones  
**Target Audience**: Vietnamese farmers and agricultural professionals

---

## 🎨 Color Palette

### Primary - Forest Green (Growth & Nature)

- **Primary-600**: `#16a34a` - Main brand color
- **Primary-700**: `#15803d` - Hover/active states
- **Usage**: Buttons, active nav items, key CTAs

### Secondary - Golden Amber (Harvest & Warmth)

- **Secondary-600**: `#d97706` - Accent color
- **Secondary-700**: `#b45309` - Secondary hover states
- **Usage**: Secondary actions, highlighted data, harvest-related content

### Tertiary - Natural Neutrals

- **Cream**: `#fef3c7` - Light, warm backgrounds
- **Soil**: `#92400e` - Deep, earthy accent
- **Usage**: Background patterns, subtle accents, text shadows

### Neutral Palette

- **Neutral-900**: `#1c1917` - Primary text
- **Neutral-600**: `#57534e` - Secondary text
- **Neutral-100**: `#f5f5f4` - Light backgrounds

---

## 🏗️ Component Architecture

### Page Wrapper Components

Three composable components for consistent page layouts:

```tsx
<PageWrapper variant="light-green">
  {" "}
  // Light green background
  <PageHeader
    title="..."
    subtitle="..."
    icon={<IconComponent />}
    action={<ButtonComponent />}
  />
  <PageContent>{/* Page content */}</PageContent>
</PageWrapper>
```

**Variants:**

- `light-green`: Soft green with subtle pattern (Soil Analysis pages)
- `light-amber`: Soft amber tones (Team Management)
- `default`: Base agriculture pattern
- `minimal`: Clean white background

### Card Styling

- **Primary Cards**: White with green borders, subtle green shadow
- **Secondary Cards**: Amber background with amber borders
- **Hover Effect**: Border color intensifies, shadow expands upward

---

## 🎯 Design Implementations

### 1. **Soil Analysis Page** (`/soil-analysis`)

- ✅ PageWrapper with light-green background
- ✅ Beaker icon in header
- ✅ Custom-styled tabs with green underline
- ✅ Smooth navigation between tabs
- ✅ Page enter animation

### 2. **AI Analysis Page** (`/soil-ai-analysis`)

- ✅ Matching Soil Analysis design
- ✅ Brain icon in header
- ✅ Integrated tab navigation

### 3. **Farm Management Layout** (`/plots`, `/map`)

- ✅ Green-to-amber gradient background
- ✅ Subtle agricultural pattern overlay
- ✅ Enhanced sidebar with gradient
- ✅ Active nav items with green gradient + shadow
- ✅ Improved hover states

### 4. **Team Management** (`/team-management`)

- ✅ PageWrapper with light-amber background
- ✅ Stats cards with hover effects
- ✅ Green/Amber icon colors matching data
- ✅ Enhanced tabs with green background

### 5. **Auth Pages** (Existing)

- ✅ FarmerAI branding with leaf icon
- ✅ Emerald green color scheme
- ✅ Professional form layouts
- ✅ Agricultural background imagery

### 6. **Landing Page** (Existing)

- ✅ Full-screen background with corn field
- ✅ Parallax scrolling effects
- ✅ Hero section with call-to-action
- ✅ Professional typography

---

## 🎬 Animations & Micro-interactions

### Page Transitions

```css
@keyframes pageEnter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Card Hover Effects

- 2px upward translation
- Border color intensifies
- Shadow expands and deepens
- 200ms cubic-bezier transition

### Tab Interactions

- Active tab: Green underline + bold text color
- Smooth transition between active states
- Border indicator for visual feedback

---

## 📐 Typography

### Display Font

- Used for headings (H1, H2, H3)
- Font: Segoe UI / Roboto
- Weight: 700
- Letter-spacing: -0.02em

### Body Font

- Used for body text and labels
- Font: Segoe UI / Roboto
- Weight: 400-600
- Letter-spacing: 0

### Text Color Hierarchy

1. **Primary Text**: `--neutral-900` (#1c1917)
2. **Secondary Text**: `--neutral-600` (#57534e)
3. **Muted Text**: `--neutral-500` (#78716d)

---

## 🎨 Background Patterns

### Agriculture Pattern

- Diagonal cross-hatch pattern
- Very subtle green overlay (2-3% opacity)
- 60px x 60px repeat size
- Creates visual depth without distraction

### Soil Texture

- Fractal noise texture overlay
- Warm amber tones
- Subtle, organic feel
- Used on secondary backgrounds

---

## 🔧 CSS Variables

All design tokens are defined in `/src/styles/theme.css`:

```css
:root {
  --primary-50: #f0fdf4;
  --primary-600: #16a34a; /* Main green */
  --secondary-600: #d97706; /* Amber */
  --cream: #fef3c7;
  --soil: #92400e;
}
```

---

## ✅ Implementation Checklist

### Pages Redesigned

- [x] Soil Analysis Page
- [x] AI Analysis Page
- [x] Farm Management Layout
- [x] Team Management Page
- [x] Auth Pages (Login, Register, Forgot Password, Email Verification)
- [x] Landing Page

### Components Updated

- [x] PageWrapper components (PageWrapper, PageHeader, PageContent)
- [x] Farm Management Sidebar with green gradient
- [x] Farm Management Nav with enhanced styling
- [x] Layout exports with new components

### CSS & Theming

- [x] Theme color palette defined
- [x] Animation keyframes added
- [x] Card styling utilities
- [x] Button styles with gradients
- [x] Background patterns created
- [x] Integrated into main index.css

---

## 🎯 Design Philosophy

### Distinctive Choices

1. **Bold Green Primary**: Represents growth and natural farming
2. **Golden Amber Accents**: Represents harvest and warmth
3. **Subtle Patterns**: Not generic - custom agriculture-inspired patterns
4. **Gradient Sidebar**: Modern tech feel while staying agricultural
5. **Icon-First Headers**: Visual hierarchy and brand consistency

### Not Generic AI Aesthetics

- ❌ No overused purple gradients
- ❌ No cookie-cutter layouts
- ❌ No system fonts without personality
- ✅ Context-specific color choices
- ✅ Agricultural theme throughout
- ✅ Intentional, purposeful design

---

## 📱 Responsive Design

All components use:

- Flexbox and CSS Grid
- max-width constraints with mx-auto
- Responsive padding (px-4 sm:px-6 lg:px-8)
- Mobile-first approach
- Tailwind breakpoints (sm, md, lg, xl)

---

## 🚀 Future Enhancements

1. **Dark Mode**: Add dark variant (forest green on dark backgrounds)
2. **Custom Cursor**: Agricultural/nature-themed cursor
3. **Loading States**: Animated seedling/plant growth animations
4. **Error States**: Enhanced with agricultural iconography
5. **Toast Notifications**: Style with theme colors and icons
6. **Accessibility**: Enhanced focus states with green outlines

---

## 📝 Notes

- All pages maintain consistent spacing (2rem = 8px base unit)
- Shadows use green color for cohesion
- Hover states consistently use slight upward translation
- Animation duration defaults to 200ms for responsiveness
- Border colors use 10-20% opacity for subtle relationships

---

**Theme Version**: 1.0  
**Last Updated**: April 2026  
**Team**: FarmerAI Design System
