import styled, { keyframes } from "styled-components";
import { Loader2 } from "lucide-react";

/* ── Animations ──────────────────────────────────────── */
export const spin = keyframes`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`;
export const fadeIn = keyframes`from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); }`;
export const slideDown = keyframes`from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 1200px; }`;

/* ── Page Layout ─────────────────────────────────────── */
export const PageWrapper = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
`;

export const PageHeader = styled.div`
  margin-bottom: 2.5rem;
`;

export const PageTitle = styled.h1`
  font-family: "Fraunces", serif;
  font-size: 2.6rem;
  font-weight: 600;
  color: #1f3d2e;
  margin: 0 0 4px;

  span {
    color: #c6981f;
  }
`;

export const PageSubtitle = styled.p`
  font-family: "Work Sans", sans-serif;
  font-size: 0.95rem;
  color: #6b5635;
  margin: 0;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const StatsRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

export const StatChip = styled.div`
  font-family: "Work Sans", sans-serif;
  background: ${(p) => p.$bg || "#f1e9d2"};
  border: 1px solid ${(p) => p.$border || "#dccfa6"};
  border-radius: 10px;
  padding: 10px 18px;
  font-size: 0.85rem;
  color: #2c1f10;

  strong {
    display: block;
    font-family: "Fraunces", serif;
    font-size: 1.4rem;
    color: ${(p) => p.$accent || "#1f3d2e"};
  }
`;

/* ── Loading / Error States ──────────────────────────── */
export const CenterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  gap: 12px;
  font-family: "Work Sans", sans-serif;
  color: #6b5635;
  font-size: 1rem;
`;

export const SpinIcon = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
  color: #1f3d2e;
`;

export const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fdf0ec;
  border: 1px solid #e8b4a0;
  border-radius: 10px;
  padding: 14px 18px;
  font-family: "Work Sans", sans-serif;
  font-size: 0.9rem;
  color: #8c3a26;
  margin-bottom: 1.5rem;
`;

/* ── Product Grid ────────────────────────────────────── */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 1.5rem;
  animation: ${fadeIn} 0.4s ease;
`;

/* ── Add Product Section ─────────────────────────────── */
export const AddSection = styled.div`
  margin-top: 3rem;
  border-top: 2px solid #dccfa6;
  padding-top: 2rem;
`;

export const ToggleBtn = styled.button`
  display: flex;
  align-items: center;
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

  &:hover {
    background: #2d5940;
    transform: translateY(-1px);
  }

  svg.rotate {
    transform: rotate(180deg);
  }
`;

export const FormCard = styled.div`
  background: #f1e9d2;
  border: 1px solid #dccfa6;
  border-radius: 16px;
  padding: 28px 32px;
  margin-top: 1.5rem;
  animation: ${slideDown} 0.3s ease;
  overflow: hidden;
`;

export const FormTitle = styled.h2`
  font-family: "Fraunces", serif;
  font-size: 1.4rem;
  color: #1f3d2e;
  margin: 0 0 22px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.1rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-family: "Work Sans", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #5a4225;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const inputBase = `
  font-family: "Work Sans", sans-serif;
  font-size: 0.9rem;
  color: #2c1f10;
  background: #fffdf5;
  border: 1.5px solid #dccfa6;
  border-radius: 8px;
  padding: 9px 12px;
  outline: none;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:focus {
    border-color: #1f3d2e;
    box-shadow: 0 0 0 3px rgba(31, 61, 46, 0.1);
  }
`;

export const Input = styled.input`
  ${inputBase}
`;

export const Select = styled.select`
  ${inputBase}
  cursor: pointer;
  appearance: none;
`;

export const Textarea = styled.textarea`
  ${inputBase}
  resize: vertical;
  min-height: 80px;
`;

export const CheckRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0 4px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #1f3d2e;
    cursor: pointer;
  }

  label {
    font-family: "Work Sans", sans-serif;
    font-size: 0.88rem;
    color: #3a2e1e;
    cursor: pointer;
  }
`;

export const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

export const SubmitBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #c6981f;
  color: #1a1000;
  border: none;
  padding: 11px 28px;
  border-radius: 999px;
  font-family: "Work Sans", sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.18s ease;
  margin-top: 18px;

  &:hover {
    background: #d9a81c;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SuccessMsg = styled.p`
  font-family: "Work Sans", sans-serif;
  font-size: 0.88rem;
  color: #2d7a3a;
  background: #eaf7ec;
  border: 1px solid #aad8b0;
  border-radius: 8px;
  padding: 10px 14px;
  margin-top: 12px;
`;

export const ErrorMsg = styled.div`
  font-family: "Work Sans", sans-serif;
  font-size: 0.88rem;
  color: #8c3a26;
  background: #fdf0ec;
  border: 1px solid #e8b4a0;
  border-radius: 8px;
  padding: 10px 14px;
  margin-top: 12px;

  strong {
    display: block;
    margin-bottom: 4px;
  }

  ul {
    margin: 0;
    padding-left: 18px;
  }

  li {
    margin-bottom: 2px;
  }
`;
