# Shadcn Admin Simplified

A streamlined, internal-use admin dashboard built with **Vite**, **React**, and **Shadcn UI**.

This project is a fork of the original [shadcn-admin](https://github.com/satnaing/shadcn-admin) by satnaing. It has been modified to serve as a lightweight internal tool.

## Tech Stack

**UI:** [ShadcnUI](https://ui.shadcn.com) (TailwindCSS + RadixUI)

**Build Tool:** [Vite](https://vitejs.dev/)

**Routing:** [TanStack Router](https://tanstack.com/router/latest)

**Type Checking:** [TypeScript](https://www.typescriptlang.org/)

**Linting/Formatting:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

**Icons:** [Lucide Icons](https://lucide.dev/icons/)

## Run Locally

Clone the project

```bash
git clone https://github.com/frodo-cs/shadcn-admin-simplified.git
```

Go to the project directory

```bash
cd shadcn-admin-simplified
```

Install dependencies

```bash
pnpm install
```

Create an `.env` file based on the `.env.example` template in src/

Start the server

```bash
pnpm run dev
```

### Adding Languages

Translations are organized into folders by language, with separate JSON files for each namespace (e.g., `general`, `settings`, `validation`).

**1. Create the files**
Create a new folder in `src/locales/` (e.g., `es/`) and add your namespace files:

- `src/locales/es/general.json`
- `src/locales/es/validation.json`
- ...and so on.

**2. Register in `src/i18n.ts`** Import the new files and add them to the`resources` object:

```typescript
import generalEs from './locales/es/general.json'

const resources = {
  en: { ... },
  es: {
    general: generalEs,
    // Add other namespaces here
  }
}

```

> **Note:** Because we use a flexible string-based approach for translations, ensure your keys match the JSON structure exactly. If a translation doesn't appear, double-check the namespace prefix (e.g., `settings:`) and the path to the key.

## License

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
