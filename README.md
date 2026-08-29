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

In `src/data/localdb/guitars.json` (and `projects.json`, `instruments.json`, `assets.json`), the `"picture"` and `"additionalPictures"` fields support any of the following formats:

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

## Architecture & Data Storage

- **Data Layer (`src/data/localdb/`)**: File-based JSON database for guitars, parts, projects, and wishlist items.
- **Service Layer (`src/data/guitarservice/`)**: Data aggregations, statistics, sorting, filtering, and model validations.
- **Components (`src/components/`)**:
  - `HouseholdGridComponents/` – Responsive card grid with hover scaling.
  - `SummaryComponents/` – Analytics dashboard with desktop grid and mobile collapsible accordions.
  - `TableComponents/` – Interactive sortable data tables.
  - `DetailComponents/` – Detailed specification cards, Reverb marketplace pricing, and JSON inspectors.
