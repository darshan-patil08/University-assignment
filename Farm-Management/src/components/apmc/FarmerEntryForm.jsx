import { useState } from "react";
import * as z from "zod";
import { UserPlus, AlertTriangle } from "lucide-react";
import {
  FormCard,
  FormTitle,
  FormGroup,
  FormRow,
  Label,
  Input,
  SubmitButton,
  ErrorAlert,
  SuccessAlert,
} from "./apmcStyles";

const API_BASE = "http://localhost:5000/farmers";

// Validation schema for Farmer Entry
const farmerSchema = z.object({
  name: z.string().trim().min(2, "Farmer name must be at least 2 characters"),
  phone: z.string().trim().regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  email: z.string().trim().email("Please enter a valid email address"),
  farmLocation: z.string().trim().min(2, "Farm location is required"),
});

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
  farmLocation: "",
};

const FarmerEntryForm = ({ onFarmerAdded }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
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
    const validationResult = farmerSchema.safeParse(formData);
    if (!validationResult.success) {
      setErrors(validationResult.error.issues.map((i) => i.message));
      return;
    }

    setSubmitting(true);
    try {
      // 2. Consume API using fetch() POST
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          contact: { phone: formData.phone, email: formData.email },
          farmLocation: formData.farmLocation,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add farmer");

      // 3. State update in real-time
      onFarmerAdded(data.farmer);
      setFormData(INITIAL_FORM);
      setSuccessMsg(`Farmer "${data.farmer.name}" registered successfully!`);
    } catch (err) {
      setErrors([err.message]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormCard>
      <FormTitle>
        <UserPlus size={20} color="#1f3d2e" /> Form 1: Farmer Registration
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
        <FormGroup>
          <Label htmlFor="farmerName">Full Name *</Label>
          <Input
            id="farmerName"
            name="name"
            placeholder="e.g. Baldev Singh"
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>

        <FormRow>
          <FormGroup>
            <Label htmlFor="phone">Phone Number (10 digits) *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="e.g. 9876543210"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. baldev@farmwise.in"
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label htmlFor="farmLocation">Farm Location / District *</Label>
          <Input
            id="farmLocation"
            name="farmLocation"
            placeholder="e.g. Mehsana, Gujarat"
            value={formData.farmLocation}
            onChange={handleChange}
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={submitting}>
          <UserPlus size={16} />
          {submitting ? "Registering Farmer…" : "Register Farmer"}
        </SubmitButton>
      </form>
    </FormCard>
  );
};

export default FarmerEntryForm;
