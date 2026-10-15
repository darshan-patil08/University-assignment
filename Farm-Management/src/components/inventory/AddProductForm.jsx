import { useState } from "react";
import * as z from "zod";
import { Plus, ChevronDown } from "lucide-react";
import {
  AddSection,
  ToggleBtn,
  FormCard,
  FormTitle,
  FormGrid,
  Field,
  Label,
  Input,
  Select,
  Textarea,
  CheckRow,
  FullWidth,
  SubmitBtn,
  SuccessMsg,
  ErrorMsg,
} from "./inventoryStyles";

// ── Zod Schema: Single source of truth for form validation ──
const productSchema = z.object({
  farmerId: z.string().min(1, "Farmer ID is required"),
  productName: z.string().min(1, "Product name is required"),
  category: z.enum(["grain", "vegetable", "fruit"]),
  quantity: z.coerce
    .number()
    .refine((val) => !Number.isNaN(val) && val > 0, {
      message: "Quantity must be a positive number",
    }),
  unit: z.string().min(1, "Unit is required"),
  pricePerUnit: z.coerce
    .number()
    .refine((val) => !Number.isNaN(val) && val > 0, {
      message: "Price per unit must be greater than 0",
    }),
  harvestDate: z.string().min(1, "Harvest date is required"),
  storageConditions: z.string().optional(),
  organicCertification: z.boolean(),
  pesticideUse: z.string(),
  notes: z.string().optional(),
});

const EMPTY_FORM = {
  farmerId: "",
  productName: "",
  category: "grain",
  quantity: "",
  unit: "kg",
  pricePerUnit: "",
  harvestDate: "",
  storageConditions: "",
  organicCertification: false,
  pesticideUse: "None",
  notes: "",
};

const AddProductForm = ({ onAddProduct }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState([]);
  const [formSuccess, setFormSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (formErrors.length > 0) setFormErrors([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors([]);
    setFormSuccess("");

    const result = productSchema.safeParse(formData);

    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      setFormErrors(messages);
      return;
    }

    const newProduct = {
      id: Date.now(),
      ...result.data,
      storageConditions: result.data.storageConditions || "Not specified",
    };

    onAddProduct(newProduct);
    setFormData(EMPTY_FORM);
    setFormSuccess(`"${newProduct.productName}" added to inventory!`);
    setShowForm(false);
  };

  return (
    <AddSection>
      <ToggleBtn
        onClick={() => {
          setShowForm((v) => {
            if (!v) setFormSuccess("");
            return !v;
          });
          setFormErrors([]);
        }}
      >
        <Plus size={16} />
        {showForm ? "Close Form" : "Add New Product"}
        <ChevronDown
          size={14}
          className={showForm ? "rotate" : ""}
          style={{ transition: "transform 0.2s" }}
        />
      </ToggleBtn>

      {formSuccess && !showForm && (
        <SuccessMsg>✓ {formSuccess}</SuccessMsg>
      )}

      {showForm && (
        <FormCard>
          <FormTitle>Add New Farm Product</FormTitle>
          <form onSubmit={handleSubmit} noValidate>
            <FormGrid>
              <Field>
                <Label htmlFor="farmerId">Farmer ID *</Label>
                <Input
                  id="farmerId"
                  name="farmerId"
                  type="text"
                  placeholder="e.g. F001"
                  value={formData.farmerId}
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <Label htmlFor="productName">Product Name *</Label>
                <Input
                  id="productName"
                  name="productName"
                  type="text"
                  placeholder="e.g. Wheat"
                  value={formData.productName}
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <Label htmlFor="category">Category *</Label>
                <Select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="grain">Grain</option>
                  <option value="vegetable">Vegetable</option>
                  <option value="fruit">Fruit</option>
                </Select>
              </Field>

              <Field>
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  placeholder="e.g. 500"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <Label htmlFor="unit">Unit *</Label>
                <Input
                  id="unit"
                  name="unit"
                  type="text"
                  placeholder="e.g. kg, crates"
                  value={formData.unit}
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <Label htmlFor="pricePerUnit">Price / Unit (₹) *</Label>
                <Input
                  id="pricePerUnit"
                  name="pricePerUnit"
                  type="number"
                  placeholder="e.g. 20"
                  value={formData.pricePerUnit}
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <Label htmlFor="harvestDate">Harvest Date *</Label>
                <Input
                  id="harvestDate"
                  name="harvestDate"
                  type="date"
                  value={formData.harvestDate}
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <Label htmlFor="storageConditions">Storage Conditions</Label>
                <Select
                  id="storageConditions"
                  name="storageConditions"
                  value={formData.storageConditions}
                  onChange={handleChange}
                >
                  <option value="">Select…</option>
                  <option value="Dry, well-ventilated warehouse">Dry warehouse</option>
                  <option value="Cold storage (2-4°C)">Cold storage</option>
                  <option value="Ambient temperature">Ambient temp</option>
                  <option value="Airtight silos">Airtight silos</option>
                </Select>
              </Field>

              <Field>
                <Label htmlFor="pesticideUse">Pesticide Use</Label>
                <Select
                  id="pesticideUse"
                  name="pesticideUse"
                  value={formData.pesticideUse}
                  onChange={handleChange}
                >
                  <option value="None">None</option>
                  <option value="Organic certified">Organic certified</option>
                  <option value="Minimal IPM">Minimal IPM</option>
                  <option value="Standard">Standard</option>
                </Select>
              </Field>

              <Field style={{ justifyContent: "center" }}>
                <CheckRow>
                  <input
                    id="organicCertification"
                    name="organicCertification"
                    type="checkbox"
                    checked={formData.organicCertification}
                    onChange={handleChange}
                  />
                  <label htmlFor="organicCertification">Certified Organic</label>
                </CheckRow>
              </Field>

              <FullWidth>
                <Field>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any additional notes about this product…"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </Field>
              </FullWidth>
            </FormGrid>

            {formErrors.length > 0 && (
              <ErrorMsg>
                <strong>⚠ Please fix the following errors:</strong>
                <ul>
                  {formErrors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </ErrorMsg>
            )}

            <SubmitBtn type="submit">
              <Plus size={15} />
              Add to Inventory
            </SubmitBtn>
          </form>
        </FormCard>
      )}
    </AddSection>
  );
};

export default AddProductForm;
