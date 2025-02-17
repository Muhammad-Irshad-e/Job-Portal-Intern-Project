
import React, { useState } from "react";
import { Card, Typography, Button, Modal, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";


const Userprofile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div className="flex justify-center items-center p-0">
    <Card
      sx={{
        maxWidth: 400,
        paddingLeft:30,
        paddingRight:30,
        boxShadow: 5,
        borderRadius: 5,
        
        textAlign: "center",
      }}
    >
      <Stack direction="column" alignItems="center" spacing={4}>
        
        
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          Name
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontStyle: "italic" }}>
          Email@gmail.com
        </Typography>
        <Typography variant="body1" color="text.secondary">
          9984307475
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontStyle: "italic" }}>
          ●●●●●●●●
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 3, px: 4, py: 1, textTransform: "none" ,width:500 }}
          onClick={handleOpen}
        >
          Edit Profile
        </Button>
        
      </Stack>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: 350, p: 3, mx: 'auto', mt: 10, bgcolor: 'white', boxShadow: 24, borderRadius: 2 }}>
          <Typography variant='h6'>Filter Jobs</Typography>
          <TextField fullWidth variant='outlined' label="Full Name" sx={{ my: 1 }} />
          <TextField fullWidth variant='outlined' type="email" label="Email" sx={{ my: 1 }} />
          <TextField fullWidth variant='outlined' type="tel" label="Mobile Number" sx={{ my: 1 }} />
          <TextField fullWidth variant='outlined' type="password" label="Password" sx={{ my: 1 }} />
          <TextField fullWidth variant='outlined' type="password" label="Confirm Password" sx={{ my: 1 }} />

          
          <Button variant='contained' fullWidth onClick={handleClose}>Submit</Button>
        </Box>
      </Modal>
    </Card>
    </div>
  );
};

export default Userprofile;
