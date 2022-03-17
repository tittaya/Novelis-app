import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Header from '../../components/Header';
import CharBox from './CharBox';
import MapBox from './MapBox';
import TLBox from './TLBox';
import WBox from './WBox';
import { TextField } from '@mui/material';
import Fab from '@mui/material/Fab';
import CardMedia from '@mui/material/CardMedia';
import CheckIcon from '@mui/icons-material/Check';
import { useClient } from "../../client";
import { SELECTED_PROJECT } from "../../graphql/queries";
import { UPDATE_PROJECT_MUTATION, UPDATE_PROJECT_IMAGE_MUTATION } from "../../graphql/mutations";
import Context from '../../context';
import config from '../../config.json'
require("dotenv").config();

const mdTheme = createMuiTheme({
  palette: {
  primary: {
     main: "#967969" // This is an orange looking color
            },
  secondary: {
     main: "#F2D2BD" //Another orange-ish color
             }
        },

});
function ProjectDetails(){
 
  const {state, dispatch} = useContext(Context);
  const {currentProject} = state;
  const client = useClient();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [charactersCount, setCharactersCount] = useState(0);
  const [timelinesCount, setTimelinesCount] = useState(0);
  const [chaptersCount, setChaptersCount] = useState(0);
  const [mapsCount, setMapsCount] = useState(0);
  

  const getProjectDetails = async () => {

    const projectId = localStorage.getItem("projectId");
   
    const variables = {_id: projectId}
    const project = await client.request(SELECTED_PROJECT, variables);

    if(project){
      console.log(project.selectedProject);
      setTitle(project.selectedProject.title);
      setImage(project.selectedProject.image);
      setAuthor(project.selectedProject.author);
      setSummary(project.selectedProject.summary);
      setCharactersCount(project.selectedProject.characters.length);
      setTimelinesCount(project.selectedProject.timelines.length);
      setMapsCount(project.selectedProject.maps.length);
      setChaptersCount(project.selectedProject.chapters.length);
      dispatch({type: "SELECT_PROJECT", payload: project.selectedProject});
    }else{
      console.log("Can't find project details");
    }
  }
  
  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", image)
    data.append("upload_preset", "Novelis")
    data.append("cloud_name", "myimagevideocloud")
    const res = await axios.post( config.CLOUDINARY_URL, data )
    return res.data.url
  }

  const updateProject = async event => {
    try{
      event.preventDefault();
      setSubmitting(true);
      console.log({title, author, summary})
      const projectId = currentProject._id
      const variables = {projectId, title, author, summary}
      const updatedProject = await client.request(UPDATE_PROJECT_MUTATION, variables)
      console.log("Project updated",{updatedProject});
      setSubmitting(false);
    }catch(err){
      setSubmitting(false);
      console.log("Error updating project", err);
    }
  }

  const updateProjectImage = async event => {
    try{
      event.preventDefault();
      setSubmitting(true);
      const url = await handleImageUpload();
      const projectId = currentProject._id
      const variables = {projectId, image: url}
      const updatedProject = await client.request(UPDATE_PROJECT_IMAGE_MUTATION, variables)
      
      console.log("Project updated",{updatedProject});
      setSubmitting(false);
    }catch(err){
      setSubmitting(false);
      console.log("Error updating project", err);
    }
  }

  useEffect(() => {
    getProjectDetails();
  }, []);
  

  return (
    
    <ThemeProvider theme={mdTheme}>
        <Header/>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} >
              {/* Chart */}

              <Grid item xs={12} align="center"> 
                <Paper
                    sx={{ //แก้ไข
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column',
                        //ปรับขนาด
                      height:560,
                      gap: 2,
                      
                    }}
                  >
                <Grid item xs={12}>
                <CardMedia
                  component="img"
                  height="140"
                  sx={{ width: 151 }}
                  image={image}
                  //alt="random"
                />

                <input 
                  type="file"
                  accept="imge/*"
                  onChange={e => setImage(e.target.files[0])}
                />
                <Fab 
                  variant="extended" 
                  size="small" 
                  color="primary" 
                  aria-label="add"
                  onClick={updateProjectImage}
                  disabled={submitting}
                >
                  บันทึกการแก้ไขรูปภาพ
                  <CheckIcon />
                </Fab>
                </Grid>

                <TextField
                  id="outlined-uncontrolled"
                  label="แก้ไขชื่อผลงาน"
                  value={title || ''}
                  multiline={true}
                  justifyContent="center"
                  align="center"
                  onChange={e => setTitle(e.target.value)}
                />

                <TextField
                  id="outlined-uncontrolled"
                  label="แก้ไขนามปากกา"
                  value={author || ''}
                  multiline={true}
                  justifyContent="center"
                  onChange={e => setAuthor(e.target.value)}
                />


                <TextField
                  id="outlined-uncontrolled"
                  label="แก้ไขเรื่องย่อ"
                  value={summary || ''}
                  multiline={true}
                  justifyContent="center"
                  rows={2}
                  maxRows={2}
                  onChange={e => setSummary(e.target.value)}
                />

                <Fab 
                  variant="extended" 
                  size="small" 
                  color="primary" 
                  aria-label="add"
                  onClick={updateProject}
                  disabled={submitting}
                >
                  บันทึกการแก้ไข
                  <CheckIcon />
                </Fab>
                </Paper>
              </Grid>      
              <Grid item xs={12} md={8} lg={6}> 
              <Paper
                  sx={{ //กล่อง1
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                      //ปรับขนาด
                    height: 220,
                  }}
                >
                  <CharBox CharactersCount={charactersCount}/> 
                </Paper>
              </Grid>

              <Grid item xs={12} md={8} lg={6}>
                <Paper
                  sx={{ //กล่อง2
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                      //ปรับขนาด
                    height: 220,
                  }}
                >
                  <TLBox TimelineCount={timelinesCount}/> 
                </Paper>
              </Grid>

              <Grid item xs={12}> 
              <Paper
                  sx={{ //กล่อง3
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                      //ปรับขนาด
                    height: 220,
                  }}
                >
                  <MapBox MapsCount={mapsCount}/> 
                </Paper>
              </Grid>

              <Grid item  xs={12}>
                <Paper
                  sx={{ //กล่อง4
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                      //ปรับขนาด
                    height: 400,
                  }}
                >
                  <WBox ChaptersCount={chaptersCount}/> 
                </Paper>
              </Grid>
              <Grid item  xs={12}>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      
    </ThemeProvider>
   
  );
}

export default ProjectDetails;