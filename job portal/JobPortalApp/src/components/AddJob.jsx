import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Button, Typography, Box, Grid, Paper, FormControl, InputLabel, Select, } from "@mui/material";
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";
const JobPostingForm = (props) => {
  const loc = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    type: "Full-Time",
    location: "",
    description: "",
    qualification: "",
    salary: "",
    company: {
      logo: "",
      name: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
  });


  
  // Initialize form data if we're in edit mode
  useEffect(() => {
    if (loc.state && loc.state.val) {
      const { title, type, location, description, qualification, salary, company } = loc.state.val;
      setFormData({
        title,
        type,
        location,
        description,
        qualification,
        salary,
        company
      });
    }
  }, [loc]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name.includes("company.")) {
        const key = name.split(".")[1]; // Extract "logo", "name", etc.
        return {
          ...prev,
          company: {
            ...prev.company,
            [key]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = loc.state ? `http://localhost:5000/edit/${loc.state.val._id}` : "http://localhost:5000/add";
    const method = loc.state ? axios.put : axios.post;

    try {
      const response = await method(apiUrl, formData);

      if (response.status === 200) {
        alert(loc.state ? "Job posting updated successfully!" : "Job posting created successfully!");
        navigate('/');
      } else {
        alert("Failed to save job posting");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving job posting");
    }
  };
  return (
    <Box maxWidth="800px" mx="auto" mt={2} mb={2} sx={{ boxShadow: 3}}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2,bgcolor: '#f4f4f4' }}>
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#1E3A8A' }} gutterBottom>
          Create New Job Posting
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Job Information */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: '#10B981' }} gutterBottom>
                Job Information
              </Typography>
              <TextField
                label="Job Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
              <TextField
  label="Job Type"
  name="type"
  value={formData.type}
  onChange={handleChange}
  variant="outlined"
  fullWidth
  margin="normal"
  sx={{ textAlign: "left" }} 
  select
 // Keeps label position clean
// Aligns text inside 
>
  <MenuItem value="Full-Time">Full-Time</MenuItem>
  <MenuItem value="Part-Time">Part-Time</MenuItem>
  <MenuItem value="Contract">Contract</MenuItem>
  <MenuItem value="Freelance">Freelance</MenuItem>
</TextField>

              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Salary Range"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Job Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                multiline
                rows={3}
                margin="normal"
              />
              <TextField
                label="Qualifications"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                multiline
                rows={3}
                margin="normal"
              />
            </Grid>

            {/* Company Information */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: '#10B981' }} gutterBottom>
                Company Information
              </Typography>
              <TextField
                label="Company Logo URL"
                name="company.logo"
                value={formData.company.logo}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Company Name"
                name="company.name"
                value={formData.company.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Company Description"
                name="company.description"
                value={formData.company.description}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                multiline
                rows={3}
                margin="normal"
              />
              <TextField
                label="Contact Email"
                name="company.contactEmail"
                value={formData.company.contactEmail}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                type="email"
                margin="normal"
              />
              <TextField
                label="Contact Phone"
                name="company.contactPhone"
                value={formData.company.contactPhone}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                type="tel"
                margin="normal"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            
            sx={{ marginTop: 3, padding: 1.5, fontSize: "1rem", fontWeight: "bold",bgcolor:'#10B981'}}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default JobPostingForm;
