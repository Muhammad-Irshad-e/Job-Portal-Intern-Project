import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Box, Divider, List, ListItem, MenuItem, useMediaQuery } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [expandedJobId, setExpandedJobId] = useState(null);

  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)'); // Check for mobile screen size

  useEffect(() => {
    axios.get("http://localhost:5000/view")
      .then((r) => {
        setJobs(r.data);
        setFilteredJobs(r.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const delValue = (id) => {
    axios.delete("http://localhost:5000/delete/" + id)
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const updateValue = (val) => {
    navigate("addJob", { state: { val } });
  };

  useEffect(() => {
    let filtered = jobs;

    if (jobTitle) {
      filtered = filtered.filter((job) => job.title.toLowerCase().includes(jobTitle.toLowerCase()));
    }

    if (location) {
      filtered = filtered.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()));
    }

    if (jobType) {
      filtered = filtered.filter((job) => job.type === jobType);
    }

    if (companyName) {
      filtered = filtered.filter((job) => job.company.name.toLowerCase().includes(companyName.toLowerCase()));
    }

    setFilteredJobs(filtered);
  }, [jobTitle, location, jobType, companyName, jobs]);

  const handleLearnMore = (jobId) => {
    setExpandedJobId((prevId) => (prevId === jobId ? null : jobId));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', bgcolor: '#f5f6f5', p: isMobile ? 1 : 3 }}>
      {/* Filter Section (Left) */}
      <Box sx={{ 
        width: isMobile ? '100%' : '300px', 
        p: 3, 
        bgcolor: '#fff', 
        borderRadius: 2, 
        boxShadow: 3, 
        height: 'fit-content', 
        overflowY: 'auto', 
        mb: isMobile ? 2 : 0, 
        mr: isMobile ? 0 : 2 
      }}>
        <Typography variant="h6" sx={{ color: '#1E3A8A', mb: 2 }}>Filter Jobs</Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Job Title"
          sx={{ my: 1, input: { color: '#1E3A8A' } }}
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Location"
          sx={{ my: 1, input: { color: '#1E3A8A' } }}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          label="Job Type"
          name="type"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{ textAlign: 'left' }}
          select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <MenuItem value="Full-Time">Full-Time</MenuItem>
          <MenuItem value="Part-Time">Part-Time</MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
          <MenuItem value="Freelance">Freelance</MenuItem>
        </TextField>
        <TextField
          fullWidth
          variant="outlined"
          label="Company Name"
          sx={{ my: 1, input: { color: '#1E3A8A' } }}
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </Box>

      {/* Job Listings Section (Right) */}
      <Box sx={{ 
        flex: 1, 
        p: 3, 
        bgcolor: '#f4f4f4', 
        boxShadow: 3, 
        borderRadius: 2, 
        overflowY: 'auto', 
        maxHeight: '100vh' 
      }}>
        <Typography variant="h5" mb={1} sx={{ color: '#1E3A8A', textAlign: 'center' }}>Job Listings</Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {filteredJobs.map((job) => (
            <ListItem 
              key={job._id} 
              sx={{ 
                mb: 2, 
                p: 2, 
                border: '1px solid #ddd', 
                flexDirection: 'column', 
                alignItems: 'flex-start', 
                boxShadow: 5, 
                bgcolor: '#f5f6f5', 
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.01)",
                  boxShadow: 6,
                }, 
                borderRadius: 2 
              }}
            >
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center' }}>
                <img
                  src={job.company.logo}
                  alt={`${job.company.name} logo`}
                  style={{
                    width: '60px',
                    height: '60px',
                    marginRight: isMobile ? 0 : '16px',
                    marginBottom: isMobile ? '16px' : 0,
                    borderRadius: '50%',
                  }}
                />
                <div>
                  <Typography variant="h6" sx={{ color: '#1E3A8A' }}>{job.title}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">{job.company.name}</Typography>
                </div>
              </div>
              <Typography variant="body1" sx={{ mt: 1, color: '#333333' }}>{job.description}</Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }}>
                <LocationOnIcon sx={{ fontSize: 'small', color: '#1E3A8A' }} /> {job.location} | {job.type}
              </Typography>
              <div style={{ display: 'flex', gap: '8px', mt: 2, justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', gap: '8px', mt: 2 }}>
                  <Button variant="outlined" sx={{ borderColor: '#10B981', color: '#10B981' }} onClick={() => { updateValue(job) }}>Update</Button>
                  <Button variant="outlined" sx={{ borderColor: '#f44336', color: '#f44336' }} onClick={() => { delValue(job._id) }}>Delete</Button>
                </div>
                <div>
                  <Button variant='outlined' sx={{ color: '#1E3A8A', borderColor: '#1E3A8A' }} onClick={() => handleLearnMore(job._id)}>
                    {expandedJobId === job._id ? 'Show Less' : 'Learn More'}
                  </Button>
                </div>
              </div>
              {expandedJobId === job._id && (
                <div style={{ marginTop: '16px', width: '100%' }}>
                  <Typography variant="body1" sx={{ color: '#4b61a1' }}><strong>Company Details:</strong></Typography>
                  <Typography variant="body1" sx={{ color: '#333333' }}>{job.company.description}</Typography>
                  <Typography variant="body1" sx={{ mt: 1, color: '#4b61a1' }}><strong>Requirements:</strong></Typography>
                  <Typography variant="body1" sx={{ color: '#333333' }}>{job.qualification}</Typography>
                  <Typography variant="body1" sx={{ mt: 1, color: '#4b61a1' }}><strong>Salary:</strong></Typography>
                  <Typography variant="body1" sx={{ color: '#333333' }}>{job.salary}</Typography>
                  <Typography variant="body1" sx={{ mt: 1, color: '#4b61a1' }}><strong>Contact us:</strong></Typography>
                  <Typography variant="body1" sx={{ color: '#333333' }}>Email : {job.company.contactEmail}</Typography>
                  <Typography variant="body1" sx={{ color: '#333333' }}>Phone : {job.company.contactPhone}</Typography>
                </div>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ManageJobs;