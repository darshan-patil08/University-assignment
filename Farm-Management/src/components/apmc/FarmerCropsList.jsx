import { Phone, Mail, MapPin, Trash2, Sprout, Calendar, Package } from "lucide-react";
import {
  FarmerBlock,
  FarmerHeader,
  FarmerInfo,
  FarmerAvatar,
  FarmerNameText,
  MetaBadge,
  CropsGrid,
  CropCard,
  CategoryPill,
  DeleteCropButton,
} from "./apmcStyles";

const FarmerCropsList = ({ farmers, onCropDeleted, onFarmerDeleted }) => {
  const handleDeleteCrop = async (farmerId, cropId) => {
    if (!window.confirm("Are you sure you want to remove this crop?")) return;
    try {
      const res = await fetch(
        `http://localhost:5000/farmers/${farmerId}/crops/${cropId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        onCropDeleted(farmerId, cropId);
      }
    } catch (err) {
      console.error("Failed to delete crop:", err);
    }
  };

  const handleDeleteFarmer = async (farmerId, farmerName) => {
    if (!window.confirm(`Delete farmer "${farmerName}" and all associated crops?`)) return;
    try {
      const res = await fetch(`http://localhost:5000/farmers/${farmerId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onFarmerDeleted(farmerId);
      }
    } catch (err) {
      console.error("Failed to delete farmer:", err);
    }
  };

  if (!farmers || farmers.length === 0) {
    return (
      <p style={{ color: "#7a6344", fontStyle: "italic", textAlign: "center", padding: "40px 0" }}>
        No farmers registered yet. Use Form 1 above to register a farmer.
      </p>
    );
  }

  return (
    <section>
      <h2 style={{ fontFamily: "Fraunces, serif", color: "#1f3d2e", fontSize: "1.7rem", margin: "0 0 1.2rem" }}>
        APMC Registered Farmers & Produced Crops ({farmers.length})
      </h2>

      {farmers.map((farmer) => (
        <FarmerBlock key={farmer.farmerId}>
          <FarmerHeader>
            <FarmerInfo>
              <FarmerAvatar>{farmer.name.charAt(0)}</FarmerAvatar>
              <div>
                <FarmerNameText>
                  {farmer.name}
                  <MetaBadge>Farmer ID: {farmer.farmerId}</MetaBadge>
                </FarmerNameText>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", fontSize: "0.85rem", color: "#6b5635", marginTop: "4px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <Phone size={13} color="#2d7a3a" /> {farmer.contact?.phone}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <Mail size={13} color="#c6981f" /> {farmer.contact?.email}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={13} color="#c0392b" /> {farmer.farmLocation}
                  </span>
                </div>
              </div>
            </FarmerInfo>

            <button
              onClick={() => handleDeleteFarmer(farmer.farmerId, farmer.name)}
              style={{
                background: "#fdf0ec",
                border: "1px solid #f1b5a5",
                color: "#c0392b",
                borderRadius: "8px",
                padding: "6px 12px",
                fontSize: "0.8rem",
                fontWeight: "600",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
            >
              <Trash2 size={13} /> Delete Farmer
            </button>
          </FarmerHeader>

          <div>
            <h4 style={{ margin: "0 0 10px", fontSize: "0.95rem", color: "#1f3d2e", display: "flex", alignItems: "center", gap: "6px" }}>
              <Sprout size={16} color="#2d7a3a" />
              Produced Crops ({farmer.producedCrops?.length || 0})
            </h4>

            {farmer.producedCrops?.length === 0 ? (
              <p style={{ fontSize: "0.88rem", color: "#8a7558", fontStyle: "italic" }}>
                No crops assigned to this farmer yet. Use Form 2 above to assign crops.
              </p>
            ) : (
              <CropsGrid>
                {farmer.producedCrops.map((crop) => (
                  <CropCard key={crop.cropId}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                        <div>
                          <strong style={{ fontSize: "1.05rem", color: "#1f3d2e" }}>
                            {crop.cropName}
                          </strong>
                          <div style={{ marginTop: "4px" }}>
                            <CategoryPill $cat={crop.category}>{crop.category}</CategoryPill>
                          </div>
                        </div>

                        <DeleteCropButton
                          onClick={() => handleDeleteCrop(farmer.farmerId, crop.cropId)}
                          title="Remove crop"
                        >
                          <Trash2 size={12} /> Remove
                        </DeleteCropButton>
                      </div>

                      <div style={{ fontSize: "0.84rem", color: "#5a452a", marginTop: "10px", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <Package size={13} color="#6b5635" />
                          Quantity: {crop.quantity} {crop.unit}
                        </span>

                        {crop.harvestSeason && (
                          <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#9e6f00" }}>
                            <Calendar size={13} />
                            Harvest: {crop.harvestSeason}
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ marginTop: "12px", paddingTop: "8px", borderTop: "1px dashed #e5d8b8", display: "flex", justifyContent: "space-between", fontSize: "0.88rem" }}>
                      <span>Price / {crop.unit}:</span>
                      <strong style={{ color: "#1f3d2e" }}>₹{crop.pricePerUnit}</strong>
                    </div>
                  </CropCard>
                ))}
              </CropsGrid>
            )}
          </div>
        </FarmerBlock>
      ))}
    </section>
  );
};

export default FarmerCropsList;
