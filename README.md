# GuitarHousehold 🎸

Keep track of your guitar collection, projects, instruments, and accessories!

Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

---

## Getting Started

Navigate to the `src` directory, install dependencies, and start the development server:

```bash
cd src
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Available Scripts

- `npm run dev` – Starts the Next.js development server.
- `npm run build` – Builds the project and pre-renders static pages (SSG).
- `npm run start` – Starts the production server.
- `npm run type-check` – Runs TypeScript compiler (`tsc --noEmit`) to verify types.
- `npm run lint` – Runs ESLint across source directories.

---

## Multi-Tenant Account & Database System

GuitarHousehold supports a multi-tenant directory-based database architecture under `src/data/localdb/`. Each subdirectory corresponds to an account / collection database identified by a GUID.

### 1. Directory Structure

```
src/data/localdb/
├── a1b2c3d4-e5f6-7890-abcd-ef1234567890/   # Primary Collection
│   ├── account.json                         # Account metadata
│   ├── guitars.json                         # Guitars database
│   ├── instruments.json                     # Other instruments
│   ├── projects.json                        # Project guitars & builds
│   ├── wishlist.json                        # Wishlist items
│   ├── parts.json                           # Spare parts & accessories
│   └── assets.json                          # Account-specific branding/assets
│
└── b2c3d4e5-f6a7-8901-bcde-f12345678901/   # Studio Workshop (Sample Account)
    ├── account.json
    ├── guitars.json
    ├── instruments.json
    ├── projects.json
    ├── wishlist.json
    ├── parts.json
    └── assets.json
```

### 2. Account Metadata (`account.json`)

Each account folder contains an `account.json` file defining its metadata:

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Primary Collection",
  "description": "Main household guitar collection",
  "isDefault": true,
  "created": "2026-01-01",
  "tokens": {
    "reverb": "your-reverb-api-token"
  },
  "assets": {
    "footer": {
      "message": "On GitHub @ https://github.com/brettm42/GuitarHousehold"
    },
    "aboutPage": {
      "images": [
        "/images/about/img1.jpg",
        "/images/about/img2.jpg"
      ]
    }
  }
}
```

### 3. Dynamic Account Switching

- **Navigation Dropdown**: The header bar and mobile navigation drawer include an interactive **Account Selector** dropdown (`AccountSelector.tsx`).
- **Client State Synchronization**: `AccountContext` automatically tracks the active account, persists the selection in `localStorage`, updates the URL query parameter (`?account=<guid>`), and fetches data from `/api/accounts/[id]/data` without full-page reloads.
- **Adding New Accounts**: Simply create a new folder under `src/data/localdb/<guid>/` with an `account.json` and database files; the app automatically discovers and lists it in the dropdown.

---

## Static Image Asset Vending

GuitarHousehold supports a lightweight, flexible static image hosting solution. You can vend **local static assets** directly from the application repository or use **remote image URLs** (e.g. Google Photos, CDNs), with automatic path resolution.

### 1. Directory Structure

Local images are stored in the Next.js `src/public/` folder, which serves static assets from the root URL:

```
src/
└── public/
    └── images/
        ├── guitars/      # Local guitar pictures and gallery photos
        └── about/        # About page pictures and static branding
```

### 2. Supported Image Formats in Data Files

In `guitars.json` (and `projects.json`, `instruments.json`, `assets.json`), the `"picture"` and `"additionalPictures"` fields support any of the following formats:

| Format | Example in JSON | Resolved URL |
| :--- | :--- | :--- |
| **Simple Filename** | `"picture": "100.jpg"` | `/images/guitars/100.jpg` |
| **Absolute Public Path** | `"picture": "/images/guitars/100.jpg"` | `/images/guitars/100.jpg` |
| **Subdirectory Filename** | `"picture": "custom/strat.webp"` | `/images/guitars/custom/strat.webp` |
| **Remote URL** | `"picture": "https://lh3.googleusercontent.com/..."` | `https://lh3.googleusercontent.com/...` |

### 3. Multi-Image Galleries

You can supply multiple images for an instrument using the `additionalPictures` array:

```json
{
  "id": 100,
  "name": "Ibanez Artcore AK80",
  "picture": "100.jpg",
  "additionalPictures": [
    "100-back.jpg",
    "100-headstock.jpg",
    "https://example.com/remote-photo.jpg"
  ]
}
```

The application's `ImageComponent` and `imageutils.ts` resolver automatically normalize mixed arrays of local and remote images, rendering an interactive tabbed gallery with touch-swipe navigation and responsive sizing.

---

## Key Features & Pages

- **Dashboard & Collection Overview (`/`)**: High-level inventory statistics, auto-hiding summary alerts (undelivered orders, projects in progress, missing cases), and visual instrument gallery.
- **Visual Analytics & Maintenance Tracking (`/data`)**:
  - String Age & Maintenance Health charts with urgency color coding (🔴 >12 mo, 🟡 6–12 mo, 🟢 <6 mo).
  - Manufacture Decade / Era vintage distribution.
  - Project Build Duration tracking.
  - Purchase Price vs. Estimated Reverb Market Valuation delta comparison.
- **Parts & Hardware Inventory (`/parts`)**: Interactive sortable table with category pills (`Neck`, `Body`, `Pickup`, `Case`), dynamic spec formatting, search filter, and total inventory valuation.
- **Project Builds (`/projects`, `/detail/[id]`)**: Custom build and mod tracker supporting both legacy string fields and the **Composable Project Architecture** (`parts: Part[]`):
  - **First-class Part Objects**: Projects can be composed of typed `Part` objects (`Body`, `Neck`, `Pickup`, `Case`, `Hardware`, `Electronics`, `Component`).
  - **Dynamic Cost Summation**: The project's total cost is computed automatically by summing part purchase prices.
  - **Dynamic Spec Derivation**: Overview specs (Body finish, wood, neck scale, radius, fret count, tremolo) are automatically populated from the parts array if top-level fields are omitted.
  - **Reference Example**: Implemented and demonstrated in the Test Bench Collection database (`src/data/localdb/c3d4e5f6-a7b8-9012-cdef-123456789012/projects.json`).
- **Guitars & Instruments (`/guitars`, `/instruments`, `/archive`, `/wishlist`)**: Interactive data tables with pinned columns and deep inspection links.

---

## Architecture & Services

- **Account Service (`src/data/accountservice/`)**: Auto-discovers account directories, parses account metadata, and loads scoped databases.
- **Guitar Service (`src/data/guitarservice/`)**: Data aggregations, statistics, sorting, filtering, and model validations per account.
- **API Routes (`src/pages/api/accounts/`)**:
  - `GET /api/accounts` – List all available accounts.
  - `GET /api/accounts/[id]/data` – Fetch full database payload for a specific account.
- **Components (`src/components/`)**:
  - `AccountSelector.tsx` – Database switcher dropdown.
  - `HouseholdGridComponents/` – Responsive card grid with hover scaling.
  - `SummaryComponents/` – Analytics dashboard with desktop grid and mobile collapsible accordions.
  - `TableComponents/` – Interactive sortable data tables (`DataDetailTable`, `PartsTable`).
  - `DataComponents/` – Lazy-loaded visual chart components (`ChartComponent`, `ChartComponents`).
  - `DetailComponents/` – Detailed specification cards, Reverb marketplace pricing, and JSON inspectors.
