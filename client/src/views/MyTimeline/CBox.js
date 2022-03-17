import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';

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
  
  
  export default function FloatingActionButtonZoom({TimelineName, TimelineId, LastEdited}) {

    const theme = useTheme();
    const [value] = React.useState(0);
    const navigate = useNavigate();

    const toTimelineDetails = async(timelineId) => {
      navigate('/timelinedetails');
      localStorage.setItem("timelineId", timelineId);
      
    }

    const fabs = [
      {
        color: 'primary',
        sx: fabStyle,
        icon: <SettingsIcon />,
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
        onClick={() => toTimelineDetails(TimelineId)}
      >
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label={TimelineName}/>
        
          </Tabs>
        </AppBar>
        
          <TabPanel value={value} index={0} dir={theme.direction}>
          {/* แก้ไขล่าสุดเมื่อ: 17/01/2022 */}
          แก้ไขล่าสุดเมื่อ: {LastEdited}
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
  