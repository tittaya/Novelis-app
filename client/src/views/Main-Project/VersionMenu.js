import React from "react";
import {useEffect, useContext, useState} from 'react';
import { useNavigate } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import MainProjectHeader from '../../components/MainProjectHeader';
import { useClient } from "../../client";
import { GET_USER_PROJECTS } from "../../graphql/queries";
import { SET_VERSION_MUTATION } from "../../graphql/mutations";
import Context from '../../context';

require("dotenv").config();

const mtheme = createMuiTheme({
    palette: {
    primary: {
       main: "#967969" // This is an orange looking color
              },
    secondary: {
       main: "#F2D2BD" //Another orange-ish color
               }
          },
  
  });

const client = new ApolloClient({
  uri: process.env.SERVER_URI
});


export default function VersionMenu(){


  const Client = useClient();
  const navigate = useNavigate();
  const {state} = useContext(Context);
  const {currentUser} = state;
  const [currentVersions, setCurrentVersions] = useState([]);

  const getProjectVersions = async () => {
    const id = currentUser._id;
    const variables = {creator: id, version: true}
    const userProjects = await Client.request(GET_USER_PROJECTS, variables);
    const projectId = localStorage.getItem("projectId");
    console.log(userProjects.Projects)
    const projectVersions = userProjects.Projects.filter(e => e.old_id === projectId && e.version !== 0)
    if(projectVersions){
      console.log(projectVersions)
      setCurrentVersions(projectVersions)
    }else{
      console.log("can't find project versions")
    }
      
  }

  const setProjectVersion = async(e,Id) => {
    e.preventDefault();
    const projectId = localStorage.getItem("projectId");
    const newId = Id;
    const variables = {projectId, newId};
    const setProjectVersion = await Client.request(SET_VERSION_MUTATION, variables);
    if(setProjectVersion){
      console.log(setProjectVersion)
    }else{
      console.log('set project error')
    }
  }

  const toMyProject = async(projectId) => {
    navigate('/myproject');
    localStorage.setItem("projectId", projectId);
  }

  useEffect(() => {
    getProjectVersions();
  }, []);

  return(
    <ApolloProvider client={client}>
        <MainProjectHeader/>
    <ThemeProvider theme={mtheme}>

      
      <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
          <Typography
              variant="h3"
              align="center"
              color="text.primary"
            >
              ประวัติการแก้ไข
            </Typography>
          </Container>

        </Box>
        <Divider > <ExpandCircleDownIcon/></Divider>


        <Box sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}>
        <Grid item xs={12} align="center"> 
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
      {currentVersions.map(version => {
        const date = version.last_edited
        const dd = date.slice(8,10);
        const mm_name = date.slice(4,7);
        const time = date.slice(16, 21)
        const mm_lowercase = mm_name.toLowerCase();
        const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        const mm_number = months.indexOf(mm_lowercase) + 1
        var mm = ''
        if(mm_number < 10){ mm = '0' + mm_number }else{ mm = mm_number }
        const yyyy = date.slice(11,15);
        const last_edit_date = dd + '/' + mm + '/' + yyyy;
        

        return(
          <li key={version._id}>
            <ListItemButton key={version._id} onClick={() => toMyProject(version._id)}>
              บันทึกเมื่อ : {last_edit_date} เวลา : {time} น.
              
            </ListItemButton>
              <Fab 
                variant="extended" 
                size="small" 
                color="primary" 
                aria-label="add"
                onClick={(e) => setProjectVersion(e, version._id)}
              >
                กลับไปใช้เวอร์ชั่นนี้
                <CheckIcon />
              </Fab>
          </li>
        )
      })}

    </List>
    </Grid>
    </Box>
    </ThemeProvider>
    </ApolloProvider>
    )
};

