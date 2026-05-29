## Design Token & Styles Enforcement

All layout, color, spacing, and typography must use the design tokens and CSS variables defined in the `shared/styles` folder. No hardcoded pixel values, colors, or font stacks are allowed.

If a required token or style is missing during development, the AI agent must prompt the user for permission before defining a new variable or rule in `shared/styles`. The agent should never invent or add new tokens without explicit user approval.
## What "Adapt" Means for Raw HTML/CSS/JS

When you (the user) provide raw HTML, CSS, or JS code and ask to "adapt" it, this means:

- All visual styles (colors, fonts, spacing, etc.) must use the project's design tokens and CSS variables from shared styles—never raw hex codes or inline style={{}} in JSX.
- Tailwind utility classes are allowed only for layout and structure (e.g., flex, grid, spacing), not for branding, colors, or typography.
- Typography, colors, and other design details must be mapped to existing CSS classes or variables (e.g., .text-brand, .h1-desktop, var(--font-display)).
- No new CSS files should be created unless explicitly requested.
- The result should be a clean, maintainable React component that strictly follows the design system and project rules.

**Exception Policy:**
There will be times when these rules may be broken or exceptions made. This can happen if you (the user) explicitly request it, or if you confirm a suggestion from the AI agent to do so. Once the exception is complete, immediately return to following the core rules.
## Adapting Raw HTML/CSS/JS to This Project Template

When converting raw HTML, CSS, and JS code to fit this template, follow these guidelines:

1. **React & Next.js Adaptation:**
  - Convert HTML into React functional components (`.tsx` files).
  - Replace direct DOM manipulation (JS) with React state, props, and effects.
  - Use Next.js conventions (e.g., `<Image>` for images, `<Link>` for navigation if needed).

2. **TypeScript:**
  - Add type annotations for props and state where appropriate.

3. **Styling:**
  - Do not use inline styles or raw CSS files directly.
  - Map styles to the design tokens and utility classes defined in the `shared/styles` folder (e.g., use classes from `colors.css`, `typography.css`, `button.css`, etc.).
  - If a style in your raw CSS matches a token (e.g., color, font-size, spacing), use the corresponding CSS variable or class from your design system.
  - For new styles not covered by tokens, consider extending your design system, but keep everything token-driven and consistent.

4. **Tailwind or CSS-in-JS (optional):**
  - Tailwind CSS or a CSS-in-JS solution (like styled-components or Emotion) may be used if the team decides to adopt it.
  - If you add Tailwind, include a `tailwind.config.js`, wire PostCSS properly, and document the decision in the README.
  - When using Tailwind or CSS-in-JS, ensure design tokens and semantic intent from `shared/styles` are respected and, when possible, mirrored into Tailwind config or theme tokens so the design system stays consistent.

5. **Structure:**
  - Place the adapted component in the appropriate feature folder (e.g., `features/home/components`).
  - Keep the code modular and reusable, following the feature-sliced architecture.

6. **Accessibility & Semantics:**
  - Ensure semantic HTML is preserved (e.g., use `<section>`, `<header>`, `<main>` as appropriate).
  - Add ARIA attributes if needed.

7. **Remove Unused JS:**
  - If the raw JS is for DOM manipulation or effects that React handles natively, omit it or refactor it into React hooks.

**Summary:**
You’ll get a React/TypeScript component, styled using your design tokens and CSS classes from `shared/styles`, with no Tailwind or CSS-in-JS, and structured according to your feature-based architecture. All styles should be mapped to your existing design system for consistency.
# 🤖 AI Agent Skills & Project Guidelines

## 📋 Core Rules
> These rules apply throughout the entire project, not just at the start.

