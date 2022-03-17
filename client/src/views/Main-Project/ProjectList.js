import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from '@mui/material/DialogActions';
import Context from '../../context';
import { useClient } from "../../client";
import { GET_USER_PROJECTS } from "../../graphql/queries";
import { SAVE_VERSION_MUTATION, DELETE_PROJECT_MUTATION } from "../../graphql/mutations";
import ConfirmDialog from '../../components/ConfirmDialog'
import SaveIcon from '@mui/icons-material/Save';
import ScheduleIcon from '@mui/icons-material/Schedule';

function ProjectList(){
  
const [openOkSave, setOpenOkSave] = useState(false);


  const handleClose = () => {
    setOpenOkSave(false);
  };

  const navigate = useNavigate();
  const client = useClient();
  const {state, dispatch} = useContext(Context);
  const {currentUser} = state;
  const [userProjects, setUserProjects] = useState([]);
  const [confirmDialog, setConfirmDialog ] = useState({isOpen: false, title: '', subTitle: ''})

  const getUserProjects = async () => {
    const id = currentUser._id;
    const variables = {creator: id, version: false}
    const userProjects = await client.request(GET_USER_PROJECTS, variables);
    if(userProjects){
      setUserProjects(userProjects.Projects)
      dispatch({ type: "GET_USER_PROJECTS", payload: userProjects })
    }else{
      console.log("can't find projects")
    }
  }

  const saveVersion = async (projectId) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    const id = currentUser._id;
    const variables = {creator: id, version: true}
    const projects = await client.request(GET_USER_PROJECTS, variables);
    const allVersions = projects.Projects.filter(e => e.old_id === projectId);
    if(allVersions){
      console.log(allVersions);
      const length = allVersions.length
      const saveVersionVar = {projectId, number: length}
      const saveVersionAdded = await client.request(SAVE_VERSION_MUTATION, saveVersionVar);
      console.log('save version added', saveVersionAdded);
    }else{
      console.log('This project only have 1 versions')
      const saveVersionVar = {projectId, number: 1}
      const saveVersionAdded = await client.request(SAVE_VERSION_MUTATION, saveVersionVar);
      console.log('save version added', saveVersionAdded);
    }

  }
  
  const deleteProject = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    const projectId = id
    const creator = currentUser._id
    const variables = {projectId, creator}
    const projectDelete = await client.request(DELETE_PROJECT_MUTATION, variables)
    if(projectDelete){
      console.log(projectDelete)
      getUserProjects();
    }else{
      console.log("error deleting project")
    }
  }

  useEffect(() => {
    
     getUserProjects();
  }, []);


  const toMyProject = async(projectId) => {
    navigate('/myproject');
    localStorage.setItem("projectId", projectId);
    
  }

  const toVersionMenu = async(projectId) => {
    navigate('/versionmenu');
    localStorage.setItem("projectId", projectId);
    
  }


    return (
      <div>
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
              คลังผลงาน
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                  คุณมีทั้งหมด {userProjects.length} ผลงาน
            </Typography>
          </Container>
        </Box>
        
        <Grid container spacing={3} >
          {userProjects.map(project =>{

            const date = project.last_edited;
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

                <Grid item key={project._id} xs={12} sm={6} md={4}>

                  <Dialog open={openOkSave} onClose={handleClose}>
                    <DialogTitle>บันทึกสำเร็จ</DialogTitle>
                    <DialogContent>
                    เวลาที่บันทึก : 26/02/2022
            
                    </DialogContent>
                    <DialogActions>
                      
                      <Button onClick={handleClose}>ปิด</Button>
                    </DialogActions>
                  </Dialog>

                  <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}                  
                  >
                    <CardActionArea 
                      onClick={() => toMyProject(project._id)}
                    >
                      <CardMedia
                        component="img"
                        height="120"
                        sx={{
                        }}
                        image={project.image}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {project.title}
                        </Typography>
                        <Typography >
                          แก้ไขล่าสุดเมื่อ: {last_edit_date}
                        </Typography>
                        
                      </CardContent>
                      </CardActionArea>
                      
                      <Box sx={{  display: "flex", justifyContent: "flex-end"}}>
                        <Button
                          size="large"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: 'ต้องการลบผลงานนี้หรือไม่',
                              subTitle: '',
                              onConfirm: () => {deleteProject(project._id)}
                            })
                          }} 
                        >
                          X
                        </Button>
                        <Button 
                          size="large" 
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title: 'บันทึกเวอร์ชั่นล่าสุดหรือไม่',
                              subTitle: '',
                              onConfirm: () => {saveVersion(project._id)}
                            })
                          }}
                        >
                          <SaveIcon/>
                        </Button>
                        <Button size="large" onClick={() => toVersionMenu(project._id)} >
                          <ScheduleIcon/>
                        </Button>
                        </Box>
                    <ConfirmDialog
                      confirmDialog={confirmDialog}
                      setConfirmDialog={setConfirmDialog}
                    /> 
                  </Card>
                </Grid>
              
            )
          })}
          </Grid>
          
      </div>
    )
}

export default ProjectList;
