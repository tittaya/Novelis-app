import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import CBox from './CBox';
import { useClient } from "../../client";
import { SELECTED_PROJECT } from "../../graphql/queries";

function ChapterList(){

  const client = useClient();
  const projectId = localStorage.getItem("projectId");
  const [chapters, setChapters] = useState([]);

  const getChapters = async () => {
    const variables = {_id: projectId}
    const data = await client.request(SELECTED_PROJECT, variables)
    if(data){
      setChapters(data.selectedProject.chapters)
    }else{
      console.log("null")
    }
  }

  const floatingMenuButtonStyle = {
    alignSelf: 'flex-end',
    position: 'fixed',
    bottom: '3%', 
    right: '2%' 
  }

  useEffect(() => {
    getChapters();
  }, []);

    return(
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

            <Grid container spacing={3}>

            <Grid item xs={12}>
            <Paper
                  sx={{ //กล่อง1
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                      //ปรับขนาด
                    height: 100,
                  }}
                >
            <Typography variant="h6" gutterBottom align="center" sx={{ p: 3}}>
            เนื้อเรื่อง
            </Typography>
          </Paper>
          </Grid>
            
            {chapters.map(chapter => {

              const date = chapter.last_edited;
              const dd = date.slice(8,10);
                      
              const mm_name = date.slice(4,7);
              const mm_lowercase = mm_name.toLowerCase();
              const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
              const mm_number = months.indexOf(mm_lowercase) + 1
              var mm = ''
              if(mm_number < 10){ mm = '0' + mm_number }else{ mm = mm_number }
          
              const yyyy = date.slice(11,15);
          
              const last_edit_date = dd + '/' + mm + '/' + yyyy;

                return(
                    <Grid item key={chapter._id} xs={12} md={8} lg={6}> 
                        <Paper
                            sx={{ //กล่อง1
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                //ปรับขนาด
                                height: 220,
                            }}
                        >
                            <CBox ChapterName={chapter.name} LastEdited={last_edit_date} ChapterId={chapter._id}/> 
                        </Paper>
                    </Grid>
                )
            })}

            </Grid>

            <Fab 
            style={floatingMenuButtonStyle}
             color="primary"
            sx={{ my:8, mx:4, }} 
            component={Link} to='/editstory'
            >
                
                <AddIcon />
            </Fab>
          </Container>
        </Box>
      </Box>
    )
}

export default ChapterList;