1. **Strictly follow** this document at all times, unless you (the user) explicitly request or confirm an exception for a specific case. Once the exception is complete, immediately return to following these rules.
2. **Never delete** existing tokens, only update or add new ones
3. **Keep all comments** in this file, they serve as memory aids
4. If certain rules need to be **ignored** or broken, I (the user) will explicitly say so or confirm your (the AI agent's) suggestion to do so at that point in the project.
5. Once that exception is done, **return to strictly following** this document and all core rules.
6. **Always consider responsiveness** across all screen sizes, this rule cannot be overridden

---

## 🧭 Cursor Architectural Rules
> These rules align this workspace with the active Cursor project rules.

### 1. The Feature Wall
- Files inside `features/{name}` are isolated.
- **NEVER** import from `features/feature-A` into `features/feature-B`.
- Features can only import from `shared/` or the `app/` composition layer.

### 2. Styling Protocol
- **STRICT**: Do not use ad-hoc hex codes in JSX.
- **STRICT**: Branding colors must use variables from `shared/styles/semantics.css`.
- **STRICT**: Follow the 3-layer CSS flow: `colors.css` (Values) -> `semantics.css` (Intent/Theme) -> `Component.css` (Usage).
- When creating a new UI component in `shared/components/ui`, you MUST create a matching `.css` file in `shared/styles/`.

### 3. Component Patterns
- Use **functional components** and **TypeScript**.
- **Typography & Tags**: Use standard HTML tags (`<h1>`, `<p>`, `<span>`) directly with typography and intent utility classes (e.g., `className="h1-desktop text-inverse"`) rather than relying on custom wrapper components like `<Text>`.
- Components in `shared/components/ui` must be **polymorphic** (handling `next/link` vs `button` etc).
- Use `React.forwardRef` for all base UI components.

### 4. File Creation
- If a task involves a new domain, create a new folder in `features/`.
- If a task involves a generic utility, put it in `shared/`.
- Keep the `app/` directory exclusively for routing and layouts.

### 5. Verification
- Before finishing a task, check if you've added the correct exports to `index.ts` files in the respective directories.
- Ensure that `globals.css` properly imports any new stylesheets created in `shared/styles/`.

---

## 🗂️ Workflow Order
> Follow this exact sequence before touching anything in the project.

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Read & Study The Template
- Read the entire cloned GitHub template
- Study the folder structure
- Study the file organization
- Note naming conventions
- Note any existing patterns or configurations

### Step 3: Explain Back
After studying the template, explain back:
- What the folder structure looks like
- How things are organized
- Any patterns or conventions noticed
- Any configurations already in place

### Step 4: Wait For Approval
- Do not proceed until i confirm i am satisfied
- Only after confirmation → Move on to the rest of the instructions

---

## 📱 Responsiveness
This rule never turns off. Every piece of code must be responsive.
Always consider the following screen sizes:

| Breakpoint | Size |
| :--- | :--- |
| Mobile | 0px - 768px |
| Tablet | 769px - 1024px |
| Desktop | 1025px - 1440px |
| Large Screen | 1441px and above |

---

## 🎨 Layout & Spacing
These values will change either for certain sections within the same project or for a completely different project. I will always notify you when they change.

**Desktop**
```css
margin: 0 120px;        /* left and right */
padding: 100px 0;       /* top and bottom */
min-height: 100vh;
```

**Mobile**
```css
margin: 0 20px;         /* left and right */
padding: 40px 0;        /* top and bottom */
```

### 📌 Spacing System
This never changes across any project.
- Always use a 4px base unit
- Everything spacing related must be a multiple of 4px

| Token | Value |
| :--- | :--- |
| space-1 | 4px |
| space-2 | 8px |
| space-3 | 12px |
| space-4 | 16px |
| space-5 | 20px |
| space-6 | 24px |
| space-8 | 32px |
| space-10 | 40px |
| space-12 | 48px |
| space-16 | 64px |
| space-20 | 80px |
| space-24 | 96px |
| space-25 | 100px |
| space-30 | 120px |

---

## 🎨 Typography
This will be provided via Figma typography styles and will change per project. I will attach the typography styles.

<!-- TYPOGRAPHY TOKENS Update these when i provide the Figma typography styles. Do not delete old tokens, only update or add new ones. -->
| Token | font-family | font-size | font-weight | line-height | letter-spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| - | - | - | - | - | - |

---

## 🎨 Colors
This will be provided via Figma color styles and will change per project. I will attach the color styles.

<!-- COLOR TOKENS Update these when i provide the Figma color styles. Do not delete old tokens, only update or add new ones. -->
```css
:root {
  /* Primary Colors */
  /* --color-primary: ; */
  
  /* Secondary Colors */
  /* --color-secondary: ; */
  
  /* Neutral Colors */
  /* --color-neutral: ; */
  
  /* Background Colors */
  /* --color-background: ; */
  
  /* Text Colors */
  /* --color-text: ; */
}
```

---

## 📦 Dependencies
These are installed for every project without exception.

**Always Run First**
```bash
npm install
```

**Always Install**
```bash
# Animations
npm install gsap

# Smooth Scrolling
npm install lenis

# React Animations
npm install framer-motion

# Icons
npm install @phosphor-icons/react
```

<!-- WEBGL Install the relevant WebGL library based on the project needs. Common options: three.js, curtains.js, ogl -->
**WebGL** (choose based on project needs)
```bash
npm install three        # Three.js
# npm install curtainsjs  # Curtains.js
# npm install ogl         # OGL
```

---

## 🔄 Things That Change Per Project
I will always notify you when these change.
- Layout & Spacing values
- Typography styles
- Color styles
- WebGL library

## 🔒 Things That Never Change
- 4px spacing system
- Responsiveness rule
- Workflow order
- Core rules
- GSAP
- Lenis
- Framer Motion
- Phosphor Icons
