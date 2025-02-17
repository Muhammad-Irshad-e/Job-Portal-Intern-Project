const express = require("express");
const router = express.Router();

const { Application } = require("../models/user");
const Job = require("../models/job")
// Get applications by userId

router.get("/user-applications/:userId", async (req, res) => {
  try {
      const userId = req.params.userId;

      const applications = await Application.find({ userId: userId });

      const applicationsWithJobDetails = await Promise.all(
          applications.map(async (application) => {
              try {
                  const job = await Job.findById(application.jobId); // Fetch the specific job

                  return {
                      ...application.toObject(),
                      job: job ? job.toObject() : null, // Include job details
                  };
              } catch (innerError) {
                  console.error("Error fetching job for application:", innerError);
                  return {
                      ...application.toObject(),
                      job: null, // Return application without job details if error
                  };
              }
          })
      );

      res.json(applicationsWithJobDetails); // Send combined data

  } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;


//setting this up