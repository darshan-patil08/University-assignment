import FarmerProduct from "../components/FarmerProduct";
import farmers from "../data/farmers";
import styled from "styled-components";

const ProductsPage = () => {
  const ProductList = styled.div`
     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    display: grid;
    gap: 1.5rem;  
    align-items: center;  
    justify-items: center;
  `;

  const ProductListTitle = styled.h2`
    font-family: "Fraunces", serif;
    font-size:2.2em;
    font-weight: 600;
    text-align: center;
    color: #1f3d2e;
    text-decoration: underline;
    text-decoration-color: #c6981f;

    `

  return (
    <section>
      <ProductListTitle>Products</ProductListTitle>
      <ProductList>
      {farmers.map((farmer) => (
        <FarmerProduct
          key={farmer.farmerName}
          productName={farmer.product.productName}
          type={farmer.product.type}
          quantityAvailable={farmer.product.quantityAvailable}
        />
      ))}
      </ProductList>
    </section>
  );
};

export default ProductsPage;
