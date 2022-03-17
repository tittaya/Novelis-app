import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import Crop54Icon from '@mui/icons-material/Crop54';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import TextFieldsIcon from '@mui/icons-material/TextFields';
 
export default function MapNav() {
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
          <BottomNavigationAction label="ตัวละคร" value='/person' icon={<CoPresentIcon/>} />
          <BottomNavigationAction label="สี่เหลี่ยม" value='/square' icon={<Crop54Icon />} />
          <BottomNavigationAction label="เส้น" value='/line' icon={<DriveFileRenameOutlineIcon />} />
          <BottomNavigationAction label="ความสัมพันธ์" value='/emotion' icon={<EmojiEmotionsIcon />} />
          <BottomNavigationAction label="ข้อความ" value='/text' icon={<TextFieldsIcon />} />
          
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

