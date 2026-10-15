# Farm Management — Concept Understanding Notes
> **Course:** CS7034 · Full Stack Web Development using MERN  
> **Institute:** Shrimad Rajchandra Institute of Management and Computer Application, UTU (2026-27)

---

## Practical 5 — React State Management & Forms

### 📌 What we implemented
- **Component:** `FarmInventoryManager` (main) + `ProductCard` (child)
- **Route:** `/inventory` (lazy-loaded via `React.lazy` + `Suspense`)
- **Files changed/created:**
  - `src/components/inventory/FarmInventoryManager.jsx`
  - `src/components/inventory/ProductCard.jsx`
  - `src/pages/InventoryPage.jsx`
  - `src/routes/MyRouter.jsx` (added `/inventory` route)
  - `src/components/navbar/NavBar.jsx` (added "Inventory" link)

---

### 🧠 Core Concept: `useState`

**What it does:**  
`useState` is a React Hook that lets a functional component "remember" a value between re-renders. Every time you call the state setter, React re-renders the component with the updated value.

**Syntax:**
```js
const [value, setValue] = useState(initialValue);
```

**Why we used it here:**
- `products` → starts as `[]` (empty), then gets populated after fetch
- `loading` → tracks fetch status (boolean)
- `fetchError` → holds error message if fetch fails
- `showForm` → toggles the add-product form open/closed
- `formData` → tracks every input field value (controlled form)
- `filter` → which category tab is active ("all", "grain", etc.)
- `formMsg` → success or error message after form submission

**Alternative approach:**  
You could use `useReducer` instead of multiple `useState` calls when state updates are related (e.g., `loading`, `data`, `error` all change together after a fetch). `useReducer` is better for complex state machines.

---

### 🧠 Core Concept: `useEffect`

**What it does:**  
`useEffect` lets you run side effects in functional components — things like fetching data, subscriptions, or manually updating the DOM — after React has rendered/updated the component.

**Syntax:**
```js
useEffect(() => {
  // effect code
  return () => { /* cleanup */ };
}, [dependencies]);
```

**Dependency array rules:**
| Array | Runs |
|---|---|
| `[]` (empty) | Only once — on mount (component first appears) |
| `[value]` | On mount + every time `value` changes |
| *(omitted)* | After every single render |

**Why we used it here:**  
We pass `[]` so the fetch fires exactly once when `FarmInventoryManager` first mounts:
```js
useEffect(() => {
  const timeout = setTimeout(async () => {
    const res = await fetch(API_URL);
    const json = await res.json();
    setProducts(json.record.farmProducts);  // populates state
  }, 800); // setTimeout simulates async delay (required by practical)

  return () => clearTimeout(timeout); // cleanup prevents memory leak
}, []);
```

**Why `setTimeout`?**  
The practical specifically asks to use `setTimeout` to access the remote JSON. This simulates real-world network latency and lets us show a loading spinner. In production you wouldn't need it — `fetch` is already async.

**Alternative approach:**  
You could use a custom hook `useFetch(url)` that encapsulates the loading/error/data pattern, making it reusable across components.

---

### 🧠 Core Concept: Controlled Components (Forms)

**What it does:**  
In React, a "controlled component" is a form element (`<input>`, `<select>`, `<textarea>`) whose value is controlled by React state — not by the DOM itself.

**The pattern:**
```jsx
// 1. State holds the value
const [name, setName] = useState("");

// 2. Input reads from state (value=)
// 3. Input writes back to state via onChange
<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

**Why controlled components?**
- React is always the single source of truth
- You can validate/transform input in real time
- Reading the value is just `formData.productName` — no DOM querying needed
- Easy to reset the form: just `setFormData(EMPTY_FORM)`

**How we implemented it:**
```js
const EMPTY_FORM = { farmerId: "", productName: "", category: "grain", ... };
const [formData, setFormData] = useState(EMPTY_FORM);

