import React,{useState, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Context from '../../context';
import { useClient } from '../../client';
import { CREATE_PROJECT_MUTATION} from '../../graphql/mutations';
import config from '../../config.json'
require("dotenv").config();

const theme = createTheme();

function AddProject(){
  
  const navigate = useNavigate();
  const client = useClient();
  const {dispatch} = useContext(Context);
 
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", image)
    data.append("upload_preset", "Novelis")
    data.append("cloud_name", "myimagevideocloud")
    const res = await axios.post( config.CLOUDINARY_URL, data )
    return res.data.url
  }

  const handleSubmit = async event =>{
    try{
      event.preventDefault();
      setSubmitting(true);
      const url = await handleImageUpload();
      console.log({title, image, url, author, summary})
      const variables = {title, image: url, author, summary}
      const {createProject} = await client.request(CREATE_PROJECT_MUTATION, variables)
      dispatch({ type: "CREATE_PROJECT", payload: createProject})
      console.log("Project created",{createProject});
      setSubmitting(false);
      if(submitting === false){
      navigate('/main-project')
      }
    }catch(err){
      setSubmitting(false);
      console.log("Error creating project", err);
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
                สร้างผลงาน
                </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                ใส่รูปหน้าปกผลงาน *
                </Typography>
                  <input 
                    accept="imge/*"
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  required
                  name="title"
                  id="title"
                  label="ชื่อผลงาน"
                  fullWidth
                  variant="standard"
                  onChange={e => setTitle(e.target.value)}
                  
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="author"
                    name="author"
                    label="นามปากกา"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    onChange={e => setAuthor(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="summary"
                    name="summary"
                    label="เรื่องย่อ"
                    type="passtextword"
                    fullWidth
                    variant="standard"
                    onChange={e => setSummary(e.target.value)}
                  />
                </Grid>      
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                    label="อยู่ระหว่างแก้ไข"
                  />
                </Grid>
                </Grid>
                <Button 
                  variant="contained" 
                  endIcon={<AddCircleIcon />} 
                  onClick={handleSubmit} 
                  disabled={!title.trim() || !author.trim() || !image || submitting} 
                >
                  สร้างผลงาน
                </Button>
                </Paper>
              </Container>
            </ThemeProvider>
            </form>
        );
}

export default AddProject;