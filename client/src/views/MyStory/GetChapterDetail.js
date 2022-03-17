import * as React from 'react';
import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css'
import "./style.css";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import ConfirmDialog from '../../components/ConfirmDialog'
import Context from '../../context';
import { useClient } from '../../client';
import { SELECTED_PROJECT } from "../../graphql/queries";
import { DELETE_CHAPTER_MUTATION } from '../../graphql/mutations';

export default function GetChapterDetail(){

    const navigate = useNavigate();
    const {state} = useContext(Context);
    const {currentProject} = state;
    const client = useClient();
    const [name, setName] = useState();
    const [order, setOrder] = useState(0);
    const [characters, setCharacters] = useState();
    const [content, setContent] = useState();
    const [confirmDialog, setConfirmDialog ] = useState({isOpen: false, title: '', subTitle: ''})

    const getChapterDetail = async() => {
        const chapterId = localStorage.getItem("chapterId");
        const projectId = localStorage.getItem("projectId");
        const projectVariable = {_id: projectId}
        const project = await client.request(SELECTED_PROJECT, projectVariable);
        const chapter = await project.selectedProject.chapters.find(e => e._id === chapterId);
        if(chapter){
            console.log(chapter)
            setName(chapter.name)
            setOrder(chapter.order)
            setCharacters(chapter.characters)
            setContent(chapter.content)
        }
    }

    const deleteChapter = async event => {
        event.preventDefault();
        setConfirmDialog({
        ...confirmDialog,
        isOpen: false
        })
        const chapterId = localStorage.getItem("chapterId");
        const projectId = currentProject._id
        const variables = {chapterId, projectId}
        const deleteChapter = await client.request(DELETE_CHAPTER_MUTATION, variables)
        if(deleteChapter){
            console.log(deleteChapter)
            navigate('/mystory')
        }else{
            console.log('error deleting timeline')
        }
    }

    useEffect(() => {
        getChapterDetail();
    }, []);

    return(
        <div href="node_modules/react-quill/dist/quill.snow.css">
            <Box>
            <TextField
                id="outlined-uncontrolled"
                label="ชื่อตอน"
                multiline={false}
                variant="standard"
                fullWidth
                sx={{ mt: 1 }}
                value={name || ''}
            />
            <TextField
                id="outlined-uncontrolled"
                label="ลำดับของตอน"
                multiline={false}
                variant="standard"
                fullWidth
                sx={{ mt: 1 }}
                value={order || ''}
            />
            <TextField
                id="outlined-uncontrolled"
                label="ตัวละคร"
                multiline={false}
                variant="standard"
                fullWidth
                sx={{ mt: 1 }}
                value={characters || ''}
            />
            </Box>
            <Box>
              <div dangerouslySetInnerHTML={{ __html: content }} />  
            </Box>
            
            <Button
                variant="contained" 
                endIcon={<ClearIcon/>}  
                //color="error"
                onClick={() => {
                    setConfirmDialog({
                        isOpen: true,
                        title: 'ต้องการลบตอนนี้หรือไม่',
                        subTitle: '',
                        onConfirm: (e) => {deleteChapter(e)}
                    })
                }} 
            >
                ลบตอน
            </Button>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    )
}