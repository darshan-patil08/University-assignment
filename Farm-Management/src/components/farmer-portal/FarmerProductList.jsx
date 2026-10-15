import { useFarmer } from "../../context/FarmerContext";
import { Trash2, Calendar, IndianRupee, Sprout, Package } from "lucide-react";
import {
  SectionHeading,
  SectionTitle,
  CountBadge,
  ProductGrid,
  ProductItem,
  ProductTop,
  ProductName,
  CategoryTag,
  DeleteBtn,
  ProductMeta,
} from "./portalStyles";

const FarmerProductList = () => {
  // C) Consuming context to get products and removeProduct action
  const { products, removeProduct } = useFarmer();

  return (
    <section>
      <SectionHeading>
        <SectionTitle>
          Associated Products <CountBadge>{products.length}</CountBadge>
        </SectionTitle>
      </SectionHeading>

      {products.length === 0 ? (
        <p style={{ color: "#7a6344", fontStyle: "italic", padding: "20px 0" }}>
          No products associated with this farmer yet. Add one below.
        </p>
      ) : (
        <ProductGrid>
          {products.map((product) => (
            <ProductItem key={product.id}>
              <div>
                <ProductTop>
                  <div>
                    <ProductName>{product.productName}</ProductName>
                    <CategoryTag $cat={product.category}>
                      {product.category}
                    </CategoryTag>
                  </div>

                  {/* E) Remove product feature updating context state */}
                  <DeleteBtn
                    onClick={() => removeProduct(product.id)}
                    title="Remove from farmer products"
                  >
                    <Trash2 size={13} />
                    Remove
                  </DeleteBtn>
                </ProductTop>

                <div style={{ fontSize: "0.9rem", color: "#443420", marginTop: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    <Package size={14} color="#6b5635" />
                    <strong>Quantity:</strong> {product.quantity} {product.unit}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    <Calendar size={14} color="#6b5635" />
                    <strong>Harvest:</strong> {product.harvestDate}
                  </div>
                  {product.organicCertification && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#2d7a3a" }}>
                      <Sprout size={14} />
                      <strong>Certified Organic</strong>
                    </div>
                  )}
                </div>
              </div>

              <ProductMeta>
                <span>Price / {product.unit}</span>
                <strong style={{ color: "#1f3d2e", fontSize: "1.05rem", display: "flex", alignItems: "center" }}>
                  <IndianRupee size={14} />
                  {product.pricePerUnit}
                </strong>
              </ProductMeta>
            </ProductItem>
          ))}
        </ProductGrid>
      )}
    </section>
  );
};

export default FarmerProductList;
