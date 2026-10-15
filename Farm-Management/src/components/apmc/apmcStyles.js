import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4.5rem;
  font-family: "Work Sans", sans-serif;
`;

export const PageHeader = styled.header`
  margin-bottom: 2.2rem;
`;

export const Title = styled.h1`
  font-family: "Fraunces", serif;
  font-size: 2.4rem;
  font-weight: 600;
  color: #1f3d2e;
  margin: 0 0 6px;

  span {
    color: #c6981f;
  }
`;

export const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #6b5635;
  margin: 0;
`;

export const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1.8rem;
  margin-bottom: 3rem;
`;

export const FormCard = styled.div`
  background: #f1e9d2;
  border: 1px solid #dccfa6;
  border-radius: 16px;
  padding: 24px 28px;
  box-shadow: 0 6px 18px rgba(31, 61, 46, 0.08);
  animation: ${fadeIn} 0.3s ease;
`;

export const FormTitle = styled.h2`
  font-family: "Fraunces", serif;
  font-size: 1.35rem;
  color: #1f3d2e;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 1rem;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const Label = styled.label`
  font-size: 0.78rem;
  font-weight: 600;
  color: #5a4225;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const Input = styled.input`
  font-family: "Work Sans", sans-serif;
  font-size: 0.9rem;
  padding: 9px 12px;
  background: #fffdf5;
  border: 1.5px solid #dccfa6;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.18s ease;

  &:focus {
    border-color: #1f3d2e;
  }
`;

export const Select = styled.select`
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

export const DynamicNotice = styled.div`
  background: #eef7ee;
  border: 1px dashed #73b878;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 1rem;
  font-size: 0.82rem;
  color: #236329;
  display: flex;
  align-items: center;
  gap: 6px;
  animation: ${fadeIn} 0.2s ease;
`;

export const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #1f3d2e;
  color: #f1e9d2;
  border: none;
  padding: 10px 22px;
  border-radius: 999px;
  font-family: "Work Sans", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.18s ease;
  width: 100%;
  margin-top: 6px;

  &:hover {
    background: #2d5940;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorAlert = styled.div`
  background: #fdf0ec;
  border: 1px solid #e8b4a0;
  border-radius: 8px;
  padding: 10px 14px;
  color: #8c3a26;
  font-size: 0.86rem;
  margin-bottom: 1rem;

  ul {
    margin: 4px 0 0 16px;
    padding: 0;
  }
`;

export const SuccessAlert = styled.div`
  background: #eaf7ec;
  border: 1px solid #aad8b0;
  border-radius: 8px;
  padding: 9px 14px;
  color: #2d7a3a;
  font-size: 0.88rem;
  margin-bottom: 1rem;
`;

/* ── Display Section ── */
export const FarmerBlock = styled.article`
  background: #fffdf5;
  border: 1.5px solid #dccfa6;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 14px rgba(31, 61, 46, 0.06);
  animation: ${fadeIn} 0.3s ease;
`;

export const FarmerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1.5px solid #eedfae;
  margin-bottom: 16px;
`;

export const FarmerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const FarmerAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #1f3d2e;
  color: #f1e9d2;
  font-family: "Fraunces", serif;
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FarmerNameText = styled.h3`
  font-family: "Fraunces", serif;
  font-size: 1.35rem;
  color: #1f3d2e;
  margin: 0 0 2px;
`;

export const MetaBadge = styled.span`
  background: #c6981f;
  color: #1a1000;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 5px;
  margin-left: 8px;
`;

export const CropsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  margin-top: 12px;
`;

export const CropCard = styled.div`
  background: #fdfbf3;
  border: 1px solid #e5d8b8;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CategoryPill = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
  background: ${(p) =>
    p.$cat === "Grains"
      ? "#fff3d0"
      : p.$cat === "Vegetables"
      ? "#e6f7e8"
      : "#fbeaea"};
  color: ${(p) =>
    p.$cat === "Grains"
      ? "#9e6f00"
      : p.$cat === "Vegetables"
      ? "#217828"
      : "#b82626"};
`;

export const DeleteCropButton = styled.button`
  background: transparent;
  border: none;
  color: #c0392b;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 0.78rem;
  font-weight: 600;

  &:hover {
    background: #fbeaea;
  }
`;
