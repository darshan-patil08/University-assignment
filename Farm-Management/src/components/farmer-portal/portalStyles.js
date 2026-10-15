import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const PortalWrapper = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4.5rem;
  font-family: "Work Sans", sans-serif;
`;

export const PortalHeader = styled.header`
  margin-bottom: 2.2rem;
`;

export const PortalTitle = styled.h1`
  font-family: "Fraunces", serif;
  font-size: 2.4rem;
  font-weight: 600;
  color: #1f3d2e;
  margin: 0 0 6px;

  span {
    color: #c6981f;
  }
`;

export const PortalSubtitle = styled.p`
  font-size: 0.95rem;
  color: #6b5635;
  margin: 0;
`;

/* ── Profile Section ── */
export const ProfileCard = styled.div`
  background: #f1e9d2;
  border: 1px solid #dccfa6;
  border-radius: 16px;
  padding: 24px 28px;
  box-shadow: 0 6px 18px rgba(31, 61, 46, 0.08);
  margin-bottom: 2.5rem;
  animation: ${fadeIn} 0.3s ease;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding-bottom: 18px;
  border-bottom: 1.5px solid #dccfa6;
`;

export const ProfileIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Avatar = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #1f3d2e;
  color: #f1e9d2;
  font-family: "Fraunces", serif;
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FarmerName = styled.h2`
  font-family: "Fraunces", serif;
  font-size: 1.5rem;
  color: #1f3d2e;
  margin: 0 0 4px;
`;

export const FarmerIdBadge = styled.span`
  background: #c6981f;
  color: #1a1000;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
  letter-spacing: 0.04em;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.2rem;
  margin-top: 18px;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const InfoLabel = styled.span`
  font-size: 0.76rem;
  font-weight: 600;
  color: #7a6344;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const InfoValue = styled.span`
  font-size: 0.96rem;
  font-weight: 500;
  color: #221608;
  display: flex;
  align-items: center;
  gap: 6px;
`;

/* ── Buttons ── */
export const ButtonPrimary = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #1f3d2e;
  color: #f1e9d2;
  border: none;
  padding: 9px 20px;
  border-radius: 999px;
  font-family: "Work Sans", sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover {
    background: #2d5940;
    transform: translateY(-1px);
  }
`;

export const ButtonSecondary = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  color: #1f3d2e;
  border: 1.5px solid #1f3d2e;
  padding: 8px 16px;
  border-radius: 999px;
  font-family: "Work Sans", sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover {
    background: #1f3d2e;
    color: #f1e9d2;
  }
`;

/* ── Product List Section ── */
export const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.4rem;
  flex-wrap: wrap;
  gap: 12px;
`;

export const SectionTitle = styled.h3`
  font-family: "Fraunces", serif;
  font-size: 1.5rem;
  color: #1f3d2e;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CountBadge = styled.span`
  background: #c6981f;
  color: #1a1000;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 999px;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.4rem;
  margin-bottom: 2.5rem;
`;

export const ProductItem = styled.div`
  background: #fffdf5;
  border: 1.5px solid #dccfa6;
  border-radius: 14px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(31, 61, 46, 0.05);
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(31, 61, 46, 0.12);
  }
`;

export const ProductTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
`;

export const ProductName = styled.h4`
  font-family: "Fraunces", serif;
  font-size: 1.15rem;
  color: #1f3d2e;
  margin: 0 0 4px;
`;

export const CategoryTag = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 6px;
  background: ${(p) =>
    p.$cat === "grain"
      ? "#fff4d4"
      : p.$cat === "vegetable"
      ? "#e8f7ea"
      : "#fce9e9"};
  color: ${(p) =>
    p.$cat === "grain"
      ? "#a07507"
      : p.$cat === "vegetable"
      ? "#24732b"
      : "#b02626"};
`;

export const DeleteBtn = styled.button`
  background: #fdf0ec;
  border: 1px solid #f1b5a5;
  color: #c0392b;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover {
    background: #c0392b;
    color: #fff;
  }
`;

export const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px dashed #e4d7b7;
  font-size: 0.86rem;
  color: #55442e;
`;

/* ── Forms ── */
export const FormBox = styled.div`
  background: #f1e9d2;
  border: 1px solid #dccfa6;
  border-radius: 16px;
  padding: 24px 28px;
  margin-top: 1.5rem;
  animation: ${fadeIn} 0.3s ease;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
  margin-bottom: 1.2rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const FormLabel = styled.label`
  font-size: 0.78rem;
  font-weight: 600;
  color: #5a4225;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const FormInput = styled.input`
  font-family: "Work Sans", sans-serif;
  font-size: 0.9rem;
  padding: 9px 12px;
  background: #fffdf5;
  border: 1.5px solid #dccfa6;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #1f3d2e;
  }
`;

export const FormSelect = styled.select`
  font-family: "Work Sans", sans-serif;
  font-size: 0.9rem;
  padding: 9px 12px;
  background: #fffdf5;
  border: 1.5px solid #dccfa6;
  border-radius: 8px;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #1f3d2e;
  }
`;

export const ErrorList = styled.div`
  background: #fdf0ec;
  border: 1px solid #e8b4a0;
  border-radius: 8px;
  padding: 10px 14px;
  color: #8c3a26;
  font-size: 0.88rem;
  margin-bottom: 1rem;

  ul {
    margin: 4px 0 0 16px;
    padding: 0;
  }
`;
