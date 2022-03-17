import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import BorderColorIcon from '@mui/icons-material/BorderColor';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`action-tabpanel-${index}`}
        aria-labelledby={`action-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };
  
  
  export default function WBox({ChaptersCount}) {
    const theme = useTheme();
    const [value] = React.useState(0);
  
    const fabs = [
      {
        color: 'primary',
        sx: fabStyle,
        icon: <AddIcon />,
        label: 'Add',
      },
    ];
  
    return (
      <Box
        sx={{
          bgcolor: 'background.paper',
           //ปรับขนาดกล่อง
          position: 'relative',
          minHeight: 200,
        }}
      >
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
            tabInlineLabel="true"
          >
            <Tab label={<div>เนื้อเรื่อง  <BorderColorIcon style={{verticalAlign: 'middle'}} />  </div>}  /> 'แก้ชื่อ'
            
          </Tabs>
        </AppBar>
        
          {/* <TabPanel value={value} index={0} dir={theme.direction}>
          ตอนที่1 : เตรียมตัวการเดินทาง       
          <br/>
          ตอนที่2 : สู่โลกกว้าง 
          </TabPanel> */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            มีทั้งหมด {ChaptersCount} ตอน
          </TabPanel>
        {fabs.map((fab, index) => (
          <Zoom
            key={fab.color}
            in={value === index}
            unmountOnExit
          >
            <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
              {fab.icon}
            </Fab>
          </Zoom>
        ))}
      </Box>
    );
  }
  