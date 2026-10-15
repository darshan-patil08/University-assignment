# Farm Management Project — Deep Analysis

## Tech Stack
- **Framework:** React 19 + Vite
- **Routing:** React Router v7 (createBrowserRouter)
- **Styling:** Styled-components v6
- **Validation:** Zod v4
- **Icons:** Lucide React
- **Build:** Vite 8

## Color / Design System (existing theme)
| Token | Value | Usage |
|---|---|---|
| Dark Green | `#1f3d2e` / `#216945` | Navbar BG, Card Headers, Footer BG |
| Cream/Warm | `#f1e9d2` | Card BG, text on dark |
| Gold Accent | `#c6981f` | Underlines, badges, active nav indicator |
| Border | `#dccfa6` | Card borders |
| Warm Brown | `#6b4226` | Labels, muted text |
| Fonts | Fraunces (serif) + Work Sans | Display + Body |

## Project Structure
```
src/
├── App.jsx               ← Home page content
├── main.jsx              ← Entry, RouterProvider
├── assets/Logo.png
├── components/
│   ├── FarmerDetails.jsx ← Farmer card (Zod validated)
│   ├── FarmerProduct.jsx ← Product card (Zod + safeParse)
│   ├── navbar/NavBar.jsx ← Brand + NavLinks (active state)
│   └── footer/Footer.jsx ← Copyright + enrollment
├── data/farmers.js       ← Static data (10 farmers)
├── layouts/MainLayout.jsx← Navbar + Outlet + Footer
├── pages/
│   ├── FarmersPage.jsx   ← Grid of FarmerDetails cards
│   └── ProductsPage.jsx  ← Grid of FarmerProduct cards
└── routes/MyRouter.jsx   ← Lazy-loaded routes
```

## Practicals Status
| # | Topic | Status |
|---|---|---|
| 1 | React Setup + JSX | ✅ Done |
| 2 | Props + Component Structure | ✅ Done |
| 3 | React Router + Lazy Loading | ✅ Done |
| 4 | Zod Validation | ✅ Done |
| 5 | useState + useEffect + Fetch + Forms | 🔴 TODO |
| 6 | Context API | 🔴 TODO |
| 7 | Express.js REST API (backend) | 🔴 TODO |
| 8 | API Consumption (fetch from P7 API) | 🔴 TODO |

---

## Practical 5 — State Management & Forms
**Objective:** Implement useState + useEffect + controlled form

### Requirements:
- Component: `FarmInventoryManager`
- API: `https://api.jsonbin.io/v3/b/671a0377acd3cb34a89c2c5f`
- Use `setTimeout` to simulate async fetch
- A) useState → initialize empty, populate after fetch
- B) useEffect → fetch on mount
- C) Display fetched products (no photos)
- D) Add New Product form (all API fields except photos)
- E) Controlled form → on submit, update state + show new product

**Eval:** Async fetch · useState & useEffect · React Form · Child component display

---

## Practical 6 — Context API
**Objective:** Global state via Context API

### Requirements:
- State: Farmer ID, Name, Contact, Farm Location, List of Farm Products (grains, veg, fruits)
- A) Provider component wrapping app (or parts)
- B) `FarmerProfile` component — consumes context, renders farmer info
- C) Farm products list component — consumes context
- D) Form to add new production details (uses same API fields as P5)
- E) Remove production details feature → updates context
- **Optional:** Edit farmer personal info (contact + location) via form

**Eval:** Context creation · Context provider · Context consuming · Technical viva

---

## Practical 7 — Express.js REST API (Backend)
**Objective:** Build RESTful API with Express.js

### Routes:
1. `POST /farmers` — add farmer (name, phone, email required), empty crop list
2. `GET /farmers` — list all farmers + their crops
3. `GET /farmers/:farmerId` — get one farmer or error if not found
4. `POST /farmers/:farmerId/crops` — add crop to farmer (name, qty, price, category)
5. `DELETE /farmers/:farmerId/crops/:cropId` — remove specific crop
6. `DELETE /farmers/:farmerId` — delete farmer + crops
7. Error handling middleware (meaningful messages)

### JSON Data Format:
```json
{
  "farmers": [
    {
      "farmerId": 1,
      "name": "Ramesh Patel",
      "contact": { "phone": "9876543210", "email": "ranesh.patel@example.com" },
      "farmLocation": "Ahmedabad, Gujarat",
      "producedCrops": [
        { "cropId": 101, "cropName": "Wheat", "category": "Grains", "quantity": 1200, "unit": "kg", "pricePerUnit": 25, "harvestSeason": "Winter" },
        { "cropId": 102, "cropName": "Tomato", "category": "Vegetables", "quantity": 500, "unit": "kg", "pricePerUnit": 40 }
      ]
    },
    {
      "farmerId": 2,
      "name": "Suresh Mehta",
      "contact": { "phone": "9988776655", "email": "suresh.mehta@example.com" },
      "farmLocation": "Nashik, Maharashtra",
      "producedCrops": [
        { "cropId": 201, "cropName": "Rice", "category": "Grains", "quantity": 1500, "unit": "kg", "pricePerUnit": 30, "harvestSeason": "Monsoon" },
        { "cropId": 202, "cropName": "Mango", "category": "Fruits", "quantity": 300, "unit": "dozen", "pricePerUnit": 120 }
      ]
    }
  ]
}
```

**Eval:** Route implementation · Error-handling middleware · Technical viva

---

## Practical 8 — API Consumption (fetch + Forms)
**Objective:** Consume the Express API from Practical 7 using React fetch()

### Requirements:
1. Validation for incoming data (required fields, valid formats)
2. Form 1: Farmer Entry form
3. Form 2: Farmer-wise crops entry with **dynamic fields**:
   - Crop category dropdown: Grains / Vegetables / Fruits
   - When 'Grains' selected → show extra field: harvest season
   - When 'vegetables' or 'fruits' → no extra fields
   - Farmer dropdown for selection
4. Controlled components
5. State management for real-time updates
6. Display farmer-wise crops list (formatted)

**Eval:** API consumption with fetch() · Two forms with validation · Data entry · Display from API
