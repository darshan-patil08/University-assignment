import { Outlet } from "react-router";
import NavBar from "../components/navbar/NavBar";
import { createGlobalStyle } from "styled-components";
import Footer from "../components/footer/Footer";
import { FarmerProvider } from "../context/FarmerContext";

const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Work+Sans:wght@400;500;600&display=swap');
`;

const MainLayout = () => {
  return (
    <FarmerProvider>
      <GlobalFonts />
      <NavBar />
      <Outlet />
      <Footer />
    </FarmerProvider>
  );
};

export default MainLayout;