// One handler for ALL fields
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};
```
Each input has `name` matching the `formData` key. The single `handleChange` uses computed property `[name]` to update the right field.

**Alternative approach:**  
Use a form library like **React Hook Form** or **Formik** for larger forms. These avoid re-rendering the whole form on every keystroke (uncontrolled approach with `ref`s internally), but for learning purposes, controlled components are the clearest way to understand React's data flow.

---

### 🧠 Core Concept: Updating State on Form Submit

**Pattern:**
```js
const handleSubmit = (e) => {
  e.preventDefault();           // prevent page reload
  const newProduct = { ...formData, id: Date.now() };
  setProducts(prev => [newProduct, ...prev]); // immutable update
  setFormData(EMPTY_FORM);      // reset form
};
```

**Why `prev => [newProduct, ...prev]`?**  
React state updates must be immutable — never mutate the array directly with `.push()`. Use the functional updater form `prev => ...` so React always gets the latest state snapshot, even in batched updates.

---

### 🧠 Core Concept: Child Component for Display

We separated the display concern:
- `FarmInventoryManager` → manages state, fetch, form
- `ProductCard` → only receives one `product` object as prop and renders it

This follows the **Single Responsibility Principle** — each component does one thing.

```jsx
// Parent passes data down
{filtered.map(product => (
  <ProductCard key={product.id} product={product} />
))}

