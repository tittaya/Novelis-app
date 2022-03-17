import React,{useState, useContext, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import CheckIcon from '@mui/icons-material/Check';
import CardMedia from '@mui/material/CardMedia';
import Fab from '@mui/material/Fab';
import ClearIcon from '@mui/icons-material/Clear';
import Context from '../../context';
import ConfirmDialog from '../../components/ConfirmDialog'
import { useClient } from '../../client';
import { SELECTED_PROJECT } from "../../graphql/queries";
import { UPDATE_CHARACTER_MUTATION, UPDATE_CHARACTER_IMAGE_MUTATION, DELETE_CHARACTER_MUTATION } from '../../graphql/mutations';
import config from '../../config.json'
require("dotenv").config();

const theme = createMuiTheme({
  palette: {
  primary: {
     main: "#967969" // This is an orange looking color
            },
  secondary: {
     main: "#F2D2BD" //Another orange-ish color
             }
        },

});

function GetCharacterDetails() {
    
  const {state} = useContext(Context);
  const {currentProject} = state;
  const navigate = useNavigate();
  const client = useClient();
  const characterId = localStorage.getItem("characterId")
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [display_name, setDisplay_name] = useState("");
  var now = new Date();
  var isoString = now.toISOString().slice(0,10)
  const [dob, setDOB] = useState(isoString);
  const [biography, setBiography] = useState("");
  const [uniqueness, setUniqueness] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [uniquenessInput, setUniquenessInput] = useState([]);
  const [count, setCount] = useState(0);
  const [confirmDialog, setConfirmDialog ] = useState({isOpen: false, title: '', subTitle: ''})

  const findCharacter = async () => {
    const projectId = localStorage.getItem("projectId");
    const projectVariable = {_id: projectId}
    const project = await client.request(SELECTED_PROJECT, projectVariable);
    const characterId =  localStorage.getItem("characterId");
    const character = await project.selectedProject.characters.find(e => e._id === characterId);
    console.log(character);
    if(character){
      setName(character.name);
      setImage(character.image);
      setDisplay_name(character.display_name);
      setDOB(character.DOB);
      setBiography(character.biography);
      setUniqueness(character.uniqueness);
    }else{
      console.log("can't find character details");
    }
  }

  const handleDateChange = e => {
    const dateInput = e.target.value
    setDOB(dateInput)
    console.log(dob)
  }

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", image)
    data.append("upload_preset", "Novelis")
    data.append("cloud_name", "myimagevideocloud")
    const res = await axios.post( config.CLOUDINARY_URL, data )
    return res.data.url
  }

  const getUniquenessInput = (i, e) => {
    const items = uniquenessInput;
    if(e.target.value !== ""){
      items[i] = e.target.value;
      setUniquenessInput(items);
      console.log("hi")
      setCount(count+1);
    }
  }

  const updateCharacter = async event =>{
    try{
      event.preventDefault();
      setSubmitting(true);
      //const variables = {name, nickname, birth_date, background, uniqness_1, uniqness_2}
      const projectId = currentProject._id
      const characterId = localStorage.getItem("characterId");
      const variables = {projectId, characterId, name, display_name, dob, biography}
      const updateCharacter = await client.request(UPDATE_CHARACTER_MUTATION, variables)
      console.log("Character updated", updateCharacter);
      setSubmitting(false);
    }catch(err){
      setSubmitting(false);
      console.log("Error updating character", err);
    }
        
  }

  const updateCharacterImage = async event =>{
    try{
      event.preventDefault();
      setSubmitting(true);
      const projectId = currentProject._id
      const characterId = localStorage.getItem("characterId");
      const url = await handleImageUpload();
      const variables = {projectId, characterId, image: url}
      const updateCharacter = await client.request(UPDATE_CHARACTER_IMAGE_MUTATION, variables)
      console.log("Character updated", updateCharacter);
      setSubmitting(false);
    }catch(err){
      setSubmitting(false);
      console.log("Error updating character", err);
    }     
  }

  const deleteCharacter = async event=> {
    event.preventDefault();
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    const characterId = localStorage.getItem("characterId");
    const projectId = currentProject._id
    const variables = {characterId, projectId}
    const deleteCharacter = await client.request(DELETE_CHARACTER_MUTATION, variables)
    if(deleteCharacter){
      console.log(deleteCharacter)
      navigate('/mycharacter')
    }else{
      console.log('error deleting character')
    }
  }

  useEffect(() => {
    console.log(characterId)
    findCharacter();
    setCount(0); 
  }, []);

  return(
    <div>
      <form
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
     <ThemeProvider theme={theme}>
     <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography variant="h6" gutterBottom>
        ข้อมูลตัวละคร
        </Typography>
      <Grid container spacing={3}>
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
            onClick={updateCharacterImage}
            disabled={submitting}
          >
            บันทึกการแก้ไขรูปภาพ
            <CheckIcon />
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="Character Name"
            label="ชื่อตัวละคร"
            fullWidth
            variant="standard"
            value={name || ''}
            onChange={e => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="nickName"
            name="nickName"
            label="ชื่อที่แสดง"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={display_name || ''}
            onChange={e => setDisplay_name(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="birth_date"
            label="วันเกิด "
            type="date"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            value={dob}
            onChange={handleDateChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="background"
            label="ประวัติตัวละคร"
            type="passtextword"
            fullWidth
            variant="standard"
            value={biography|| ''}
            onChange={e => setBiography(e.target.value)}
          />
        </Grid>
        {uniqueness.map(item => {
          
          return(
            <Grid item key={item} xs={12} sm={6}>
              <TextField
                id="city"
                name="city"
                label="เอกลักษณ์"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
                value={item || ''}
                onLoad={e => getUniquenessInput(count, e)}
              />
            </Grid>
          )
        })}
        
        
        <Grid item xs={12} sm={6}>
        <Button variant="contained" endIcon={<AddCircleIcon />} type="submit" >
                
                    เพิ่มเอกลักษณ์
        </Button>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="กำลังแก้ไข"
          />
        </Grid>
          </Grid>
                <Button
                  variant="contained" 
                  endIcon={<ClearIcon/>}  
                  color="error"
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: 'ต้องการลบตัวละครนี้หรือไม่',
                      subTitle: '',
                      onConfirm: (e) => {deleteCharacter(e)}
                    })
                  }} 
                >
                  ลบตัวละคร
                </Button>
                <Button 
                  variant="contained" 
                  endIcon={<CheckIcon />} 
                  type="submit" 
                  color="success"
                  onClick={updateCharacter}
                >
                  บันทึกการแก้ไข
                </Button>
            </Paper>
          </Container>
        </ThemeProvider>
      </form>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
    
        );
    
}

export default GetCharacterDetails;