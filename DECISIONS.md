# Design decisions

These decisions record the issues described in the restaurant website investigation supplied for BiteCraft. The investigation notes are the evidence for the reported competitor behavior; no screenshots or source captures were provided, so none are claimed here. Repository tests and code references below document BiteCraft's implementation.

## 1. Steakaway search: singular and plural matching

**Problem**
The investigation reported that searching Steakaway for “deal” returned deals, while searching for “deals” did not.

**Decision**
Normalize search text and match common singular/plural forms consistently across food names, descriptions, and image alt text.

**Alternative considered**
Use strict substring matching, or add a special-case alias for “deal” and “deals.”

**Reason for choosing the decision**
Shared token normalization handles the reported pair in either direction and also applies to other ordinary search terms without tying the search behavior to a single product.

**Trade-off**
The lightweight word-stemming rules cover common endings rather than every irregular English plural; broader matching can occasionally return an approximate match.

**Code location**

- [`src/utils/menuFilters.js`](./src/utils/menuFilters.js) normalizes tokens and matches singular/plural roots.
- [`src/pages/Menu.jsx`](./src/pages/Menu.jsx) connects the controlled search field to the filter.
- [`src/utils/menuFilters.test.js`](./src/utils/menuFilters.test.js) tests “deal” and “deals,” case-insensitivity, and empty/no-result searches.

**Evidence**

- User-provided investigation observation: “deal” succeeds while “deals” does not on Steakaway.
- The test `search is case-insensitive, matches singular and plural words, and handles empty queries` verifies both “DEAL” and “deals” return the Student Meal Deal in BiteCraft.
- No screenshot of the Steakaway search behavior was provided.

## 2. Spice Bazaar images: local product photography

**Problem**
The investigation reported that some Spice Bazaar food items were missing pictures.

**Decision**
Use item-matched local photographs and meaningful alt text for catalog items. If an image cannot be loaded, show the shared local BiteCraft fallback image and update its alt text to identify the missing photo.

**Alternative considered**
Use remote image URLs at runtime, show one generic image for every product, or leave unavailable images blank.

**Reason for choosing the decision**
Local, item-specific images avoid runtime dependence on image hosts and let customers distinguish products visually. Descriptive alt text provides an accessible alternative.

**Trade-off**
Bundled image files add static assets to the deployment. The fallback is an illustration rather than a photograph of the specific product, so it is only shown when that product's image fails and should be replaced by the correct photo when available.

**Code location**

- [`src/data/foods.js`](./src/data/foods.js) maps products to local image paths and alt text.
- [`public/images/`](./public/images) contains the checked-in JPEG files and [`food-fallback.svg`](./public/images/food-fallback.svg).
- [`src/components/ResilientImage.jsx`](./src/components/ResilientImage.jsx) switches to the shared fallback after an image error and changes the alt text.
- [`src/components/FoodCard.jsx`](./src/components/FoodCard.jsx), [`src/pages/FoodDetails.jsx`](./src/pages/FoodDetails.jsx), [`src/pages/Home.jsx`](./src/pages/Home.jsx), and [`src/components/CartItem.jsx`](./src/components/CartItem.jsx) use the shared image component.
- [`src/data/foods.test.js`](./src/data/foods.test.js) verifies each catalog image path is local and points to a JPEG file.
- [`src/data/IMAGE_SOURCES.md`](./src/data/IMAGE_SOURCES.md) records image sources.

**Evidence**

- User-provided investigation observation: some Spice Bazaar items lack pictures.
- The catalog test verifies all 12 current food records have local image files with JPEG headers and verifies that the shared local fallback SVG exists.
- The shared image component handles image load errors without contacting an external image service.
- No screenshot of the Spice Bazaar image issue was provided.

## 3. Spice Bazaar portion sizes: show portions while browsing

**Problem**
The investigation reported that Spice Bazaar did not show food portion sizes.

**Decision**
Show portion sizes on both menu cards and food detail pages.

**Alternative considered**
Show portions only after a customer opens a food detail page, or omit portion information.

**Reason for choosing the decision**
Showing portions in both places lets customers compare serving sizes while browsing and confirm the same information before adding a product to the cart.

**Trade-off**
Portion text makes cards and detail pages longer and requires the restaurant to keep serving descriptions accurate; some sizes are explicitly approximate.

**Code location**

- [`src/data/foods.js`](./src/data/foods.js) stores each product’s `portionSize`.
- [`src/components/FoodCard.jsx`](./src/components/FoodCard.jsx) displays the portion on menu cards.
- [`src/pages/FoodDetails.jsx`](./src/pages/FoodDetails.jsx) displays the portion on the detail page.
- [`src/data/foods.test.js`](./src/data/foods.test.js) checks that every catalog record has a non-empty portion size.

**Evidence**

- User-provided investigation observation: Spice Bazaar food portion sizes are missing.
- The catalog test checks all current food records for a non-empty portion size.
- No screenshot of the Spice Bazaar portion-size issue was provided.

## Additional observation: Spice Bazaar location link

**Problem**
The investigation reported that the Spice Bazaar location link was broken.

**Decision**
Keep BiteCraft’s street address visible and link it to a direct Google Maps search URL built from that address, rather than relying on an in-page location route.

**Alternative considered**
Use only a text address, or add an embedded map that could fail to load.

**Reason for choosing the decision**
Customers can still read the address if they do not follow the link, while the link opens a Maps search for the restaurant area.

**Trade-off**
The link depends on Google Maps and searches for the configured address; it does not guarantee a dedicated BiteCraft business listing.

**Code location**

- [`src/data/restaurant.js`](./src/data/restaurant.js) stores the F-7 Markaz fallback address and Maps query URL.
- [`src/pages/Home.jsx`](./src/pages/Home.jsx) displays the address and directions link.
- [`src/components/Footer.jsx`](./src/components/Footer.jsx) repeats the address and Maps link in the footer.

**Evidence**

- User-provided investigation observation: the Spice Bazaar location link is broken.
- BiteCraft’s `mapUrl` is a `maps.google.com/?q=...` URL using the configured F-7 Markaz address, and both the home page and footer render that URL alongside the readable address.
- No screenshot or external test result for the Spice Bazaar link was provided.
