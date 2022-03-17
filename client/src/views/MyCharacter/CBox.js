import * as React from 'react';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

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

  
export default function CBox({CharacterName, last_edited, characterId, DisplayName, Image, dob, uniqueness1, uniqueness2}) {

    const navigate = useNavigate();
    const [converted_dob, setConvert_dob] = useState("");

    const convertLastEdit = (dob) => {
      const dob_yyyy = dob.slice(0,4)
      const dob_mm = dob.slice(5,7)
      const dob_dd = dob.slice(8,10)
      const new_dob = dob_dd + '/' + dob_mm + '/' + dob_yyyy;
      setConvert_dob(new_dob)
    }

    const toCharacterDetails = async(characterId) => {
      navigate('/characterdetails');
      localStorage.setItem("characterId", characterId);
      
    }
  useEffect(() => {
    if(dob){
      convertLastEdit(dob);
    }
  }, []);

    return (
      
      <Card sx={{ display: 'flex' }} onClick={() => toCharacterDetails(characterId)}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {DisplayName}
          </Typography>
          <Typography variant="subtitle1"  component="div">
            {CharacterName}
          </Typography>
          <Typography variant="subtitle1"  component="div">
            วันเกิด: {converted_dob}
          </Typography>
          <Typography variant="subtitle1"  component="div">
            -{uniqueness1} -{uniqueness2}
          </Typography>
          <Typography variant="subtitle1"  component="div">
            แก้ไขล่าสุดเมื่อ: {last_edited}
          </Typography>
        </CardContent>
        
      </Box>
      <Box  sx={{  display: "flex", justifyContent: "flex-end"}}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={Image}
        alt="character image"
      />
      </Box>
    </Card>
  );
}