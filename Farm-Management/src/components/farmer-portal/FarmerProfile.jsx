import { useState } from "react";
import { useFarmer } from "../../context/FarmerContext";
import { Phone, MapPin, Mail, Sparkles, Edit3, Check, X } from "lucide-react";
import {
  ProfileCard,
  ProfileHeader,
  ProfileIdentity,
  Avatar,
  FarmerName,
  FarmerIdBadge,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  ButtonSecondary,
  ButtonPrimary,
  FormBox,
  FormRow,
  FormGroup,
  FormLabel,
  FormInput,
} from "./portalStyles";

const FarmerProfile = () => {
  // Consuming context values and updater function
  const { farmer, updateFarmerProfile } = useFarmer();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    contact: farmer.contact,
    farmLocation: farmer.farmLocation,
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateFarmerProfile(editData);
    setIsEditing(false);
  };

  return (
    <ProfileCard>
      <ProfileHeader>
        <ProfileIdentity>
          <Avatar>{farmer.name.charAt(0)}</Avatar>
          <div>
            <FarmerName>{farmer.name}</FarmerName>
            <FarmerIdBadge>{farmer.farmerId}</FarmerIdBadge>
          </div>
        </ProfileIdentity>

        {/* Intermediate Optional: Edit Contact/Location */}
        <ButtonSecondary onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? <X size={15} /> : <Edit3 size={15} />}
          {isEditing ? "Cancel" : "Edit Profile"}
        </ButtonSecondary>
      </ProfileHeader>

      {/* Profile Details Grid */}
      <InfoGrid>
        <InfoItem>
          <InfoLabel>Contact Number</InfoLabel>
          <InfoValue>
            <Phone size={15} color="#2d7a3a" /> {farmer.contact}
          </InfoValue>
        </InfoItem>

        <InfoItem>
          <InfoLabel>Email Address</InfoLabel>
          <InfoValue>
            <Mail size={15} color="#c6981f" /> {farmer.email}
          </InfoValue>
        </InfoItem>

        <InfoItem>
          <InfoLabel>Farm Location</InfoLabel>
          <InfoValue>
            <MapPin size={15} color="#c0392b" /> {farmer.farmLocation}
          </InfoValue>
        </InfoItem>

        <InfoItem>
          <InfoLabel>Farm Land Size</InfoLabel>
          <InfoValue>
            <Sparkles size={15} color="#1f3d2e" /> {farmer.farmSize}
          </InfoValue>
        </InfoItem>
      </InfoGrid>

      {/* Intermediate Level Optional Form: Update personal information */}
      {isEditing && (
        <FormBox as="form" onSubmit={handleSaveProfile} style={{ marginTop: "1.5rem" }}>
          <h4 style={{ margin: "0 0 14px", color: "#1f3d2e", fontFamily: "Fraunces, serif" }}>
            Update Farmer Information
          </h4>
          <FormRow>
            <FormGroup>
              <FormLabel>Contact Number</FormLabel>
              <FormInput
                name="contact"
                value={editData.contact}
                onChange={handleEditChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Farm Location</FormLabel>
              <FormInput
                name="farmLocation"
                value={editData.farmLocation}
                onChange={handleEditChange}
                required
              />
            </FormGroup>
          </FormRow>
          <ButtonPrimary type="submit">
            <Check size={15} /> Save Changes
          </ButtonPrimary>
        </FormBox>
      )}
    </ProfileCard>
  );
};

export default FarmerProfile;
