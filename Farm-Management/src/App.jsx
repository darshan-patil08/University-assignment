import styled from "styled-components"; 


  const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh; 
    `

    const TitleContainer = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    `;
  
    const MainTitle = styled.h1`
      font-family: "Fraunces", serif;
      font-size: 3.5em;
      font-weight: 600;
    `

    const Points = styled.ul`
      font-family: "Fraunces", serif;
      font-size: 1.2em;`;
      
const App = () => {


  return (
    <Main>
      <TitleContainer>
        <MainTitle>Farm Management System</MainTitle>
        <p>Welcome to the Farm Management App!</p>
        <Points>
          <li>View A List Of Farmers Details. Click On The Farmer Link In Navigation Bar.</li>
          <li>View A List Of Products Details. Click On The Products Link In Navigation Bar.</li>
          </Points>
      </TitleContainer>
    </Main>
  );
}
  
export default App;
