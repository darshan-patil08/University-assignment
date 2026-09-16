import FarmerDetails from "../components/FarmerDetails";
import farmers from "../data/farmers";
import styled from "styled-components";

const FarmersPage = () => {
  const FarmerList = styled.div`
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    display: grid;
    gap: 1.5rem;  
    align-items: center;  
    justify-items: center;
  `;

    const FarmerListTitle = styled.h2`
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
      <FarmerListTitle>Farmers</FarmerListTitle>
      <FarmerList>
      {farmers.map((farmer) => (
        <FarmerDetails
          key={farmer.farmerName}
          farmerName={farmer.farmerName}
          age={farmer.age}
          farmLocation={farmer.farmLocation}
        />
      ))}
      </FarmerList> 
    </section>
  );
};

export default FarmersPage;
