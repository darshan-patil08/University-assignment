import styled from "styled-components"


const FooterContainer = styled.div`
  background: #1f3d2e;
  padding: 20px 0;
  border-radius: 4px;
  margin-top: 30px;
  text-align: center;
`;
const FooterText = styled.p`
  color: #f1e9d2;
  font-size: 14px;
`;

const Footer = () => {
  return (
    <FooterContainer>
        <FooterText>&copy; 2026 Farm Management System Enrollment : 202604104610046</FooterText>
    </FooterContainer>
  )
}

export default Footer