# Next.js Template - Juyonna Travels

A feature-driven Next.js template with a built-in design system and documentation engine.

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository** (into your desired folder structure):

   ```bash
   git clone git@github.com:TM-Labs-Global/next-template.git .
   ```

2. **Update project information**:
   Open `package.json` and update the `"name"` field to your project's name.

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## Folder Structure

The project follows a modular, feature-based architecture:

```
├── app/                  # Next.js App Router (Entry points & Routing)
│   ├── design-system/    # Design System Showcase page
│   ├── docs/             # Documentation site page
│   └── globals.css       # Global styles & Tailwind imports
├── features/             # Business logic & components grouped by feature
│   ├── design-system/    # Logic for the design system showcase
│   ├── docs/             # Logic for the documentation engine
│   └── home/             # Landing page components
├── shared/               # Shared utilities, styles, and types
│   ├── styles/           # CSS design tokens (colors, typography, etc.)
│   └── utils/            # Shared helper functions (CSS parsers, etc.)
└── public/               # Static assets
```

## Documentation & Design System

The project includes built-in tools for maintaining a living style guide and documentation:

- **Documentation Engine**: View and edit project documentation at [/docs](http://localhost:3000/docs)
- **Design System Showcase**: Explore the interactive design system at [/design-system](http://localhost:3000/design-system)

The design system is dynamically powered by tokens defined in `shared/styles/`. Updates to CSS files are automatically reflected in the showcase.
# takeout-media
