import { useState, useEffect } from "react";
import FarmerEntryForm from "../components/apmc/FarmerEntryForm";
import CropEntryForm from "../components/apmc/CropEntryForm";
import FarmerCropsList from "../components/apmc/FarmerCropsList";
import {
  Container,
  PageHeader,
  Title,
  Subtitle,
  TwoColumnLayout,
} from "../components/apmc/apmcStyles";

const API_URL = "http://localhost:5000/farmers";

const APMCMarketPage = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Consumption of API using fetch() (Evaluation Parameter 1)
  useEffect(() => {
    let active = true;

    const loadFarmers = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (active) {
          setFarmers(data.farmers || []);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Could not connect to APMC Market API");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadFarmers();

    return () => {
      active = false;
    };
  }, []);

  // 5. State management for real-time updates
  const handleFarmerAdded = (newFarmer) => {
    setFarmers((prev) => [...prev, newFarmer]);
  };

  const handleCropAdded = (farmerId, updatedFarmer) => {
    setFarmers((prev) =>
      prev.map((f) => (String(f.farmerId) === String(farmerId) ? updatedFarmer : f))
    );
  };

  const handleCropDeleted = (farmerId, cropId) => {
    setFarmers((prev) =>
      prev.map((f) => {
        if (String(f.farmerId) === String(farmerId)) {
          return {
            ...f,
            producedCrops: f.producedCrops.filter(
              (c) => String(c.cropId) !== String(cropId)
            ),
          };
        }
        return f;
      })
    );
  };

  const handleFarmerDeleted = (farmerId) => {
    setFarmers((prev) => prev.filter((f) => String(f.farmerId) !== String(farmerId)));
  };

  return (
    <Container>
      <PageHeader>
        <Title>
          APMC <span>Market Portal</span>
        </Title>
        <Subtitle>
          Practical 8 · Full Stack API Consumption using fetch() with Dynamic Controlled Forms
        </Subtitle>
      </PageHeader>

      {/* Loading & Error States */}
      {loading && (
        <p style={{ textAlign: "center", color: "#1f3d2e", fontSize: "1.1rem", padding: "30px 0" }}>
          Connecting to APMC Express API and fetching farmers…
        </p>
      )}

      {error && (
        <div style={{ background: "#fdf0ec", border: "1px solid #e8b4a0", padding: "14px 18px", borderRadius: "10px", color: "#8c3a26", marginBottom: "1.5rem" }}>
          <strong>Error connecting to server:</strong> {error}. Ensure backend is running (`npm run server`).
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Two Forms Section (Evaluation Parameter 2 & 3) */}
          <TwoColumnLayout>
            <FarmerEntryForm onFarmerAdded={handleFarmerAdded} />
            <CropEntryForm farmers={farmers} onCropAdded={handleCropAdded} />
          </TwoColumnLayout>

          {/* Formatted Farmer-wise Crops Display (Evaluation Parameter 4) */}
          <FarmerCropsList
            farmers={farmers}
            onCropDeleted={handleCropDeleted}
            onFarmerDeleted={handleFarmerDeleted}
          />
        </>
      )}
    </Container>
  );
};

export default APMCMarketPage;
