import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import AlbumIcon from '@mui/icons-material/Album';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import HubIcon from '@mui/icons-material/Hub';
import SchemaIcon from '@mui/icons-material/Schema';
import BorderColorIcon from '@mui/icons-material/BorderColor';



 function BottomNav() {
  
  const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
  const [value, setValue] = React.useState(pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

  return (
    <Box sx={{ pb: 7 }} >
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={value} onChange={handleChange} showLabels={true}
        >
          <BottomNavigationAction 
            label="ตัวละคร" 
            value='/mycharacter' 
            icon={<AccessibilityNewIcon/>} 
            component={Link}
            to='/mycharacter' 
          />
          <BottomNavigationAction 
            label="แผนผัง" 
            value='/mymap' 
            icon={<HubIcon />} 
            component={Link} to='/mymap' 
          />
          <BottomNavigationAction 
            label="หน้าหลัก" 
            value='/myproject' 
            icon={<AlbumIcon />} 
            component={Link} to='/myproject' 
          />
          <BottomNavigationAction 
            label="ไทม์ไลน์" 
            value='/mytimeline' 
            icon={<SchemaIcon />} 
            component={Link} to='/mytimeline' 
          />
          <BottomNavigationAction 
            label="เนื้อเรื่อง" 
            value='/mystory' 
            icon={<BorderColorIcon />} 
            component={Link} to='/mystory' 
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default BottomNav;
