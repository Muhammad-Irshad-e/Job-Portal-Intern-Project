const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

const applicationSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  cv: { type: String, required: true },
  jobId: { type: String, required: true }, 
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Add this
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = { Application, upload };
