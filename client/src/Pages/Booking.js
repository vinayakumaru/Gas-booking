import React from 'react'
import Navbar from '../Components/Navbar'
import GasProviders from '../Components/GasProviders'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Services from '../Components/Services';

export default function Booking() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          marginLeft: "50px",
          marginRight: "50px",
          marginTop: "50px",
        }}
      >
        <Typography gutterBottom variant="h6" component="div">
          Services
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          alignItems="center"
          sx={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <Services head={"Book LPG Gas Cylinder"} buttonHead={"Book"} />
          <Services head={"Register New LPG Cylinder"} buttonHead={"Register"} />
          <Services head={"Your Orders"} buttonHead={"View"} />
        </Box>
      </Box>
      <GasProviders />
    </>
  )
}
