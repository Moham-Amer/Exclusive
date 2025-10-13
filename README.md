# Final React Project

A modern React + Vite e-commerce app with products, cart, wishlist, auth, search, and responsive UI.

## Setup

- Prereqs: Node >= 16, Yarn
- Install:
```bash
yarn install
```
- Run dev server:
```bash
yarn dev
```
- Mock API (if used in your environment):
```bash
yarn server
```
- Build/preview:
```bash
yarn build
yarn preview
```

## Tech Decisions

- Routing: `react-router-dom` with a single router provider. Pages lazy-loaded per feature. Route structure lives under `src/routes` and feature route files (e.g. `features/products/routes`).
- Data fetching: `@tanstack/react-query` for caching, retries, and loading states. API via Axios wrapper (`src/lib/axios`).
- State: Lightweight global state with Zustand for cart and wishlist; local component state where appropriate.
- Forms + Validation: `react-hook-form` with `@hookform/resolvers/yup`. Schemas live next to pages (e.g. `features/contact/pages/config.js`, `features/cart/pages/config.js`).
- UI: MUI components + custom styles. Mobile-first responsive adjustments in navbar and sections.
- Persistence: `localStorage` for cart and wishlist via small helpers/hooks.
- Organization: Feature-first folders (`features/{home,products,cart,search,wishlist,auth}`) with `components/`, `pages/`, `hooks/`, `services/`, and `store/` subfolders.

## Key Features

- Products: listing, details, search suggestions, related items from API
- Cart: quantity support, persisted cart, unique-count badge in navbar
- Wishlist: toggle on product details, persisted list, dynamic badge; wishlist page reflects stored items
- Auth: login/signup forms with Yup validation (demo flow)
- Contact + Billing: forms validated with Yup (same pattern as auth); post-submit CTA to return home
- Category Filters: URL-based (`?category=`) applied from Home and in Products page with filter buttons
- Navbar: desktop tabs; mobile shows hamburger for drawer + compact actions (cart, wishlist) and search

## Known Limitations

- API Source: Products use `https://api.escuelajs.co/api/v1/products` via Axios. If the API schema changes, some fields (e.g., `images`, `category.name`) may need adjustments.
- Auth Flow: Simplified demo; no secure session handling or protected backend APIs.
- Wishlist Server Sync: Stored locally only; no server persistence.
- Accessibility: Basic semantics are present, but a full a11y audit has not been performed.
- Tests: No automated tests included.

## Project Structure (excerpt)

```
src/
  features/
    auth/
    cart/
      pages/
      hooks/
      store/
    contact/
      pages/
    home/
      pages/
    products/
      components/
      pages/
      services/
    wishlist/
      hooks/
      pages/
      store/
  lib/
    axios/
    storage/
  shared/
    components/
    layout/
  routes/
```

## Scripts

- `yarn dev` – start app
- `yarn build` – build
- `yarn preview` – preview build
- `yarn server` – start mock API (if used)
- `yarn lint` – run ESLint

## Deployment

Build with `yarn build` and deploy `dist/` to any static host.