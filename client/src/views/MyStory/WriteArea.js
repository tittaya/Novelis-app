import * as React from 'react';
import { useState } from "react";
import QuilEditor from './QuilEditor';
import 'react-quill/dist/quill.snow.css'
import "./style.css";
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { useClient } from '../../client';
import { CREATE_CHAPTER_MUTATION } from '../../graphql/mutations';

export default function WriteArea() {

  const client = useClient();
  const [chapterName, setChapterName] = useState("");
  const [chapterOrder, setChapterOrder] = useState("");
  const [characters, setCharacters] = useState("");
  const [content, setContent] = useState("");

  const onEditorChange = (value) => {
    setContent(value);
    console.log(content)
  }

  const createChapter = async(e) => {
    e.preventDefault();
    const projectId = localStorage.getItem("projectId");
    const orderInt = parseInt(chapterOrder);
    const variables = {projectId, name: chapterName, characters, order: orderInt, content}
    const chapterCreated = await client.request(CREATE_CHAPTER_MUTATION, variables)
    if(chapterCreated){
      console.log(chapterCreated)
    }else{
      console.log('error creating chapter')
    }
  }

  return (
    <div href="node_modules/react-quill/dist/quill.snow.css">
      <Box>
      <TextField
        id="outlined-uncontrolled"
        label="ชื่อตอน"
        multiline={false}
        variant="standard"
        fullWidth
        sx={{ mt: 1 }}
        onChange={e => setChapterName(e.target.value)}
      />
      <TextField
        id="outlined-uncontrolled"
        label="ลำดับของตอน"
        multiline={false}
        variant="standard"
        fullWidth
        sx={{ mt: 1 }}
        onChange={e => setChapterOrder(e.target.value)}
      />
      <TextField
        id="outlined-uncontrolled"
        label="ตัวละคร"
        multiline={false}
        variant="standard"
        fullWidth
        sx={{ mt: 1 }}
        onChange={e => setCharacters(e.target.value)}
      />
      </Box>
      
      <QuilEditor
        placeholder={"write your story"}
        onEditorChange={onEditorChange}
      />
      <Grid item xs={12} align="center" sx={{p: 4,}}> 
      <Fab variant="extended" size="small" color="primary" aria-label="add" align="center" onClick={(e) => createChapter(e)} >
      บันทึกการแก้ไข
      <CheckIcon />
      </Fab>
      </Grid>
    </div>
    
  );
}

