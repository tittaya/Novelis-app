import "./TimelineA.css";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box } from "@mui/system";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import AddchartIcon from '@mui/icons-material/Addchart';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import SaveIcon from '@mui/icons-material/Save';
import ConfirmDialog from '../../components/ConfirmDialog'
import Context from '../../context';
import { useClient } from '../../client';
import { SELECTED_PROJECT } from '../../graphql/queries';
import { CREATE_TIMELINE_BOX_MUTATION, UPDATE_TIMELINE_MUTATION, DELETE_TIMELINE_MUTATION} from '../../graphql/mutations';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "#D2B48C	" : "#f5ebe6",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#483C32	" : "#877e78",
  padding: grid,
  width: 500
});



export default function Timeline() {

  const itemArray = [
    {id: "item-0", content: "content 1"},
    {id: "item-1", content: "content 2"},
    {id: "item-2", content: "content 3"}
  ]
  

  const [open, setOpen] = React.useState(false);
  //const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const client = useClient();
  const navigate = useNavigate();
  const {state} = useContext(Context);
  const {currentProject} = state;
  const [items, setItems] = useState(itemArray); 
  const [timelineName, setTimelineName] = useState("");
  const [characters, setCharacters] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [boxName, setBoxName] = useState("");
  const now = new Date();
  const isoString = now.toISOString().slice(0,10);
  const [boxDate, setBoxDate] = useState(isoString);
  const [boxEvent, setBoxEvent] = useState("");
  const [boxCharacter, setBoxCharacter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmDialog, setConfirmDialog ] = useState({isOpen: false, title: '', subTitle: ''})

  const findTimeline = async (e) => {
    const projectId = localStorage.getItem("projectId");
    const projectVariable = {_id: projectId};
    const project = await client.request(SELECTED_PROJECT, projectVariable);

    const timelineId = localStorage.getItem("timelineId");
    console.log(timelineId);
    const timeline = await project.selectedProject.timelines.find(e => e._id === timelineId);
    console.log(timeline);
    console.log(timeline.box);
    if(timeline){
      setItems(timeline.box);
      setTimelineName(timeline.name);
      setCharacters(timeline.characters);
      setBoxes(timeline.box);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const pathname = window.location.pathname;
  const [value, setValue] = React.useState(pathname);
 
  const floatingMenuButtonStyle = {
    alignSelf: 'flex-end',
    position: 'fixed',
    bottom: '15%',
    right: '10%' 
  }

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
  };

  const addTimelineฺBox = async(e) => {
    e.preventDefault();
    setSubmitting(true);
    var i = items.length;
    const index = `item-${i}`;
    setItems([...items, {id: `item-${i}`, content: "a"}])
    const projectId = localStorage.getItem("projectId");
    const timelineId = localStorage.getItem("timelineId");
    const variables = {projectId, timelineId, name: boxName, id: index, date: boxDate, event: boxEvent, character: boxCharacter};
    const {createbox} = await client.request(CREATE_TIMELINE_BOX_MUTATION, variables);
    console.log(createbox);
    setOpen(false);
    setSubmitting(false);
    if(submitting === false){
      findTimeline();
      //navigate('/timelinedetails')
    }
  }

  const createBoxArray = () => {
    var box = [];
    items.forEach(item => {
      var boxItem = {
        id: `item-${items.indexOf(item)}`,
        name: item.name,
        date: item.date,
        event: item.event,
        character: item.character
      }
      box.push(boxItem)
    })
    return box
  }

  const updateTimeline = async(e) => {
    e.preventDefault();
    setSubmitting(true);
    const projectId = localStorage.getItem("projectId");
    const timelineId = localStorage.getItem("timelineId");
    const box = createBoxArray();
    console.log(box)
    const updateVariables = {projectId, timelineId, name: timelineName, characters, box};
    const updateTimeline = await client.request( UPDATE_TIMELINE_MUTATION, updateVariables);
    console.log(updateTimeline);
    setSubmitting(false);
    findTimeline();
  }

  const deleteTimeline = async event => {
    event.preventDefault();
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    const timelineId = localStorage.getItem("timelineId");
    const projectId = currentProject._id
    const variables = {timelineId, projectId}
    const deleteTimeline = await client.request(DELETE_TIMELINE_MUTATION, variables)
    if(deleteTimeline){
      console.log(deleteTimeline)
      navigate('/mytimeline')
    }else{
      console.log('error deleting timeline')
    }
  }

  useEffect(() => {
    findTimeline();
  }, []);

  return (
    <div>
      <Box>
        <TextField
          id="outlined-uncontrolled"
          label="ชื่อไทม์ไลน์"
          multiline={false}
          variant="standard"
          fullWidth
          sx={{ mt: 1 }}
          value={timelineName || ''}
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
    <Box display="flex" justifyContent="center" alignItems="center">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"droppable"}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((box, idx) => (
                <Draggable key={box.id} draggableId={box.id} index={idx}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                        {/* <h4>{item.id}</h4> */}
                        <TextField
                          autoFocus
                          margin="dense"
                          id="title"
                          label="ชื่อเหตุการณ์"
                          fullWidth
                          variant="standard"
                          value={box.name || ''}
                        /> 
                        <TextField
                          autoFocus
                          margin="dense"
                          id="title"
                          label="เวลา(ไม่บังคับ)"
                          fullWidth
                          variant="standard"
                          value={box.date || ''}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="title"
                          label="เหตุการณ์"
                          fullWidth
                          variant="standard"
                          value={box.event || ''}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="title"
                          label="ตัวละคร"
                          fullWidth
                          variant="standard"
                          value={box.character || ''}
                        />
                        <Button 
                          variant="contained" 
                          endIcon={<CheckIcon/>} 
                          type="submit" 
                          color="success"
                          onClick={e => addTimelineฺBox(e, boxes.indexOf(box))}
                          >
                          บันทึกข้อมูล
                        </Button>
                        <Button 
                          variant="contained" 
                          endIcon={<ClearIcon/>} 
                          type="submit" 
                          color="error">
                          ลบ
                        </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
          
        </Droppable>
      </DragDropContext>
        
     <Stack spacing={10}>
      <Fab 
        color="primary" 
        style={floatingMenuButtonStyle}  
        aria-label="add" 
        onClick={handleClickOpen}
        sx={{ }}>
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>เพิ่มเหตุการณ์</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="ชื่อเหตุการณ์"
            fullWidth
            variant="standard"
            onChange={e => setBoxName(e.target.value)}
          /> 
           <TextField
            id="datetime-local"
            sx={{ mt: 4 }}
            label="วันที่และเวลา(ไม่บังคับ)"
            type="datetime-local"
            fullWidth
            defaultValue="2017-05-24T10:30"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => setBoxDate(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="event"
            label="เหตุการณ์"
            fullWidth
            variant="standard"
            onChange={e => setBoxEvent(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="character"
            label="แท็กตัวละคร"
            fullWidth
            variant="standard"
            onChange={e => setBoxCharacter(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={e => addTimelineฺBox(e)}>บันทึก</Button>
        </DialogActions>
      </Dialog>
      </Stack>
    </Box>
    <Button
      variant="contained" 
      endIcon={<ClearIcon/>}  
      //color="error"
      onClick={() => {
        setConfirmDialog({
          isOpen: true,
          title: 'ต้องการลบไทม์ไลน์นี้หรือไม่',
          subTitle: '',
          onConfirm: (e) => {deleteTimeline(e)}
        })
      }} 
    >
      ลบไทม์ไลน์
    </Button>
    <Box sx={{ pb: 7 }} >
        <CssBaseline />
        <Paper sx={{ position: 'fixed', bottom: 55, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            value={value} onChange={handleChange} showLabels={true}
          >
            <BottomNavigationAction label="เรียกดูไทม์ไลน์อื่น" value='/addtimeline' icon={<AddchartIcon/>} />
            
            
            <BottomNavigationAction label="เรียกดูแผนผัง" value='/addmap' icon={<DeviceHubIcon />} />
            <BottomNavigationAction label="บันทึก" value='/saveicon' icon={<SaveIcon />} onClick={(e) => updateTimeline(e)}/>
            
          </BottomNavigation>
        </Paper>
      </Box>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
  
}
