# BiteCraft

BiteCraft is a responsive restaurant ordering website for a fast-casual restaurant in Islamabad, Pakistan. It presents a local food menu and supports a simulated delivery or pickup order flow.

## Business overview

- **Business:** BiteCraft, a fast-casual restaurant
- **Location:** F-7 Markaz, Islamabad, Pakistan
- **Target audience:** University students and young professionals
- **Ordering methods:** Delivery and pickup
- **Currency:** Pakistani rupees (PKR)

### Business objectives

- Make it quick to find meals by category, name, or ingredient.
- Show clear product descriptions, prices, portion sizes, and availability.
- Provide a responsive ordering experience for mobile and desktop customers.
- Explain delivery pricing before an order is submitted.

## Technologies

- React and JavaScript
- Vite
- React Router DOM
- React Context API
- Standard CSS
- `localStorage` for cart persistence
- Node.js built-in `node:test` and `node:assert/strict` for tests

The application uses local restaurant data. It has no backend, external menu API, or payment gateway.

## Main features

- Home page with restaurant information, food categories, popular items, and a location link.
- Responsive menu with case-insensitive singular/plural search, category filters, and sorting.
- Asynchronous mock menu loading, with loading, error, retry, and empty-data states. To demonstrate the controlled states, open `/menu?simulateFailure=1` or `/menu?emptyMenu=1`; retry returns to the normal local menu.
- Food detail pages with local photos, a shared image fallback, descriptions, portion sizes, availability, and quantity controls.
- Cart shared through React Context and persisted in `localStorage`.
- Checkout form validation for Pakistani mobile numbers, delivery/pickup selection, and delivery addresses.
- Availability enforcement and delivery pricing: PKR 150 below a PKR 2,000 subtotal, free delivery at or above PKR 2,000, and free pickup.

Menu photos and the shared fallback image are stored in `public/images`; photo source notes are in [`src/data/IMAGE_SOURCES.md`](./src/data/IMAGE_SOURCES.md).

## Project structure

```text
public/
  images/                 Local food photography
src/
  components/             Shared navigation, cards, and order components
  context/                Shared cart state
  data/                   Food and restaurant data, plus catalog tests
  pages/                  Home, menu, food details, cart, checkout
  utils/                  Business rules, filtering, loading, and utilities with tests
  App.jsx                 Routes and shared page layout
  App.css                 Application layout and responsive styles
  index.css               Global styles and design tokens
  main.jsx                React entry point
tests/
  businessRules.test.js   Top-level business-rule tests
```

## Setup

**Prerequisite:** Install Node.js and npm using a Node.js version supported by Vite 8.

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Create a production build:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

Run the Node.js test suite:

```sh
npm test
```

Run the linter:

```sh
npm run lint
```

## Project links

- **GitHub:** `https://github.com/<your-username>/<your-repository>`
- **Deployment:** `https://your-deployment-url.example`

Replace these placeholders with the project’s final repository and deployment URLs.