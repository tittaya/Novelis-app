import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import { Stack } from '@mui/material';

export default function SearchAutocomplete() {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      title: '',
      year: '',
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: '',
    year: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
      year: parseInt(dialogValue.year, 10),
    });

    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, New) => {
         toggleOpen(true);
          if ( New === 1) {
            // timeout to avoid instant validation of the dialog's form.
            toggleOpen(true);

          }
        }}
      

  
        id="free-solo-dialog-demo"
        options={top100Films}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            toggleOpen(true);
            return option;
          }
          if (option.inputValue) {
            toggleOpen(true);
            return option.inputValue;
          }
          return option.title;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        sx={{ width: 300 }}
        freeSolo
        
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <SearchIcon />
                  {params.InputProps.startAdornment}
                </>
              )
            }}
          />
        )}

      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>ผลการค้นหา</DialogTitle>
          <DialogContent> 
            <Stack spacing={2}>
            <DialogContentText>
              ตัวละครนี้ปรากฎใน
            </DialogContentText>
           
            <Button  variant="contained" endIcon={<SendIcon />}>
            ตอนที่1 : ความโชคดีในวันที่อับโชค
          </Button>
          <Button variant="contained" endIcon={<SendIcon />}>
          ตอนที่2 : เข้าสู่โลกแห่งฝัน
          </Button>
          <Button variant="contained" endIcon={<SendIcon />}>
          ไทม์ไลน์ : โลกความ
          </Button>
          <Button variant="contained" endIcon={<SendIcon />}>
          ไทม์ไลน์ : โลกความฝัน
          </Button>
          </Stack>
          </DialogContent>
          <DialogActions>
            
            <Button onClick={handleClose}>ปิด</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

const top100Films = [
  { title: 'ซาร่า(นางเอก)', year: 1994 },
  { title: 'ปีเตอร์(พระเอก)', year: 1972 },
  { title: 'เดวิด', year: 1974 },
  
];