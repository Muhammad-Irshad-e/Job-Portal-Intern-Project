const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser"); // Import body-parser

const { Application } = require("../models/user");
router.use(bodyParser.json());

// Get all applications
router.get("/get-applications", async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update application status


// Your routes
router.put("/update-status/:id", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Check if the body is being parsed
    console.log("Request Params:", req.params);

    const { id } = req.params;
    const { status } = req.body; // Destructure status from the parsed body

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    console.log("Updating application with ID:", id, "to status:", status);

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    console.log("Updated Application:", updatedApplication);

    if (!updatedApplication) {
      console.log("Application NOT FOUND with ID:", id);
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(updatedApplication);
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Start the server

module.exports = router;
