import { Button, MenuItem, TextField, Typography, Grid, Box, Modal, Divider, List, ListItem, useMediaQuery } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const BrowseJob = () => {
  const { user } = useUser();
  const isMobile = useMediaQuery('(max-width:600px)');

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [apply, setApply] = useState(false);
  const [jobId, setJobId] = useState(null);
  const applyOpen = (jobId) => {
    setJobId(jobId);
    setApply(true);
  };
  const applyClose = () => setApply(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cv, setCv] = useState(null);
  const [expandedJobId, setExpandedJobId] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCv(file);
    }
  };

  const handleSubmit = async (e, jobId) => {
    e.preventDefault();

    if (!cv) {
      alert('Please upload a CV file!');
      return;
    }

    const job = jobs.find(j => j._id === jobId);

    if (!job) {
      console.error("Job not found!");
      alert("Job not found. Please try again.");
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('cv', cv);
    formData.append('userId', user.id);
    formData.append('jobId', jobId);
    formData.append('jobTitle', job.title);
    formData.append('companyName', job.company.name);

    try {
      const response = await axios.post('http://localhost:5000/apply-job', formData);
      alert('Application submitted successfully!');
      console.log(response.data);
      setFirstName('');
      setLastName('');
      setEmail('');
      setCv(null);
      applyClose();
    } catch (err) {
      console.error('Error applying for job:', err);
      alert('Failed to apply for job');
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/view")
      .then((r) => {
        setJobs(r.data);
        setFilteredJobs(r.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
      <Box sx={{ width: isMobile ? '100%' : '300px', p: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 3, height: 'fit-content', overflowY: 'auto', mb: isMobile ? 2 : 0, mr: isMobile ? 0 : 2 }}>
        <Typography variant="h6" sx={{ color: '#1E3A8A', mb: 2 }}>Filter Jobs</Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Job Type"
          name="type"
          variant="outlined"
          fullWidth
          margin="normal"
          select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          sx={{ mb: 2, textAlign: 'left' }}
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
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>

      <Box sx={{ flex: 1, p: 3, bgcolor: '#f3f3f3', boxShadow: 3, borderRadius: 2, overflowY: 'auto', maxHeight: '100vh' }}>
        <Typography variant="h5" sx={{ color: '#1E3A8A', fontWeight: 600, mb: 2 }}>Job Listings</Typography>
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
                borderRadius: 2,
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
                  <Typography variant="h6" sx={{ color: '#1E3A8A', fontWeight: 600 }}>{job.title}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">{job.company.name}</Typography>
                </div>
              </div>
              <Typography variant="body1" sx={{ mt: 1, color: '#333333' }}>{job.description}</Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }}>
                <LocationOnIcon sx={{ fontSize: 'small', color: '#1E3A8A' }} /> {job.location} | {job.type}
              </Typography>
              <div style={{ display: 'flex', gap: '8px', mt: 2 }}>
                <Button variant='outlined' sx={{ color: '#10B981', borderColor: '#10B981' }} onClick={() => applyOpen(job._id)}>Apply</Button>
                <Button variant='outlined' sx={{ color: '#1E3A8A', borderColor: '#1E3A8A' }} onClick={() => handleLearnMore(job._id)}>
                  {expandedJobId === job._id ? 'Show Less' : 'Learn More'}
                </Button>
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
                  <Typography variant="body2" color='warning' >Please note the contact info for later use!</Typography>
                </div>
              )}
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Apply Modal */}
      <Modal open={apply} onClose={applyClose}>
        <Box sx={{ width: isMobile ? '90%' : 350, p: 3, mx: 'auto', mt: 10, bgcolor: 'white', boxShadow: 24, borderRadius: 2 }}>
          <Typography variant='h6' sx={{ color: '#1E3A8A' }}>Apply For Job</Typography>
          <TextField fullWidth variant='outlined' label="First Name" sx={{ my: 1 }} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <TextField fullWidth variant='outlined' label="Last Name" sx={{ my: 1 }} value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <TextField fullWidth variant='outlined' label="Email" sx={{ my: 1 }} value={email} onChange={(e) => setEmail(e.target.value)} />

          <TextField variant='outlined' label='Upload CV' type="file" onChange={handleFileChange} sx={{ display: 'block', marginTop: '16px', borderColor: 'black' }} focused />
          <Button
            variant='contained'
            fullWidth
            sx={{ my: 2, bgcolor: '#10B981' }}
            onClick={(e) => handleSubmit(e, jobId)}
          >
            Submit Application
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default BrowseJob;