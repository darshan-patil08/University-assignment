import { NavLink } from "react-router";
import styled, { createGlobalStyle } from "styled-components";
import logoMark from "../../assets/Logo.png";


const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Work+Sans:wght@400;500;600&display=swap');
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2em;
  background: #216945;
  padding: 0.7em 1.6em;
  border-radius: 1em;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  height:4rem;
    width: auto;
  display: block;
`;

const BrandName = styled.span`
  font-family: "Fraunces", serif;
  font-size: 1.2em;
  font-weight: 600;
  color: #f1e9d2;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2.2em;
`;

const NavItem = styled(NavLink)`
  position: relative;
  text-decoration: none;
  font-family: "Work Sans", sans-serif;
  font-size: 0.95em;
  font-weight: 500;
  color: #cddbcf;
  padding-bottom: 4px;
  transition: color 0.15s ease;

  &:hover {
    color: #f1e9d2;
  }

  &.active {
    color: #f1e9d2;
  }

 
  &.active::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    height: 3px;
    border-radius: 2px;
    background: #c6981f;
  }
`;

const NavBar = () => {
  return (
    <>
      <GlobalFonts />
      <Nav>
        <Brand>
          <Logo src={logoMark} alt="FarmWise logo" />
          <BrandName>FarmWise</BrandName>
        </Brand>
        <NavLinks>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/farmers">Farmers</NavItem>
          <NavItem to="/products">Products</NavItem>
          <NavItem to="/inventory">Inventory</NavItem>
          <NavItem to="/farmer-portal">Farmer Portal</NavItem>
          <NavItem to="/apmc-market">APMC Market</NavItem>
        </NavLinks>
      </Nav>
    </>
  );
};

export default NavBar;