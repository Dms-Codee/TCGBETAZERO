# TCG-BETA-ZERO

A scalable React MVP starter built with React 19, TypeScript, Vite, Tailwind CSS, TanStack Query, Zustand, and Zod.

The goal of this project is to provide a clean foundation for rapid MVP development while keeping the architecture maintainable enough to support future growth.

## Tech Stack

| Technology     | Purpose                                              |
| -------------- | ---------------------------------------------------- |
| React 19       | Component-based UI development                       |
| Vite           | Fast development server and production build tooling |
| TypeScript     | Static typing and improved maintainability           |
| Tailwind CSS   | Utility-first styling                                |
| React Router   | Client-side navigation                               |
| TanStack Query | Server state, caching, API requests, and mutations   |
| Zustand        | Global client-side state management                  |
| Zod            | Runtime validation and schema definition             |

## Getting Started

### Prerequisites

Make sure Node.js and npm are installed.

```bash
node --version
npm --version
```

### Install Dependencies

If the project has already been initialized:

```bash
npm install
```

To recreate the initial setup manually:

```bash
npm create vite@latest . -- --template react-ts

npm install

npm install react@19 react-dom@19

npm install tailwindcss @tailwindcss/vite

npm install react-router

npm install @tanstack/react-query
npm install @tanstack/react-query-devtools

npm install zustand

npm install zod
```

## Development

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## TypeScript

Strict TypeScript checking should remain enabled in `tsconfig.app.json`.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

Strict mode helps detect invalid assumptions, nullable values, implicit `any` types, and other potential issues during development instead of at runtime.

## Project Structure

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

### `components/`

Contains reusable presentational components.

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

Components should mainly focus on rendering UI and handling direct user interaction.

They should avoid owning API communication or complex business logic whenever possible.

### `features/`

Contains complete application capabilities grouped by domain.

```text
features/
├── products/
├── cart/
└── orders/
```

A feature may contain its own components, hooks, queries, views, and feature-specific logic.

Example:

```text
features/
└── products/
    ├── components/
    ├── hooks/
    ├── queries/
    └── views/
```

A useful rule:

> If something is only used by one feature, keep it inside that feature. If it is reused by multiple features, promote it to a shared directory such as `components/` or `hooks/`.

### `services/`

Contains communication with external systems.

Examples:

```text
services/
├── product.service.ts
├── order.service.ts
└── seller.service.ts
```

Services may communicate with:

* REST APIs
* Supabase
* GraphQL APIs
* Payment providers
* External marketplace services
* Other backend providers

UI components should generally not communicate directly with external APIs.

### `hooks/`

Contains reusable React hooks that are not exclusive to a single feature.

Examples:

```text
hooks/
├── useDebounce.ts
├── useMediaQuery.ts
└── usePagination.ts
```

Feature-specific hooks should remain inside their corresponding feature.

### `models/`

Contains shared TypeScript domain models and types.

Examples:

```text
models/
├── product.ts
├── order.ts
├── seller.ts
└── user.ts
```

Prefer domain-oriented names over generic types.

### `routes/`

Contains route definitions and navigation-related configuration.

Example:

```text
routes/
├── AppRoutes.tsx
└── paths.ts
```

This keeps routing responsibilities separate from individual views.

### `theme/`

Contains shared design configuration and styling conventions.

This may include:

* Design tokens
* Typography
* Spacing conventions
* Theme configuration
* Shared Tailwind-related abstractions

## State Management

Different kinds of state should be handled by different tools.

```text
Server State
    ↓
TanStack Query

Global Client State
    ↓
Zustand

Local Component State
    ↓
useState / useReducer

Runtime Validation
    ↓
Zod
```

### TanStack Query

Use TanStack Query for data whose source of truth exists outside the frontend.

Examples:

* Product catalog
* Product details
* Seller profiles
* Order history
* User profile data
* Inventory information
* API mutations
* Loading and error states
* Cache invalidation
* Refetching

Avoid copying TanStack Query data into Zustand unless there is a specific architectural reason.

### Zustand

Use Zustand for client-owned global state.

Examples:

* Shopping cart state
* Selected filters
* Sort preferences
* Temporary checkout data
* UI preferences
* Multi-step checkout state
* Recently selected marketplace options

Do not use Zustand as a replacement for API caching.

### Local State

Prefer `useState` or `useReducer` when state only belongs to a component or a small component subtree.

