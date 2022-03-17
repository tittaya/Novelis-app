import "./TimelineA.css";
import React from "react";
import { useState } from "react";
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
import { useClient } from '../../client';
import { CREATE_NEW_TIMELINE_MUTATION } from '../../graphql/mutations';


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



export default function NewTimeline() {
  const itemArray = [
      {id: "item-0", name: "", date: "", event: "", character: ""},
      {id: "item-1", name: "", date: "", event: "", character: ""},
    ]
  const client = useClient();
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = useState(itemArray);
  const [timelineName, setTimelineName] = useState("");
  const [characters, setCharacters] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const floatingMenuButtonStyle = {
    alignSelf: 'flex-end',
    position: 'fixed',
    bottom: '15%',
    right: '10%' 
  }


  const addEvent = (event) => {
    var i = items.length;
    event.preventDefault();
    setItems([...items, {id: `item-${i}`, name: "", date: "", event: "", character: ""}])
    setOpen(false);
  };


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

  const pathname = window.location.pathname;
  const [value, setValue] = React.useState(pathname);
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

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

  const addTimeline = async(e, index) => {
    e.preventDefault();
    setSubmitting(true);
    const projectId = localStorage.getItem("projectId");
    const box = createBoxArray();
    console.log(box)
    const variables = {projectId, name: timelineName, characters, box};
    console.log(variables)
    const createbox = await client.request(CREATE_NEW_TIMELINE_MUTATION , variables);
    console.log(createbox);
    setSubmitting(false);

  }


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
        onChange={e => setTimelineName(e.target.value)}
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
      <Box display="flex" justifyContent="center" alignItems="center">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={"droppable"}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, idx) => (
                  <Draggable key={item.id} draggableId={item.id} index={idx}>
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
                        
                          <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="ชื่อเหตุการณ์"
                            fullWidth
                            variant="standard"
                            onChange={e => {items[items.indexOf(item)].name = e.target.value}}
                          /> 
                          <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="เวลา(ไม่บังคับ)"
                            fullWidth
                            variant="standard"
                            type="datetime-local"
                            onChange={e => {items[items.indexOf(item)].date = e.target.value}}
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="เหตุการณ์"
                            fullWidth
                            variant="standard"
                            onChange={e => {items[items.indexOf(item)].event = e.target.value}}
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="ตัวละคร"
                            fullWidth
                            variant="standard"
                            onChange={e => {items[items.indexOf(item)].character = e.target.value}}
                          />
                          <Button 
                            variant="contained" 
                            endIcon={<CheckIcon/>} 
                            type="submit" 
                            color="success"
                            disabled={submitting}
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
            />
            <TextField
              autoFocus
              margin="dense"
              id="event"
              label="เหตุการณ์"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="character"
              label="แท็กตัวละคร"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>ยกเลิก</Button>
            <Button onClick={addEvent}>บันทึก</Button>
          </DialogActions>
        </Dialog>
        </Stack>
      </Box>
      
      <Box sx={{ pb: 7 }} >
        <CssBaseline />
        <Paper sx={{ position: 'fixed', bottom: 55, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            value={value} onChange={handleChange} showLabels={true}
          >
            <BottomNavigationAction label="เรียกดูไทม์ไลน์อื่น" value='/addtimeline' icon={<AddchartIcon/>} />
          
            <BottomNavigationAction label="เรียกดูแผนผัง" value='/addmap' icon={<DeviceHubIcon />} />
            <BottomNavigationAction label="บันทึก" value='/saveicon' icon={<SaveIcon />} onClick={addTimeline}/>
            
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
    
  );
  
}