// Child only displays
const ProductCard = ({ product }) => (
  <Card>...</Card>
);
```

**Counter question — could we do this differently?**  
Yes — we could render everything inside one big component. But splitting into child components:
1. Makes each piece testable in isolation
2. Makes the template cleaner and easier to read
3. Allows reuse (ProductCard could be used elsewhere)

---

### 📝 Evaluation Parameters Mapped

| Eval Parameter | Where |
|---|---|
| Asynchronous fetch | `useEffect` + `fetch()` + `setTimeout` |
| useState & useEffect hooks | `useState` for products/form/loading; `useEffect` for mount-time fetch |
| React Form to add product | Controlled form with Zod schema validation |
| Display data using child component | `ProductCard` receives `product` prop from parent |

---

## Practical 6 — React Context API (State Sharing without Prop Drilling)

### 📌 What we implemented
- **Context:** `FarmerContext` + `FarmerProvider` + custom hook `useFarmer`
- **Route:** `/farmer-portal` (lazy-loaded in `MyRouter.jsx`)
- **Components:**
  - `FarmerProfile.jsx` — Consumes context to display farmer details + edit contact & location (Intermediate optional)
  - `FarmerProductList.jsx` — Consumes context to display associated products + delete/remove button
  - `AddProductionForm.jsx` — Consumes context to add new production entries
  - `portalStyles.js` — Dedicated styled-components styles file
  - `FarmerPortalPage.jsx` — Assembles the portal components
- **Files created/modified:**
  - `src/context/FarmerContext.jsx` (New)
  - `src/components/farmer-portal/FarmerProfile.jsx` (New)
  - `src/components/farmer-portal/FarmerProductList.jsx` (New)
  - `src/components/farmer-portal/AddProductionForm.jsx` (New)
  - `src/components/farmer-portal/portalStyles.js` (New)
  - `src/pages/FarmerPortalPage.jsx` (New)
  - `src/layouts/MainLayout.jsx` (wrapped with `<FarmerProvider>`)
  - `src/routes/MyRouter.jsx` (added `/farmer-portal` route)
  - `src/components/navbar/NavBar.jsx` (added "Farmer Portal" nav link)

---

### 🧠 Core Concept: React Context API

**What problem does Context solve?**  
In standard React, data is passed top-down via props. When multiple deeply nested components need the same data (like farmer details, theme, auth status), you have to pass props down through intermediate components that don't even need them. This is called **"Prop Drilling"**.  
**Context API** allows components anywhere in the tree to subscribe to and update a shared state directly.

#### 1. Context Creation (`createContext`)
```js
import { createContext } from "react";
const FarmerContext = createContext(null);
```

#### 2. Provider Component (`Provider`)
Holds state and passes it down via the `value` prop:
```jsx
export const FarmerProvider = ({ children }) => {
  const [farmer, setFarmer] = useState(INITIAL_FARMER);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  const addProduct = (product) => setProducts(prev => [{ id: Date.now(), ...product }, ...prev]);
  const removeProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));
  const updateFarmerProfile = (fields) => setFarmer(prev => ({ ...prev, ...fields }));

  return (
    <FarmerContext.Provider value={{ farmer, products, addProduct, removeProduct, updateFarmerProfile }}>
      {children}
    </FarmerContext.Provider>
  );
};
```

#### 3. Context Consumption (`useContext` / Custom Hook)
```js
export const useFarmer = () => {
  const context = useContext(FarmerContext);
  if (!context) throw new Error("useFarmer must be inside FarmerProvider");
  return context;
};
```

In any child component:
```jsx
const { farmer, updateFarmerProfile } = useFarmer();
const { products, removeProduct } = useFarmer();
const { addProduct } = useFarmer();
```

---

### 🎯 Counter-Questions & Viva Preparation

**Q1: What is the difference between Prop Drilling and Context API?**  
- **Prop Drilling:** Passing props through intermediate components that do not need them just to reach a deeply nested child.
- **Context API:** Direct subscription to global/shared state using `useContext` without passing props.

**Q2: When should you NOT use Context API?**  
- For high-frequency state updates (e.g., animations or mouse coordinates), because every consumer re-renders when context value changes. For frequent updates, Zustand or Redux Toolkit with fine-grained selectors is preferred.

**Q3: Why create a custom hook like `useFarmer()` instead of calling `useContext(FarmerContext)` directly?**  
1. It encapsulates the context import.
2. It adds defensive validation (throws an informative error if a component uses it outside the `<FarmerProvider>`).

---

### 📝 Evaluation Parameters Mapped (Practical 6)

| Eval Parameter | Marks | Where Implemented |
|---|:---:|---|
| 1. Context Creation | 4 | `createContext(null)` in `src/context/FarmerContext.jsx` |
| 2. Context Provider | 2 | `<FarmerProvider>` with state & updater functions in `MainLayout.jsx` |
| 3. Context Consuming | 2 | `useFarmer()` in `FarmerProfile`, `FarmerProductList`, `AddProductionForm` |
| 4. Technical Viva | 2 | Documented above in Concept Understanding notes |

---

## Practical 7 — Building RESTful API using Express.js (APMC Market)

### 📌 What we implemented
- **Backend Framework:** Express.js + CORS + File-based JSON Persistence
- **Database:** `server/data/farmers.json`
- **Files created/modified:**
  - `server/data/farmers.json` — Initial database schema as defined in PDF
  - `server/middleware/errorHandler.js` — Custom error handling middleware (Evaluation Parameter 2)
  - `server/routes/farmerRoutes.js` — Complete CRUD REST routes for farmers and farmer-wise crops
  - `server/server.js` — Main Express app listening on port 5000
  - `package.json` — Added `"server": "node server/server.js"` script and installed `express`, `cors`

---

### 🛣️ Endpoints Implemented (Evaluation Parameter 1 - 6 Marks)

| HTTP Method | Route | Description | Status Code |
|---|---|---|:---:|
| `POST` | `/farmers` | Add new farmer with empty crop list (validates name, phone, email) | `201 Created` |
| `GET` | `/farmers` | List all farmers and their produced crops | `200 OK` |
| `GET` | `/farmers/:farmerId` | Retrieve specific farmer details by ID (404 if not found) | `200 OK` |
| `POST` | `/farmers/:farmerId/crops` | Add new crop to farmer (validates Grains, Vegetables, Fruits) | `201 Created` |
| `DELETE` | `/farmers/:farmerId/crops/:cropId` | Remove specific crop from farmer | `200 OK` |
| `DELETE` | `/farmers/:farmerId` | Delete a farmer and all assigned crops | `200 OK` |

---

### 🧠 Core Concepts

#### 1. REST Architectural Constraints
- **Stateless:** Each request contains all information needed to process it.
- **Resource-Oriented:** URIs represent nouns (`/farmers`, `/farmers/:farmerId/crops`), HTTP verbs represent actions (`GET`, `POST`, `DELETE`).
- **Standard HTTP Status Codes:** `200` (Success), `201` (Created), `400` (Bad Request / Validation Error), `404` (Not Found), `500` (Server Error).

#### 2. Express Error-Handling Middleware (Evaluation Parameter 2 - 2 Marks)
In Express, error-handling middleware is defined with **exactly 4 parameters**: `(err, req, res, next)`:
```js
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
```
When any route throws an error or calls `next(error)`, Express skips all standard middleware and jumps straight to this error handler.

#### 3. File System Read/Write Persistence (`fs/promises`)
Instead of in-memory dummy variables that reset when the server restarts, we read and write directly to `farmers.json` using `fs.readFile()` and `fs.writeFile()` with `JSON.stringify(data, null, 2)`.

---

### 🎯 Counter-Questions & Viva Preparation

**Q1: Why do we need `express.json()` middleware?**  
- Express does not parse JSON request bodies by default. `express.json()` parses incoming requests with JSON payloads and populates `req.body`.

**Q2: How does Express recognize an Error-Handling middleware?**  
- By the number of arguments! Standard middleware takes 3 arguments `(req, res, next)`, whereas error middleware takes **4 arguments** `(err, req, res, next)`. If you omit the first parameter, Express treats it as regular middleware.

**Q3: What is CORS and why is `app.use(cors())` necessary?**  
- Cross-Origin Resource Sharing. Browsers block requests made from one origin (React frontend on `http://localhost:5173`) to a different origin (Express server on `http://localhost:5000`). The `cors()` middleware sends the appropriate `Access-Control-Allow-Origin` headers so our React frontend (in Practical 8) can consume the API.