Not every value needs to be global.

Examples:

* Whether a modal is open
* Current tab selection
* Temporary text input
* Local dropdown state

### Zod

Use Zod when runtime validation is required.

Good use cases include:

* Product creation forms
* Checkout forms
* Seller registration
* API request payloads
* URL parameters
* Imported JSON
* External data
* Environment variables

Zod schemas can also be used to infer TypeScript types when appropriate.

## Architecture Principles

### Prefer Composition

Prefer small composable components over large components or inheritance-based abstractions.

For example, instead of creating a large marketplace page that handles everything internally, compose it from smaller pieces such as:

```text
MarketplacePage
├── SearchBar
├── ProductFilters
├── ProductGrid
│   └── ProductCard
└── Pagination
```

### Keep Responsibilities Focused

A component, hook, service, or store should have a clear responsibility.

Avoid creating files that become general-purpose containers for unrelated logic.

For example:

```text
ProductCard.tsx
```

should focus on displaying product information.

It should not also be responsible for:

```text
Fetching products
Creating orders
Authenticating users
Managing global filters
Processing payments
```

### Keep Feature Logic Close

Feature-specific logic should live close to the feature that owns it.

```text
features/
└── cart/
    ├── components/
    ├── hooks/
    ├── queries/
    └── views/
```

This makes features easier to understand, modify, remove, or migrate.

### Promote Reuse Intentionally

Do not move something into a shared directory only because it might become reusable someday.

Start locally.

For example:

```text
features/products/components/ProductFilters.tsx
```

If those filters are only used by the product catalog, keep them inside the feature.

If a generic filter component is later reused by products, sellers, and orders, it can be promoted to:

```text
components/common/
```

### Separate Server and Client State

Server state and client state have different lifecycles and should not be treated as the same thing.

```text
Product catalog     → TanStack Query
Order history       → TanStack Query
Seller information  → TanStack Query

Shopping cart       → Zustand
Selected filters    → Zustand
UI preferences      → Zustand

Modal state         → React
Input state         → React
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

Instead of overly generic names such as:

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

Use clear store names:

```text
useCartStore.ts
useMarketplaceFiltersStore.ts
usePreferencesStore.ts
useCheckoutStore.ts
```

Avoid creating a single global store containing unrelated application state.

For example, avoid:

```text
useAppStore.ts
```

containing:

```text
cart
filters
authentication
theme
checkout
seller settings
notifications
```

Prefer smaller stores organized by responsibility.

## Development Guidelines

Before committing changes:

```bash
npm run build
```

The development server may continue working even when TypeScript or production-build errors exist, so the production build should be verified regularly.

Keep dependencies intentional.

Before introducing a new library, verify that the problem cannot already be solved clearly with the existing stack.

## Current Architecture

```text
                 React
                   │
        ┌──────────┼──────────┐
        │          │          │
        ▼          ▼          ▼
     Router     Zustand    Components
        │
        │
        ▼
 TanStack Query
        │
        ▼
     Services
        │
        ▼
 Marketplace Backend / API

Zod validates data at application boundaries.
```

A typical product retrieval flow may look like:

```text
ProductCatalogView
        │
        ▼
   useProducts()
        │
        ▼
 TanStack Query
        │
        ▼
 product.service
        │
        ▼
 Backend / Supabase
```

While a client-owned interaction may look like:

```text
ProductCard
     │
     ▼
Add to Cart
     │
     ▼
useCartStore
     │
     ▼
Zustand
```

## Future Scalability

The project structure is intentionally compatible with future architectural growth.

Possible future evolution:

```text
apps/
├── web/
└── mobile/

packages/
├── domain/
├── schemas/
├── api/
└── shared/
```

This would make it possible to introduce a React Native or Expo application while sharing domain models, validation schemas, API logic, and other platform-independent code.

For a marketplace, shared packages could eventually contain:

```text
packages/
├── domain/
│   ├── product.ts
│   ├── order.ts
│   ├── seller.ts
│   └── user.ts
│
├── schemas/
│   ├── product.schema.ts
│   ├── checkout.schema.ts
│   └── seller.schema.ts
│
├── api/
│   ├── products.ts
│   ├── orders.ts
│   └── sellers.ts
│
└── shared/
    ├── currency.ts
    ├── formatting.ts
    └── constants.ts
```

The current MVP should remain simple, but architectural decisions should avoid unnecessarily blocking that future evolution.
