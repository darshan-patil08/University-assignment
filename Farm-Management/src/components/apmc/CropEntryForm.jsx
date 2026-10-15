import { useState } from "react";
import * as z from "zod";
import { PlusCircle, Sparkles, AlertTriangle } from "lucide-react";
import {
  FormCard,
  FormTitle,
  FormGroup,
  FormRow,
  Label,
  Input,
  Select,
  DynamicNotice,
  SubmitButton,
  ErrorAlert,
  SuccessAlert,
} from "./apmcStyles";

// Validation Schema for Crop Entry
const cropSchema = z.object({
  farmerId: z.string().min(1, "Please select a farmer"),
  cropName: z.string().trim().min(2, "Crop name is required"),
  cropsCategory: z.enum(["Grains", "Vegetables", "Fruits"]),
  quantity: z.coerce.number().positive("Quantity must be a positive number"),
  unit: z.string().trim().min(1, "Unit is required"),
  pricePerUnit: z.coerce.number().positive("Price per unit must be greater than 0"),
  harvestSeason: z.string().optional(),
});

const INITIAL_CROP_FORM = {
  farmerId: "",
  cropName: "",
  cropsCategory: "Grains", // Default category to demonstrate dynamic fields
  quantity: "",
  unit: "kg",
  pricePerUnit: "",
  harvestSeason: "Winter",
};

const CropEntryForm = ({ farmers, onCropAdded }) => {
  const [formData, setFormData] = useState(INITIAL_CROP_FORM);
  const [errors, setErrors] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors.length > 0) setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMsg("");

    // 1. Validation
    const validationResult = cropSchema.safeParse(formData);
    if (!validationResult.success) {
      setErrors(validationResult.error.issues.map((i) => i.message));
      return;
    }

    setSubmitting(true);
    try {
      // 2. Consume API using fetch() POST /farmers/:farmerId/crops
      const payload = {
        cropName: formData.cropName,
        category: formData.cropsCategory,
        quantity: Number(formData.quantity),
        unit: formData.unit,
        pricePerUnit: Number(formData.pricePerUnit),
        // Only include harvestSeason if category is Grains
        ...(formData.cropsCategory === "Grains" && {
          harvestSeason: formData.harvestSeason,
        }),
      };

      const res = await fetch(
        `http://localhost:5000/farmers/${formData.farmerId}/crops`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add crop");

      // 3. Update state in real-time
      onCropAdded(formData.farmerId, data.farmer);
      setFormData((prev) => ({
        ...INITIAL_CROP_FORM,
        farmerId: prev.farmerId, // retain selected farmer for convenience
      }));
      setSuccessMsg(`Crop "${payload.cropName}" assigned to farmer successfully!`);
    } catch (err) {
      setErrors([err.message]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormCard>
      <FormTitle>
        <PlusCircle size={20} color="#1f3d2e" /> Form 2: Farmer-wise Crop Entry
      </FormTitle>

      {successMsg && <SuccessAlert>✓ {successMsg}</SuccessAlert>}

      {errors.length > 0 && (
        <ErrorAlert>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <AlertTriangle size={15} />
            <strong>Please correct the following:</strong>
          </div>
          <ul>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </ErrorAlert>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Dropdown for Farmer Selection */}
        <FormGroup>
          <Label htmlFor="selectFarmer">Select Farmer *</Label>
          <Select
            id="selectFarmer"
            name="farmerId"
            value={formData.farmerId}
            onChange={handleChange}
          >
            <option value="">-- Choose a Farmer --</option>
            {farmers.map((farmer) => (
              <option key={farmer.farmerId} value={farmer.farmerId}>
                {farmer.name} (ID: {farmer.farmerId}) — {farmer.farmLocation}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormRow>
          <FormGroup>
            <Label htmlFor="cropName">Crop Name *</Label>
            <Input
              id="cropName"
              name="cropName"
              placeholder="e.g. Basmati Rice"
              value={formData.cropName}
              onChange={handleChange}
            />
          </FormGroup>

          {/* Crop Category Dropdown */}
          <FormGroup>
            <Label htmlFor="cropsCategory">Crop Category *</Label>
            <Select
              id="cropsCategory"
              name="cropsCategory"
              value={formData.cropsCategory}
              onChange={handleChange}
            >
              <option value="Grains">Grains</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
            </Select>
          </FormGroup>
        </FormRow>

        {/* ── Practical 8 Requirement: DYNAMIC CONDITIONAL FIELD ──
            When formData.cropsCategory === "Grains", render Harvest Season.
            If "Vegetables" or "Fruits", do NOT render. */}
        {formData.cropsCategory === "Grains" ? (
          <DynamicNotice>
            <Sparkles size={14} />
            <span>Category is <strong>Grains</strong>: Harvest Season enabled</span>
          </DynamicNotice>
        ) : null}

        {formData.cropsCategory === "Grains" && (
          <FormGroup>
            <Label htmlFor="harvestSeason">Harvest Season (Grains Only) *</Label>
            <Select
              id="harvestSeason"
              name="harvestSeason"
              value={formData.harvestSeason}
              onChange={handleChange}
            >
              <option value="Winter">Winter (Rabi)</option>
              <option value="Monsoon">Monsoon (Kharif)</option>
              <option value="Summer">Summer (Zaid)</option>
            </Select>
          </FormGroup>
        )}

        <FormRow>
          <FormGroup>
            <Label htmlFor="quantity">Quantity *</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="e.g. 1000"
              value={formData.quantity}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="unit">Unit *</Label>
            <Input
              id="unit"
              name="unit"
              placeholder="e.g. kg, quintals, dozen"
              value={formData.unit}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label htmlFor="pricePerUnit">Price per Unit (₹) *</Label>
          <Input
            id="pricePerUnit"
            name="pricePerUnit"
            type="number"
            placeholder="e.g. 35"
            value={formData.pricePerUnit}
            onChange={handleChange}
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={submitting}>
          <PlusCircle size={16} />
          {submitting ? "Assigning Crop…" : "Assign Crop to Farmer"}
        </SubmitButton>
      </form>
    </FormCard>
  );
};

export default CropEntryForm;