---

### 📝 Evaluation Parameters Mapped (Practical 7)

| Eval Parameter | Marks | Where Implemented |
|---|:---:|---|
| 1. Implementation of given Routes | 6 | 6 CRUD endpoints in `server/routes/farmerRoutes.js` |
| 2. Error-handling Middleware | 2 | 4-arg middleware in `server/middleware/errorHandler.js` |
| 3. Technical Viva | 2 | Documented above in Concept Understanding notes |

---

## Practical 8 — Consuming Express API in React App using fetch()

### 📌 What we implemented
- **API Integration:** Consuming `http://localhost:5000/farmers` Express backend API from Practical 7 using native `fetch()`
- **Components:**
  - `FarmerEntryForm.jsx` — Form 1: Farmer registration with Zod validation + POST `/farmers`
  - `CropEntryForm.jsx` — Form 2: Farmer-wise crop entry with farmer dropdown + dynamic `category === "Grains"` condition + POST `/farmers/:farmerId/crops`
  - `FarmerCropsList.jsx` — Formatted display of farmers and their produced crops + real-time delete buttons
  - `apmcStyles.js` — Dedicated styled-components styles file
  - `APMCMarketPage.jsx` — Container page with mount-time `fetch()`, state updates, and error handling
- **Files created/modified:**
  - `src/components/apmc/FarmerEntryForm.jsx` (New)
  - `src/components/apmc/CropEntryForm.jsx` (New)
  - `src/components/apmc/FarmerCropsList.jsx` (New)
  - `src/components/apmc/apmcStyles.js` (New)
  - `src/pages/APMCMarketPage.jsx` (New)
  - `src/routes/MyRouter.jsx` (added `/apmc-market` route)
  - `src/components/navbar/NavBar.jsx` (added "APMC Market" nav link)

---

