import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "../data/farmers.json");

// Helper: Read farmers JSON file
const readFarmersData = async () => {
  const content = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(content);
};

// Helper: Write farmers JSON file
const writeFarmersData = async (data) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
};

// Allowed categories for crops
const ALLOWED_CATEGORIES = ["Grains", "Vegetables", "Fruits"];

// ── 1. POST /farmers : Add a New Farmer ─────────────────────
router.post("/", async (req, res, next) => {
  try {
    const { name, contact, farmLocation } = req.body;

    // Validation: name, phone, email are required
    if (!name || !name.trim()) {
      res.status(400);
      throw new Error("Validation Error: Farmer name is required.");
    }
    if (!contact || !contact.phone || !contact.phone.trim()) {
      res.status(400);
      throw new Error("Validation Error: Phone number is required.");
    }
    if (!contact.email || !contact.email.trim()) {
      res.status(400);
      throw new Error("Validation Error: Email address is required.");
    }

    const data = await readFarmersData();

    // Auto-generate farmerId if not provided
    const newFarmerId =
      req.body.farmerId ||
      (data.farmers.length > 0
        ? Math.max(...data.farmers.map((f) => Number(f.farmerId))) + 1
        : 1);

    // Create new farmer object with empty crop list
    const newFarmer = {
      farmerId: Number(newFarmerId),
      name: name.trim(),
      contact: {
        phone: contact.phone.trim(),
        email: contact.email.trim(),
      },
      farmLocation: farmLocation ? farmLocation.trim() : "Not specified",
      producedCrops: [], // Initial empty crop list as required
    };

    data.farmers.push(newFarmer);
    await writeFarmersData(data);

    res.status(201).json({
      success: true,
      message: "Farmer added successfully.",
      farmer: newFarmer,
    });
  } catch (error) {
    next(error);
  }
});

// ── 2. GET /farmers : List All Farmers and Their Crops ────────
router.get("/", async (req, res, next) => {
  try {
    const data = await readFarmersData();
    res.status(200).json({
      success: true,
      count: data.farmers.length,
      farmers: data.farmers,
    });
  } catch (error) {
    next(error);
  }
});

// ── 3. GET /farmers/:farmerId : Retrieve Specific Farmer ───────
router.get("/:farmerId", async (req, res, next) => {
  try {
    const { farmerId } = req.params;
    const data = await readFarmersData();

    const farmer = data.farmers.find((f) => String(f.farmerId) === String(farmerId));

    if (!farmer) {
      res.status(404);
      throw new Error(`Farmer with ID ${farmerId} does not exist.`);
    }

    res.status(200).json({
      success: true,
      farmer,
    });
  } catch (error) {
    next(error);
  }
});

// ── 4. POST /farmers/:farmerId/crops : Enter Farmer Wise Crops ─
router.post("/:farmerId/crops", async (req, res, next) => {
  try {
    const { farmerId } = req.params;
    const { cropName, category, quantity, unit, pricePerUnit, harvestSeason } = req.body;

    // Field Validations
    if (!cropName || !cropName.trim()) {
      res.status(400);
      throw new Error("Validation Error: Crop name is required.");
    }
    if (!quantity || Number(quantity) <= 0) {
      res.status(400);
      throw new Error("Validation Error: Quantity must be a positive number.");
    }
    if (!pricePerUnit || Number(pricePerUnit) <= 0) {
      res.status(400);
      throw new Error("Validation Error: Price per unit must be greater than 0.");
    }

    // Category Validation: Must be Grains, Vegetables, or Fruits
    const matchedCategory = ALLOWED_CATEGORIES.find(
      (cat) => cat.toLowerCase() === (category || "").trim().toLowerCase()
    );
    if (!matchedCategory) {
      res.status(400);
      throw new Error(
        `Validation Error: Category must be one of: ${ALLOWED_CATEGORIES.join(", ")}.`
      );
    }

    const data = await readFarmersData();
    const farmerIndex = data.farmers.findIndex((f) => String(f.farmerId) === String(farmerId));

    if (farmerIndex === -1) {
      res.status(404);
      throw new Error(`Farmer with ID ${farmerId} does not exist.`);
    }

    // Auto-generate cropId
    const existingCrops = data.farmers[farmerIndex].producedCrops || [];
    const newCropId =
      req.body.cropId ||
      (existingCrops.length > 0
        ? Math.max(...existingCrops.map((c) => Number(c.cropId))) + 1
        : Number(farmerId) * 100 + 1);

    const newCrop = {
      cropId: Number(newCropId),
      cropName: cropName.trim(),
      category: matchedCategory,
      quantity: Number(quantity),
      unit: unit ? unit.trim() : "kg",
      pricePerUnit: Number(pricePerUnit),
      ...(harvestSeason && { harvestSeason: harvestSeason.trim() }),
    };

    data.farmers[farmerIndex].producedCrops.push(newCrop);
    await writeFarmersData(data);

    res.status(201).json({
      success: true,
      message: "Crop added to farmer successfully.",
      farmer: data.farmers[farmerIndex],
    });
  } catch (error) {
    next(error);
  }
});

// ── 5. DELETE /farmers/:farmerId/crops/:cropId : Remove a Crop ──
router.delete("/:farmerId/crops/:cropId", async (req, res, next) => {
  try {
    const { farmerId, cropId } = req.params;
    const data = await readFarmersData();

    const farmer = data.farmers.find((f) => String(f.farmerId) === String(farmerId));
    if (!farmer) {
      res.status(404);
      throw new Error(`Farmer with ID ${farmerId} does not exist.`);
    }

    const cropIndex = farmer.producedCrops.findIndex(
      (c) => String(c.cropId) === String(cropId)
    );
    if (cropIndex === -1) {
      res.status(404);
      throw new Error(`Crop with ID ${cropId} not found for Farmer ${farmerId}.`);
    }

    const removedCrop = farmer.producedCrops.splice(cropIndex, 1)[0];
    await writeFarmersData(data);

    res.status(200).json({
      success: true,
      message: `Crop "${removedCrop.cropName}" removed from Farmer ${farmer.name} successfully.`,
      farmer,
    });
  } catch (error) {
    next(error);
  }
});

// ── 6. DELETE /farmers/:farmerId : Delete a Farmer ─────────────
router.delete("/:farmerId", async (req, res, next) => {
  try {
    const { farmerId } = req.params;
    const data = await readFarmersData();

    const farmerIndex = data.farmers.findIndex((f) => String(f.farmerId) === String(farmerId));
    if (farmerIndex === -1) {
      res.status(404);
      throw new Error(`Farmer with ID ${farmerId} does not exist.`);
    }

    const removedFarmer = data.farmers.splice(farmerIndex, 1)[0];
    await writeFarmersData(data);

    res.status(200).json({
      success: true,
      message: `Farmer "${removedFarmer.name}" and all assigned crops deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
