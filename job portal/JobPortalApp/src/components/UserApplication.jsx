import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const UserApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-applications'); // Fetch applications from backend
        setApplications(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load applications');
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);
  const handleStatusChange = async (id, newStatus) => {
    try {
      const requestBody = { status: newStatus }; // Ensure this is correct
  
      const response = await axios.put(
        `http://localhost:5000/update-status/${id}`,
        requestBody, // Ensure the body is included
        { headers: { "Content-Type": "application/json" } } // Ensure the header is set
      );
  
      console.log("Response from backend:", response.data);
  
      if (response.status === 200) {
        setApplications((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
        );
      } else {
        console.error("Backend returned an error:", response.data);
        setError("Failed to update status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error);
      setError("Failed to update status. Please try again.");
    }
  };
  
  if (loading) return <p>Loading applications...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750,bgcolor: '#f4f4f4' }} aria-label="applications table">
        <TableHead>
          <TableRow >
            <TableCell sx={{ color: '#1E3A8A' }}>Full Name</TableCell>
            <TableCell align="center" sx={{ color: '#1E3A8A' }} >Last Name</TableCell>
            <TableCell align="center" sx={{ color: '#1E3A8A' }}>Email</TableCell>
            <TableCell align="center" sx={{ color: '#1E3A8A' }}>Company Name</TableCell>
            <TableCell align="center" sx={{ color: '#1E3A8A' }}>CV</TableCell>
            <TableCell align="center" sx={{ color: '#1E3A8A' }}>Job Title</TableCell>
            <TableCell align="center" sx={{ color: '#1E3A8A' }}>Status</TableCell>

            <TableCell align="center" sx={{ color: '#1E3A8A' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app._id}>
              <TableCell>{app.firstName}</TableCell>
              <TableCell align="center">{app.lastName}</TableCell>
              <TableCell align="center">{app.email}</TableCell>
              <TableCell align="center">{app.companyName}</TableCell> 
              <TableCell align="center" sx={{ color: '#10B981' }}>
                <a href={`http://localhost:5000/${app.cv}`} target="_blank" rel="noopener noreferrer">View CV</a>
              </TableCell>
              <TableCell align="center">{app.jobTitle}</TableCell>
              <TableCell align="center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    app.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : app.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {app.status}
                </span>
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined" color="success" sx={{ mr: 1 }}  onClick={() => handleStatusChange(app._id, "Approved")}>Approve</Button>
                <Button variant="outlined" color="error" onClick={() => handleStatusChange(app._id, "Rejected")}>Reject</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserApplication;
