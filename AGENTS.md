# AI Agent Instructions

This file defines the development rules that AI agents must follow when modifying this repository.

## Core Rules

* Preserve the existing technology stack unless explicitly requested otherwise.
* Use TypeScript with strict typing.
* Avoid `any` unless technically necessary.
* Prefer composition over inheritance.
* Keep components small and focused.
* Do not introduce new dependencies without a clear need.
* Use descriptive names for components, hooks, services, stores, and functions.
* Keep feature-specific code inside its corresponding feature.
* Promote code to shared folders only when real reuse exists.
* Run `npm run build` after significant changes.
* Run `npm run lint` when applicable.

## Current Technology Stack

The project currently uses:

* React 19
* TypeScript
* Vite
* Tailwind CSS
* React Router
* TanStack Query
* Zustand
* Zod

Each dependency has a specific responsibility and should not be replaced by another tool without a clear architectural reason.

## State Management Responsibilities

Use the following rules when deciding where state belongs.

### TanStack Query

Use TanStack Query for server state and remote data.

Examples:

* Marketplace products
* Product details
* Seller information
* Orders
* User profile data
* Inventory
* Remote search results
* API mutations

TanStack Query should handle concerns such as:

* Loading states
* Errors
* Caching
* Refetching
* Cache invalidation
* Mutations
* Stale data

Do not duplicate TanStack Query server data inside Zustand unless there is a specific technical requirement.

### Zustand

Use Zustand for global client-owned state.

Examples:

* Shopping cart state
* Selected marketplace filters
* Sort preferences
* Checkout progress
* Temporary checkout data
* UI preferences
* Shared client-side selections

Do not use Zustand as a replacement for API caching.

### React Local State

Use `useState` or `useReducer` for state that belongs only to one component or a small component subtree.

Examples:

* Modal visibility
* Local dropdown state
* Temporary input values
* Current tab selection

Not every piece of state needs to be global.

## Validation

Use Zod for runtime validation at application boundaries.

Good use cases include:

* Forms
* API request payloads
* URL parameters
* External JSON
* Imported data
* Environment variables
* Data received from third-party services

Prefer deriving TypeScript types from Zod schemas when that reduces unnecessary duplication.

## Backend Strategy

The project does not currently require a specific backend implementation.

However, the planned architecture should remain compatible with a future Backend-as-a-Service integration.

**Supabase is currently the preferred future Backend-as-a-Service option.**

The project may eventually use Supabase for:

* PostgreSQL database
* Authentication
* File storage
* Realtime subscriptions
* Server-side functions
* API access

Do not assume that Supabase is already configured unless its client, environment variables, and dependencies are present in the repository.

Do not install or configure Supabase unless the task explicitly requires backend integration.

When backend integration is introduced, prefer keeping Supabase-specific implementation details behind services or infrastructure abstractions instead of coupling presentational components directly to Supabase.

Preferred direction:

```text
React Components
      ↓
Feature Hooks
      ↓
TanStack Query
      ↓
Services
      ↓
Supabase Client
      ↓
Supabase
```

Avoid:

```text
React Component
      ↓
Direct Supabase Query
```

unless the component is intentionally acting as an integration boundary and there is a clear reason for doing so.

## Future Supabase Integration

When Supabase is eventually introduced:

* Keep the Supabase client configuration centralized.
* Do not create multiple unrelated Supabase client instances.
* Keep credentials and configuration in environment variables.
* Never hardcode secrets.
* Respect Row Level Security policies.
* Treat Supabase data as server state.
* Continue using TanStack Query when caching, invalidation, refetching, or mutation coordination provides value.
* Do not move remote Supabase data into Zustand simply because Zustand is available.
* Use generated Supabase TypeScript types when appropriate.
* Use Zod when runtime validation is still required at application boundaries.

A possible future structure may look like:

```text
src/
├── services/
│   ├── product.service.ts
│   ├── order.service.ts
│   └── seller.service.ts
│
├── lib/
│   └── supabase/
│       └── client.ts
│
└── features/
```

