import React,{useState, useContext, useEffect} from "react";
import { useNavigate} from 'react-router-dom';
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
import Context from '../../context';
import { useClient } from '../../client';
import { CREATE_CHARACTER_MUTATION} from '../../graphql/mutations';
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


function AddCharacter() {
    
  const {state} = useContext(Context);
  const {currentProject} = state;
  const navigate = useNavigate();
  const client = useClient();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [display_name, setDisplay_name] = useState("");
  var now = new Date();
  var isoString = now.toISOString().slice(0,10)
  const [dob, setDOB] = useState(isoString);
  const [biography, setBiography] = useState("");
  const [uniqueness, setUniqueness] = useState([]);
  const [uniquenessInput, setUniquenessInput] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  

  useEffect(() => {
    setUniqueness([""])
    console.log(currentProject._id)
  }, [])

  const addMoreUniqness = e => {
    e.preventDefault();
    setUniqueness([...uniqueness, "uniqness"]);
  }

  const addUniqnessInput = (i,e) => {
    const items = uniquenessInput;
    if(e.target.value !== ""){
      items[i] = e.target.value;
      setUniquenessInput(items);
      console.log(uniquenessInput)
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

  const handleDateChange = e => {
    const dateInput = e.target.value
    setDOB(dateInput)
    console.log(dob)
  }

  const handleSubmit = async event =>{
    try{
      event.preventDefault();
      setSubmitting(true);
      const url = await handleImageUpload();
      const projectId = currentProject._id
      const variables = {projectId, name, image: url, display_name, dob, biography, uniqueness: uniquenessInput}
      const {createCharacter} = await client.request(CREATE_CHARACTER_MUTATION, variables)
      console.log("Character created",createCharacter);
      setSubmitting(false);
      if(submitting === false){
        navigate('/mycharacter')
      }
    }catch(err){
      setSubmitting(false);
      console.log("Error creating character", err);
    }
        
  }
    
  return(
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
        สร้างตัวละคร
        </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <input 
            type="file"
            onChange={e => setImage(e.target.files[0])}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Character Name"
            label="ชื่อตัวละคร"
            fullWidth
            variant="standard"
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
            required
            id="background"
            label="ประวัติตัวละคร"
            type="passtextword"
            fullWidth
            variant="standard"
            onChange={e => setBiography(e.target.value)}
          />
        </Grid>
        {uniqueness.map((item, i) =>{
          var count = uniquenessInput.length;
          return(
             <Grid item xs={12} sm={6}>
              <TextField
                id="city"
                name="city"
                label='เอกลักษณ์'
                fullWidth
                variant="standard"
                onChange={(e) => addUniqnessInput(count,e)}
              />
            </Grid>
          )
        }
          
        )}
        
        <Grid item xs={12} sm={6}>
          <Button 
            variant="contained" 
            endIcon={<AddCircleIcon />} 
            type="submit" 
            onClick={addMoreUniqness}
          >
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
                  endIcon={<CheckIcon />} 
                  type="submit" 
                  color="success"
                  onClick={handleSubmit}
                  >
                    บันทึกข้อมูล
                </Button>
                </Paper>
      </Container>
    </ThemeProvider>
            </form>
        );
    
}

export default AddCharacter;