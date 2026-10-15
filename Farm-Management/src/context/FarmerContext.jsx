import { createContext, useContext, useState } from "react";

// 1. Create the Context
const FarmerContext = createContext(null);

// Initial mock farmer details
const INITIAL_FARMER = {
  farmerId: "F-1042",
  name: "Ramesh Patel",
  contact: "+91 98765 43210",
  email: "ramesh.patel@farmwise.in",
  farmLocation: "Navsari, Gujarat",
  farmSize: "15 Acres",
  experience: "18 Years",
};

// Initial mock products associated with this farmer
const INITIAL_PRODUCTS = [
  {
    id: 101,
    productName: "Sharbati Golden Wheat",
    category: "grain",
    quantity: 1500,
    unit: "kg",
    pricePerUnit: 42,
    harvestDate: "2026-03-20",
    organicCertification: true,
  },
  {
    id: 102,
    productName: "Gir Kesar Mangoes",
    category: "fruit",
    quantity: 120,
    unit: "crates",
    pricePerUnit: 680,
    harvestDate: "2026-05-15",
    organicCertification: true,
  },
  {
    id: 103,
    productName: "Organic Desi Tomatoes",
    category: "vegetable",
    quantity: 450,
    unit: "kg",
    pricePerUnit: 28,
    harvestDate: "2026-04-10",
    organicCertification: false,
  },
];

// 2. Build the Provider Component (Wraps around app/components)
export const FarmerProvider = ({ children }) => {
  const [farmer, setFarmer] = useState(INITIAL_FARMER);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Action: Add new product to context state
  const addProduct = (newProduct) => {
    setProducts((prev) => [
      { id: Date.now(), ...newProduct },
      ...prev,
    ]);
  };

  // Action: Remove product by ID from context state
  const removeProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  // Action: Update farmer personal info (contact, location, etc.)
  const updateFarmerProfile = (updatedFields) => {
    setFarmer((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  return (
    <FarmerContext.Provider
      value={{
        farmer,
        products,
        addProduct,
        removeProduct,
        updateFarmerProfile,
      }}
    >
      {children}
    </FarmerContext.Provider>
  );
};

// 3. Custom Hook for easy consumption
// eslint-disable-next-line react-refresh/only-export-components
export const useFarmer = () => {
  const context = useContext(FarmerContext);
  if (!context) {
    throw new Error("useFarmer must be used within a FarmerProvider");
  }
  return context;
};

export default FarmerContext;
