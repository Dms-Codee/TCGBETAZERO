# TCG-BETA-Zero

TCG-BETA-Zero is a React-based MVP starter focused on maintainability, clear separation of responsibilities, and future scalability.

## Initial Stack

The project uses the following technologies:

* **React 19** — UI library for building component-based web interfaces.
* **Vite** — Fast development server and build tool for modern React applications.
* **TypeScript** — Adds static typing to improve maintainability and reduce runtime errors.
* **Tailwind CSS** — Utility-first CSS framework for quickly building consistent interfaces.
* **React Router** — Handles client-side routing and navigation between application views.
* **TanStack Query** — Manages server state such as API data, caching, loading states, refetching, and mutations.
* **Zustand** — Lightweight global state management for client-side state shared across multiple components.
* **Zod** — Runtime schema validation for forms, API payloads, external data, and other application inputs.

## Installation

Create the React + TypeScript project using Vite:

```bash
npm create vite@latest . -- --template react-ts
npm install
```

Install React 19 explicitly:

```bash
npm install react@19 react-dom@19
```

Install Tailwind CSS:

```bash
npm install tailwindcss @tailwindcss/vite
```

Install React Router:

```bash
npm install react-router
```

Install TanStack Query and its development tools:

```bash
npm install @tanstack/react-query
npm install @tanstack/react-query-devtools
```

Install Zustand:

```bash
npm install zustand
```

Install Zod:

```bash
npm install zod
```

## TypeScript

Strict TypeScript checking should be enabled in `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

This enables stronger compile-time checks and helps detect potential issues before runtime.

## Recommended Project Structure

```text
src/
├── components/
│   ├── exercise/
│   ├── workout/
│   └── common/
│
├── features/
│   ├── exercises/
│   ├── workouts/
│   └── routines/
│
├── services/
├── hooks/
├── models/
├── routes/
└── theme/
```

### `components/`

Contains reusable UI components.

Domain-specific reusable components can be grouped by entity:

```text
components/
├── exercise/
│   └── ExerciseCard.tsx
├── workout/
│   └── WorkoutSummary.tsx
└── common/
    ├── Button.tsx
    ├── Modal.tsx
    └── Spinner.tsx
```

Components should primarily focus on presentation and user interaction.

### `features/`

Contains complete application features and their related business or orchestration logic.

```text
features/
├── exercises/
├── workouts/
└── routines/
```

A feature may contain its own components, hooks, queries, and views when those elements are only relevant to that feature.

For example:

```text
features/
└── exercises/
    ├── components/
    ├── hooks/
    ├── queries/
    └── views/
```

A useful rule is:

> If a component is only useful inside one feature, keep it inside that feature. If it is reusable across multiple features, move it to `components/`.

### `services/`

Contains communication with external systems such as APIs or Backend-as-a-Service providers.

```text
services/
├── exercise.service.ts
├── workout.service.ts
└── routine.service.ts
```

### `hooks/`

Contains reusable React hooks that are not exclusive to a single feature.

### `models/`

Contains TypeScript domain types, interfaces, and shared application models.

### `routes/`

Contains routing definitions and route-related configuration.

### `theme/`

Contains global design tokens, theme configuration, typography, spacing, and styling conventions.

## State Management Guidelines

Use each state management tool according to the type of state being handled:

```text
Server/API data
      ↓
TanStack Query

Global client state
      ↓
Zustand

Local component state
      ↓
useState / useReducer

Runtime validation
      ↓
Zod
```

TanStack Query and Zustand should not duplicate the same data.

For example, exercises retrieved from an API should normally belong to TanStack Query, while values such as selected filters, temporary workout drafts, or UI preferences may belong to Zustand.

## Development

Start the development server:

```bash
npm run dev
```

Verify the production build:

```bash
npm run build
```

The goal of this structure is to keep the initial MVP simple while allowing the application to grow without requiring a major architectural rewrite.
