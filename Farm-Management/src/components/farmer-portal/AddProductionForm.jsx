import { useState } from "react";
import { useFarmer } from "../../context/FarmerContext";
import * as z from "zod";
import { Plus, ChevronDown } from "lucide-react";
import {
  ButtonPrimary,
  FormBox,
  FormRow,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  ErrorList,
} from "./portalStyles";

// Zod Schema for production item
const productionSchema = z.object({
  productName: z.string().trim().min(1, "Product name is required"),
  category: z.enum(["grain", "vegetable", "fruit"]),
  quantity: z.coerce.number().positive("Quantity must be a positive number"),
  unit: z.string().trim().min(1, "Unit is required"),
  pricePerUnit: z.coerce.number().positive("Price must be greater than 0"),
  harvestDate: z.string().min(1, "Harvest date is required"),
  organicCertification: z.boolean(),
});

const EMPTY_FORM = {
  productName: "",
  category: "grain",
  quantity: "",
  unit: "kg",
  pricePerUnit: "",
  harvestDate: "",
  organicCertification: false,
};

const AddProductionForm = () => {
  // D) Consuming context to update products list
  const { addProduct } = useFarmer();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors.length > 0) setErrors([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const result = productionSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.issues.map((i) => i.message));
      return;
    }

    // Update Context State
    addProduct(result.data);
    setFormData(EMPTY_FORM);
    setIsOpen(false);
  };

  return (
    <div style={{ marginTop: "2rem", borderTop: "2px solid #dccfa6", paddingTop: "1.8rem" }}>
      <ButtonPrimary onClick={() => setIsOpen(!isOpen)}>
        <Plus size={16} />
        {isOpen ? "Close Form" : "Add New Production Details"}
        <ChevronDown
          size={14}
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
          }}
        />
      </ButtonPrimary>

      {isOpen && (
        <FormBox as="form" onSubmit={handleSubmit} noValidate>
          <h4 style={{ margin: "0 0 16px", color: "#1f3d2e", fontFamily: "Fraunces, serif", fontSize: "1.2rem" }}>
            New Farm Production Entry
          </h4>

          {errors.length > 0 && (
            <ErrorList>
              <strong>⚠ Please correct the following errors:</strong>
              <ul>
                {errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </ErrorList>
          )}

          <FormRow>
            <FormGroup>
              <FormLabel>Product Name *</FormLabel>
              <FormInput
                name="productName"
                placeholder="e.g. Basmati Rice"
                value={formData.productName}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Category *</FormLabel>
              <FormSelect
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="grain">Grain</option>
                <option value="vegetable">Vegetable</option>
                <option value="fruit">Fruit</option>
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel>Quantity *</FormLabel>
              <FormInput
                name="quantity"
                type="number"
                placeholder="e.g. 500"
                value={formData.quantity}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <FormLabel>Unit *</FormLabel>
              <FormInput
                name="unit"
                placeholder="e.g. kg, crates"
                value={formData.unit}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Price / Unit (₹) *</FormLabel>
              <FormInput
                name="pricePerUnit"
                type="number"
                placeholder="e.g. 45"
                value={formData.pricePerUnit}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Harvest Date *</FormLabel>
              <FormInput
                name="harvestDate"
                type="date"
                value={formData.harvestDate}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0 16px" }}>
            <input
              id="organicCertification"
              name="organicCertification"
              type="checkbox"
              checked={formData.organicCertification}
              onChange={handleChange}
              style={{ width: "16px", height: "16px", accentColor: "#1f3d2e", cursor: "pointer" }}
            />
            <label htmlFor="organicCertification" style={{ fontSize: "0.9rem", color: "#3a2e1e", cursor: "pointer" }}>
              Certified Organic Product
            </label>
          </div>

          <ButtonPrimary type="submit">
            <Plus size={15} /> Add Production to Context
          </ButtonPrimary>
        </FormBox>
      )}
    </div>
  );
};

export default AddProductionForm;