The exact structure may evolve when Supabase is actually integrated.

Do not create speculative infrastructure before it is needed.

## Project Structure

Follow the existing architecture:

```text
src/
├── components/
│   ├── product/
│   ├── seller/
│   └── common/
│
├── features/
│   ├── products/
│   ├── cart/
│   └── orders/
│
├── services/
├── hooks/
├── models/
├── routes/
└── theme/
```

## Components

Reusable presentational components belong in:

```text
src/components/
```

Examples:

```text
components/
├── product/
│   └── ProductCard.tsx
│
├── seller/
│   └── SellerBadge.tsx
│
└── common/
    ├── Button.tsx
    ├── Modal.tsx
    └── Spinner.tsx
```

Presentational components should focus primarily on UI rendering and direct user interaction.

Avoid placing API communication or unrelated business logic inside them.

## Features

Application capabilities should be grouped by feature.

Examples:

```text
features/
├── products/
├── cart/
└── orders/
```

A feature may contain:

```text
features/
└── products/
    ├── components/
    ├── hooks/
    ├── queries/
    └── views/
```

If code is only relevant to one feature, keep it inside that feature.

If it becomes genuinely reusable across multiple features, promote it to a shared directory.

## Services

Services are responsible for communication with external systems.

Examples:

```text
services/
├── product.service.ts
├── order.service.ts
└── seller.service.ts
```

Services may eventually communicate with:

* Supabase
* REST APIs
* GraphQL APIs
* Payment providers
* Other external services

Components should generally not communicate directly with backend providers.

## Architecture Principles

### Prefer Composition

Prefer small composable components over inheritance-based abstractions and large monolithic components.

### Keep Responsibilities Focused

Each component, hook, service, store, or utility should have a clear purpose.

Avoid generic files that accumulate unrelated logic.

### Keep Feature Logic Close

Feature-specific logic should live close to the feature that owns it.

### Promote Reuse Intentionally

Do not move code into shared directories only because it might be reused someday.

Start locally and promote only after actual reuse appears.

### Separate Server and Client State

Use:

```text
Remote/backend data
→ TanStack Query

Global client state
→ Zustand

Local UI state
→ React

Runtime validation
→ Zod
```

## Naming Conventions

Use descriptive names even when they are slightly longer.

Prefer:

```text
ProductMarketplaceCard.tsx
SellerProfileHeader.tsx
useProductSearch.ts
createMarketplaceOrder.ts
product.service.ts
```

Avoid overly generic names such as:

```text
Card.tsx
useData.ts
helper.ts
service.ts
```

### Components

Use PascalCase:

```text
ProductCard.tsx
OrderSummary.tsx
SellerProfile.tsx
ShoppingCartDrawer.tsx
```

### Hooks

Prefix custom hooks with `use`:

```text
useProducts.ts
useProductSearch.ts
useShoppingCart.ts
useMarketplaceFilters.ts
```

### Services

Use domain-based names:

```text
product.service.ts
order.service.ts
seller.service.ts
payment.service.ts
```

### Stores

Use clear responsibility-based names:

```text
useCartStore.ts
useMarketplaceFiltersStore.ts
usePreferencesStore.ts
useCheckoutStore.ts
```

Avoid creating a single global store containing unrelated application state.

## Dependency Rules

Before adding a new dependency:

1. Verify that the current stack cannot already solve the problem clearly.
2. Prefer lightweight and actively maintained libraries.
3. Avoid introducing overlapping libraries that solve the same responsibility.
4. Do not replace established project dependencies without explicit justification.
5. Avoid adding dependencies for trivial utilities that can be implemented safely with a small amount of code.

## Before Completing a Task

After significant changes, verify:

```bash
npm run build
```

When applicable, also verify:

```bash
npm run lint
```

Do not consider a task complete if the project no longer compiles successfully, unless the failure is unrelated to the requested change and is clearly documented.
