const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const { Application, upload } = require('./models/user');
const path = require('path');
const { clerkClient, clerkMiddleware, getAuth,requireAuth  }= require ('@clerk/express')
require('dotenv').config();
var jModel =require('./models/job') 
const applicationRoutes = require("./routes/application");
const viewapplications = require('./routes/viewapplication')
const app = express();


app.use(cors());
app.use(clerkMiddleware())
app.use( applicationRoutes);
app.use(viewapplications);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.post('/apply-job', upload.single('cv'), async (req, res) => {  // Add Clerk middleware
    try {

      const { userId, firstName, lastName, email, jobId, jobTitle, companyName } = req.body;
  
      if (!req.file) { // Check if a file was uploaded
        return res.status(400).json({ error: 'No CV file uploaded' });
      }
      const cvFilePath = req.file.path;
  
      const newApplication = new Application({
        userId,
        firstName,
        lastName,
        email,
        cv: cvFilePath,
        jobId,
        jobTitle,
        companyName,
      });
  
      await newApplication.save(); // Save the application to the database
      console.log(userId)
      res.status(201).json({ message: 'Application submitted successfully' }); // 201 Created
  
    } catch (error) {
      console.error("Error submitting application:", error);
      res.status(500).json({ error: 'Internal server error' }); // More specific error
    }
  });
app.get('/get-applications', async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching applications', error: err });
  }
});

app.post('/add', async (req, res) => {
    try {
        await jModel(req.body).save()
        res.send({ message: "data added" })
    } catch (error) {
        console.log(error)
    }
  }
  )

app.get('/view', async (req, res) => {
try {
    var val = await jModel.find()

    res.send(val)

} catch (error) {
    console.log(error)

}
})
app.delete('/delete/:id', async (req, res) => {
    try {
        await jModel.findByIdAndDelete(req.params.id)
        console.log(req.params.id)
  
        res.send({message: 'Data Deleted successfully'})
  
    } catch (error) {
        console.log(error)
  
    }
  })
  app.put("/edit/:id", async (req, res) => {
    try {
      var data = await jModel.findByIdAndUpdate(req.params.id, req.body);
      res.send({message:'updated successfully',data})
    } catch (error) {
      console.log(error)
    }
  });
mongoose.connect(process.env.MONGODB_URI )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
