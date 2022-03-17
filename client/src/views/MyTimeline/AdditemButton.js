import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';

export default function AdditemButton() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  
  const floatingMenuButtonStyle = {
   
    alignSelf: 'flex-end',
    position: 'fixed',
    bottom: '15%',
    right: '10%' }

  return (
    
      <Stack spacing={10}>
      <Fab color="primary" style={floatingMenuButtonStyle}  aria-label="add" onClick={handleClickOpen}
                sx={{ 
                }}>
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
          <Button onClick={handleClose}>บันทึก</Button>
        </DialogActions>
      </Dialog>
      </Stack>
    
  );
}