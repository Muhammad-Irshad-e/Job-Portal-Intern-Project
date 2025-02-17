const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  company: {
    logo: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('job', JobSchema);

