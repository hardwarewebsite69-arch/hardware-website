# Convert Static HTML Screens to Next.js Components

Convert all existing screens currently stored as static HTML files in the `screens` directory into production-ready React/Next.js components. Eliminate the iframe-based rendering mechanism entirely and build a cohesive, responsive layout system that renders the components with high design fidelity and real-time backend data from Supabase.

## User Review Required

> [!IMPORTANT]
> - **Font styling & Icons**: We will load Google Fonts (Inter, Geist, Hanken Grotesk) and Material Symbols Outlined globally in Next.js to preserve the exact aesthetics.
> - **Styling**: All static screens rely on Tailwind CSS. We will reuse these classes directly since Tailwind CSS v4 is configured in the project.
> - **Shared Components**: We will refactor repeated code (such as headers, footers, admin navigation bars) into reusable React components to simplify maintenance and clean up the codebase.

## Proposed Changes

### Reusable Layout Components
Create reusable layout components to structure the public-facing and admin-facing pages.

---

#### [NEW] [Header.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/components/Header.tsx)
- Public header containing branding ("Amroz Traders"), search bar, navigation links (Shop, Categories, Bulk Pricing), WhatsApp support, and "Request Quote" CTAs.
- Handles responsive toggle for mobile navigation.

#### [NEW] [Footer.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/components/Footer.tsx)
- Public footer with links to product categories, company information, contact details (Phone, Email, WhatsApp), and the admin panel link.

#### [NEW] [AdminSidebar.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/components/AdminSidebar.tsx)
- Admin sidebar containing dashboard stats, products, categories, quotes management, media library, and settings tabs.
- Highlight active navigation state based on current path.

#### [NEW] [AdminHeader.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/components/AdminHeader.tsx)
- Top bar for admin panel containing branding, search input, and profile/notifications buttons.

---

### App Pages Refactoring

#### [MODIFY] [page.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/app/page.tsx)
- Refactor to render the homepage in pure React.
- Render Hero section, category grid, trust indicators, featured items, and inline quote request forms.
- Fetch featured products dynamically or fall back to static mocks if DB is unseeded.

#### [MODIFY] [page.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/app/shop/page.tsx)
- Render the shop overview listing all categories.

#### [MODIFY] [page.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/app/shop/[category]/page.tsx)
- Render building materials or other category pages using a 12-column responsive layout (Sidebar with filters + main grid).
- Fetch products dynamically based on category parameter.

#### [MODIFY] [page.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/app/product/[slug]/page.tsx)
- Refactor the product details page.
- Render the main image, gallery thumbnails, specs details, CTAs ("Add to Quote", "Request Bulk Pricing"), and related items.
- Dynamic data integration with Supabase catalog table.

#### [MODIFY] [page.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/app/quote/page.tsx)
- Refactor quote request page supporting both "Upload List" uploader and "Manual Entry" interactive item grid.
- Integrate tabs switching mechanism using React state instead of raw JavaScript.
- Integrate with Supabase insertion helpers (`createUploadQuote`/`createManualQuote`).

#### [MODIFY] [page.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/app/quote/manual/page.tsx)
- Point to the quote request page with the "Manual Entry" tab active by default.

#### [MODIFY] [page.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/app/quote/upload/page.tsx)
- Point to the quote request page with the "Upload List" tab active by default.

#### [MODIFY] [page.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/app/contact/page.tsx)
- Point to the quote request / contact page.

#### [MODIFY] [page.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/app/search/page.tsx)
- Render search results dynamically based on product name/sku search.

#### [MODIFY] [page.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/app/admin/dashboard/page.tsx)
- Render admin overview with dynamic KPI metrics (Total products, pending quotes, categories count) and recent quotes grid.

#### [MODIFY] [page.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/app/admin/products/page.tsx)
- Render products inventory table.

#### [MODIFY] [page.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/app/admin/categories/page.tsx)
- Render category listings table.

#### [MODIFY] [page.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/app/admin/quotes/page.tsx)
- Render quotes management dashboard. Clicking on a quote navigates to its detail page.

#### [NEW] [page.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/app/admin/quotes/[id]/page.tsx)
- Detail page for reviewing customer details, downloaded lists, requested items, updating status, and sending responses via WhatsApp/Email.

---

### Global Configuration & Cleanup

#### [MODIFY] [layout.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/app/layout.tsx)
- Inject Google Fonts (Inter, Geist, Hanken Grotesk) and Material Symbols stylesheet link inside the global layout `<head>` tag.

#### [MODIFY] [globals.css](file:///c:/Users/USER/Documents/CODING/website/hardware-website/app/globals.css)
- Add custom utility classes (`.industrial-border`, `.input-border`, `.hover-lift`, etc.) extracted from the HTML stylesheets.

#### [DELETE] [ScreenFrame.tsx](file:///c:/Users/USER/Documents/CODING/website/hardware-website/components/ScreenFrame.tsx)
- Remove the iframe-based renderer.

## Verification Plan

### Automated Tests
- Run `npm run build` to verify there are no compilation errors, TypeScript mismatches, or layout issues.

### Manual Verification
- Access `/` (Home), `/shop`, `/product/h-700-high-torque-gearbox`, and `/quote` to inspect styling, design, layout responsiveness, and link navigation.
- Verify Admin Pages (`/admin/dashboard`, `/admin/products`, `/admin/quotes`, and `/admin/settings`) to ensure correct sidebar styling, layout integration, and page loading.
