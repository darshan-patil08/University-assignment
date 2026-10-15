import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import ProductCard from "./ProductCard";
import AddProductForm from "./AddProductForm";
import {
  PageWrapper,
  HeaderRow,
  PageHeader,
  PageTitle,
  PageSubtitle,
  StatsRow,
  StatChip,
  CenterBox,
  SpinIcon,
  ErrorBox,
  Grid,
  ToggleBtn,
} from "./inventoryStyles";

const API_URL = "https://api.jsonbin.io/v3/b/671a0377acd3cb34a89c2c5f";

const FarmInventoryManager = () => {
  // A) Initial state starts empty
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [filter, setFilter] = useState("all");

  // B) useEffect: fetch on mount
  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        // C) Populate state with fetched products
        setProducts(json.record.farmProducts);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    }, 800); // simulated network delay

    return () => clearTimeout(timeout);
  }, []);

  // E) Callback to update state with new product from form
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Filtered products & summary statistics
  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  const counts = {
    all: products.length,
    grain: products.filter((p) => p.category === "grain").length,
    vegetable: products.filter((p) => p.category === "vegetable").length,
    fruit: products.filter((p) => p.category === "fruit").length,
  };

  return (
    <PageWrapper>
      {/* Page Header */}
      <HeaderRow>
        <PageHeader>
          <PageTitle>
            Farm <span>Inventory</span>
          </PageTitle>
          <PageSubtitle>
            Manage and track all farm products in real-time
          </PageSubtitle>
        </PageHeader>

        {/* Category Filters */}
        {!loading && !fetchError && (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["all", "grain", "vegetable", "fruit"].map((cat) => (
              <ToggleBtn
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  background: filter === cat ? "#c6981f" : "#1f3d2e",
                  color: filter === cat ? "#1a1000" : "#f1e9d2",
                  padding: "7px 18px",
                  fontSize: "0.82rem",
                  textTransform: "capitalize",
                }}
              >
                {cat} ({counts[cat]})
              </ToggleBtn>
            ))}
          </div>
        )}
      </HeaderRow>

      {/* Summary KPI chips */}
      {!loading && !fetchError && (
        <StatsRow>
          <StatChip $bg="#eaf7ec" $border="#aad8b0" $accent="#2d7a3a">
            <strong>{counts.all}</strong> Total Products
          </StatChip>
          <StatChip $bg="#fff8e7" $border="#f3d790" $accent="#c6981f">
            <strong>{counts.grain}</strong> Grains
          </StatChip>
          <StatChip $bg="#f0faf0" $border="#b8e4b8" $accent="#3a8f40">
            <strong>{counts.vegetable}</strong> Vegetables
          </StatChip>
          <StatChip $bg="#fdf0ec" $border="#f1b5a5" $accent="#c0392b">
            <strong>{counts.fruit}</strong> Fruits
          </StatChip>
        </StatsRow>
      )}

      {/* Error state */}
      {fetchError && (
        <ErrorBox>
          <AlertTriangle size={18} />
          <span>Failed to load inventory: {fetchError}</span>
        </ErrorBox>
      )}

      {/* Loading state */}
      {loading ? (
        <CenterBox>
          <SpinIcon size={36} />
          <span>Loading farm inventory…</span>
        </CenterBox>
      ) : (
        /* C) Display products via child ProductCard */
        <Grid>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      )}

      {/* D & E) Controlled Add Product Form */}
      <AddProductForm onAddProduct={handleAddProduct} />
    </PageWrapper>
  );
};

export default FarmInventoryManager;
