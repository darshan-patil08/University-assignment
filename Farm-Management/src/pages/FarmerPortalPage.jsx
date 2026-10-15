import FarmerProfile from "../components/farmer-portal/FarmerProfile";
import FarmerProductList from "../components/farmer-portal/FarmerProductList";
import AddProductionForm from "../components/farmer-portal/AddProductionForm";
import {
  PortalWrapper,
  PortalHeader,
  PortalTitle,
} from "../components/farmer-portal/portalStyles";

const FarmerPortalPage = () => {
  return (
    <PortalWrapper>
      <PortalHeader>
        <PortalTitle>
          Farmer <span>Management Portal</span>
        </PortalTitle>

      </PortalHeader>

      {/* B) Farmer Profile Component consuming Context */}
      <FarmerProfile />

      {/* C & E) Farmer Products List with Remove action consuming Context */}
      <FarmerProductList />

      {/* D) Add Production Details Form updating Context */}
      <AddProductionForm />
    </PortalWrapper>
  );
};

export default FarmerPortalPage;