### 🧠 Core Concepts

#### 1. API Consumption using `fetch()` (Evaluation Parameter 1 - 2 Marks)
- **GET Request on mount (`useEffect`):**
```js
useEffect(() => {
  let active = true;
  const loadFarmers = async () => {
    try {
      const res = await fetch("http://localhost:5000/farmers");
      const data = await res.json();
      if (active) setFarmers(data.farmers);
    } catch (err) {
      if (active) setError(err.message);
    }
  };
  loadFarmers();
  return () => { active = false; };
}, []);
```
- **POST Request for Form Submission:**
```js
const res = await fetch("http://localhost:5000/farmers", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
```

#### 2. Creation of Two Forms with Validation (Evaluation Parameter 2 - 2 Marks)
- **Form 1 (Farmer Registration):** Validates Name (min 2 chars), Phone (10 digits regex `^[0-9]{10}$`), and Email format.
- **Form 2 (Farmer-wise Crop Entry):** Validates required farmer selection, crop name, positive quantity, and positive price.

#### 3. Dynamic Conditional Form Fields (Workbook Requirement)
The crop category dropdown has three options: `Grains`, `Vegetables`, and `Fruits`.
When `formData.cropsCategory === "Grains"` evaluates to `true`, the additional **Harvest Season** input is dynamically rendered:
```jsx
{formData.cropsCategory === "Grains" && (
  <FormGroup>
    <Label>Harvest Season (Grains Only) *</Label>
    <Select name="harvestSeason" value={formData.harvestSeason} onChange={handleChange}>
      <option value="Winter">Winter (Rabi)</option>
      <option value="Monsoon">Monsoon (Kharif)</option>
      <option value="Summer">Summer (Zaid)</option>
    </Select>
  </FormGroup>
)}
```
When `Vegetables` or `Fruits` is selected, the field is unmounted from the DOM and omitted from the payload!

#### 4. Real-Time State Management (Evaluation Parameter 3 - 4 Marks)
When new farmers or crops are submitted, the React state is updated locally without a full page reload:
- `setFarmers((prev) => [...prev, newFarmer])`
- `setFarmers((prev) => prev.map(f => f.farmerId === farmerId ? updatedFarmer : f))`

#### 5. Formatted Display from API (Evaluation Parameter 4 - 2 Marks)
Data returned from the API is displayed in clean farmer cards displaying contact information and a grid of produced crops with category badges and pricing.

---

### 🎯 Counter-Questions & Viva Preparation

**Q1: Why do we check `res.ok` before `res.json()` in fetch?**  
- Unlike Axios, native `fetch()` does not reject HTTP error statuses like 404 or 500; it only rejects on network failures. Checking `if (!res.ok) throw new Error(...)` ensures HTTP error responses trigger the `catch` block.

**Q2: How does dynamic conditional rendering work in React?**  
- Using JavaScript logical AND (`condition && <Component />`) or ternary operator (`condition ? <Component /> : null`). When the condition changes in state, React re-renders and conditionally mounts or unmounts the DOM element.

**Q3: How do we prevent memory leaks when fetching data inside `useEffect`?**  
- By using an active flag (`let active = true; return () => { active = false; };`) or an `AbortController`. This ensures state is not updated if the component unmounts before the async fetch completes.

---

### 📝 Evaluation Parameters Mapped (Practical 8)

| Eval Parameter | Marks | Where Implemented |
|---|:---:|---|
| 1. Consumption of API using fetch() | 2 | `loadFarmers()` GET and POST fetch calls in `APMCMarketPage`, `FarmerEntryForm`, `CropEntryForm` |
| 2. Creation of two forms with validation | 2 | Zod validation in `FarmerEntryForm` and `CropEntryForm` |
| 3. Data Entry using two forms | 4 | Controlled form handling and dynamic conditional field in `CropEntryForm` |
| 4. Display Data from API | 2 | Formatted cards & grid rendering in `FarmerCropsList` |



