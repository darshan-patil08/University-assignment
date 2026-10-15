import express from "express";
import cors from "cors";
import farmerRoutes from "./routes/farmerRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Root info
app.get("/", (req, res) => {
  res.json({
    message: "APMC Market Farmer Management RESTful API",
    practical: "Practical No. 7 - CS7034",
    endpoints: {
      "POST /farmers": "Add a new farmer",
      "GET /farmers": "List all farmers & crops",
      "GET /farmers/:farmerId": "Get specific farmer",
      "POST /farmers/:farmerId/crops": "Add crop to farmer",
      "DELETE /farmers/:farmerId/crops/:cropId": "Remove crop from farmer",
      "DELETE /farmers/:farmerId": "Delete farmer & crops",
    },
  });
});

// Routes
app.use("/farmers", farmerRoutes);

// 404 and Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Practical 7 Express API running at http://localhost:${PORT}`);
});

export default app;
