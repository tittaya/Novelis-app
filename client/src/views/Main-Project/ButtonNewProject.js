import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';

export default function ButtonNewProject() {

  const floatingMenuButtonStyle = {
    backgroundColor: '#967969', 
    color: '#FFFFFF',
    alignSelf: 'flex-end',
    position: 'fixed',
    bottom: '5%',
    right: '8%' }

    return (
          <Fab 
          color="primary" 
          variant="contained"  
          
          style={floatingMenuButtonStyle}
          component={Link} to='/create-project'>
            <AddIcon />
          
          </Fab>
           );
        }