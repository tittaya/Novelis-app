import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import AddchartIcon from '@mui/icons-material/Addchart';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import SaveIcon from '@mui/icons-material/Save';

export default function TimelineNav() {
  const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
    const [value, setValue] = React.useState(pathname);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
  return (
    <Box sx={{ pb: 7 }} >
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 55, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={value} onChange={handleChange} showLabels={true}
        >
          <BottomNavigationAction label="เรียกดูไทม์ไลน์อื่น" value='/addtimeline' icon={<AddchartIcon/>} />
          <BottomNavigationAction label="เรียกดูแผนผัง" value='/addmap' icon={<DeviceHubIcon />} />
          <BottomNavigationAction label="บันทึก" value='/saveicon' icon={<SaveIcon />} />
          
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
