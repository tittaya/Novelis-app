import React from "react";
import "./styles.css";
import { Card, Button, Typography } from "@material-ui/core";
import Draggable from 'react-draggable';
import BottomNav from '../../components/BottomNav';
import TextField from '@mui/material/TextField';
import { Box } from "@material-ui/core";
import { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';
import Header from '../../components/Header';
import SaveIcon from '@mui/icons-material/Save';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import Crop54Icon from '@mui/icons-material/Crop54';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from '@mui/material/DialogActions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useClient } from '../../client';
import { CREATE_MAP_MUTATION } from "../../graphql/mutations";


import { PhotoshopPicker } from "react-color";

const mdTheme = createMuiTheme({
  palette: {
  primary: {
     main: "#967969" // This is an orange looking color
            },
  secondary: {
     main: "#F2D2BD" //Another orange-ish color
             }
        },

});
export default function EditMap() {

//dropdrop names
const [charName, setCharName] = React.useState('');

const handleChangeName = (event) => {
  setCharName(event.target.value);
};

  const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
    const [value, setValue] = React.useState(pathname);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  const [inputListSq, setInputListSq] = useState([]); //create Square

  const onAddBtnClickSq = (event) => {
    setInputListSq(inputListSq.concat(<DraggableCardSquare key={inputListSq.length} bgColor={colorTB} />));
    setOpenInputText(false);

  };

  const [inputListChar, setInputListChar] = useState([]); //create char

  const onAddBtnClickChar = (event) => {
    setInputListChar(inputListChar.concat(<DraggableCardPerson key={inputListChar.length} bgColor={colorGG} text={charName}  />));
    setOpenCrateChar(false);

  };

  const [inputListRel, setInputListRel] = useState([]); //create relation good

  const onAddBtnClickRel = (event) => {
    setInputListRel(inputListRel.concat(<DraggableCardEgood key={inputListRel.length} />));
    setOpenCrateEmo(false);

  };

  const [inputListRelB, setInputListRelB] = useState([]); //create relation bad

  const onAddBtnClickRelB = (event) => {
    setInputListRelB(inputListRelB.concat(<DraggableCardEbad key={inputListRelB.length} />));
    setOpenCrateEmo(false);

  };

  const [inputListTf, setInputListTf] = useState([]); //create textfeild

  const onAddBtnClickTf = (event) => {
    setInputListTf(inputListTf.concat(<DraggableCardTest key={inputListTf.length} />));
  };

 
  const [openColorPick, setOpenColorPick] = useState(false);
  const [openInputText, setOpenInputText] = useState(false);
  const [openCrateChar, setOpenCrateChar] = useState(false);
  const [openCrateEmo, setOpenCrateEmo] = useState(false);



  // const handleClickOpenColorPick = () => {
  //   setOpenColorPick(true);
  // };

  const handleClickOpenCrateChar = () => {
    setOpenCrateChar(true);
  };


  const handleClickOpenInputText = () => {
    setOpenInputText(true);
  };

  
  const handleClickOpenEmo = () => {
    setOpenCrateEmo(true);
  };


  const handleClose = () => {
    setOpenColorPick(false);
    setOpenInputText(false);
    setOpenCrateChar(false);
    setOpenCrateEmo(false);


  };
  

  const [colorGG, setColorGG] = useState("#D05454"); //color
  const [colorTB, setColorTB] = useState("#D05454"); //color


  const DraggableCard = ({ text, bgColor }) => {
    return (
      <Draggable>
        <Card
          style={{ width: "0px", backgroundColor: bgColor, color: "#ffffff" }}
        >
          <Button variant="text">BUY</Button>
          <Typography variant="h6">{text}</Typography>
        </Card>
      </Draggable>
    );
  };

  const DraggableCardPerson = ({ text, bgColor }) => {
    return (
      <Draggable>
        <Card
          style={{ width: "150px",height:"65px", backgroundColor: bgColor, color: "#ffffff" }}
          
        >
           <Button label="ตัวละคร"  color="primary" aria-label="add" style={{ width: "100px", height:"65px", backgroundColor: bgColor, color: "#ffffff" }} >
          <PersonIcon />
          <Typography variant="h6">{text}</Typography>
        </Button>
  
        </Card>
      </Draggable>

      
    );
  };
  
  const DraggableCardSquare = ({ text, bgColor }) => {
    return (
      <Draggable>
       
        <Card
          style={{ width: "200px", backgroundColor: bgColor, color: "#ffffff" }}
        >
           <TextField id="textsquare" variant="outlined" multiline rows={5} />
        </Card>
        
      </Draggable>
    );
  };
  
  // const DraggableCardCircle = ({ text, bgColor }) => {
  //   return (
  //     <Draggable>
  //       <Card
  //         style={{ width: "10%", backgroundColor: bgColor, color: "#ffffff" }}
  //       >
  //         <Button variant="text">BUY</Button>
  //         <Typography variant="h6">{text}</Typography>
  //       </Card>
  //     </Draggable>
  //   );
  // };
  
  // const DraggableCardTriangle = ({ text, bgColor }) => {
  //   return (
  //     <Draggable>
  //       <Card
  //         style={{ width: "40%", backgroundColor: bgColor, color: "#ffffff" }}
  //       >
  //         <Button variant="text">BUY</Button>
  //         <Typography variant="h6">{text}</Typography>
  //       </Card>
  //     </Draggable>
  //   );
  // };
  
  const DraggableCardEgood = ({ text, bgColor }) => {
    return (
      <Draggable>
      <Card
        style={{ width: "65px", height:"65px", backgroundColor:"#F75BCA", color: "#ffffff" }}
      >
        <Button color="primary" aria-label="add" style={{ width: "65px", height:"65px", backgroundColor: bgColor, color: "#ffffff" }} >
        <FavoriteIcon />
      </Button>
  
      </Card>
    </Draggable>
    );
  };
  
  const DraggableCardEbad = ({ text, bgColor }) => {
    return (
      <Draggable>
     
      <Card
        style={{ width: "65px", height:"65px", backgroundColor: "#1F1F1F", color: "#ffffff" }}
      >
         <Button color="primary" aria-label="add" style={{ width: "65px", height:"65px", backgroundColor: bgColor, color: "#ffffff" }} >
        <BoltIcon />
      </Button>
  
      </Card>
      
    </Draggable>
    );
  };
  
  const DraggableCardTest = ({ text, bgColor }) => {
    return (
      <Draggable>
       
        <Box
          style={{ width: "200px", backgroundColor: bgColor, color: "#ffffff" }}
        >
           <TextField id="textsquare" label="ข้อความ.." variant="outlined" multiline maxRows={5}/>
        </Box>
        
      </Draggable>
    );
  };

  const client = useClient();
  const [mapName, setMapName] = useState("");
  const [mapCharcters, setMapCharcters] = useState("");

  const createMap = async(e) => {
    e.preventDefault();
    const projectId = localStorage.getItem("projectId");
    const variables = {projectId, name: mapName, characters: mapCharcters}
    const mapCreated = await client.request(CREATE_MAP_MUTATION, variables)
    if(mapCreated){
      console.log(mapCreated)
    }else{
      console.log('error creating map')
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
        <Header/>
        
      <Box
      sx={{
        '& .MuiTextField-root': { m: 1 },
      }}>
      <TextField
        id="outlined-uncontrolled"
        label="ชื่อแผนผัง"
        //value={title || ''}
        multiline={false}
        variant="standard"
        fullWidth
        sx={{ mt: 1 }}
        //justifyContent="center"
        //align="center"
        onChange={e => setMapName(e.target.value)}
      />
      <TextField
        id="outlined-uncontrolled"
        label="ตัวละคร"
        //value={title || ''}
        multiline={false}
        variant="standard"
        fullWidth
        sx={{ mt: 1 }}
        //justifyContent="center"
        //align="center"
        onChange={e => setMapCharcters(e.target.value)}
      />

      </Box>

      <Dialog open={openCrateChar}  onClose={handleClose}>
        <DialogTitle>เพิ่มตัวละคร</DialogTitle>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">เลือกชื่อตัวละคร</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={charName}
          label="CharacterName"
          onChange={handleChangeName }
        >
          <MenuItem value={"ซาร่า"}>ซาร่า</MenuItem>
          <MenuItem value={"ปีเตอร์"}>ปีเตอร์</MenuItem>
          <MenuItem value={"เดวิด"}>เดวิด</MenuItem>
        </Select>
      </FormControl>
        <DialogContent>
        
        <PhotoshopPicker
        color={colorGG}
        onChange={colorGG => {
          setColorGG(colorGG.hex);
        }}
      />
 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={onAddBtnClickChar}>สร้าง</Button>
        </DialogActions>
      </Dialog>



      <Dialog open={openCrateEmo}  onClose={handleClose}>
        <DialogTitle>เพิ่มความสัมพันธ์</DialogTitle>
        <DialogContent>
        <Button startIcon={<FavoriteIcon />} onClick={onAddBtnClickRel}>รัก</Button>
        <Button startIcon={<BoltIcon />} onClick={onAddBtnClickRelB}>เกลียด</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
        </DialogActions>
      </Dialog>



      <Dialog open={openInputText}  onClose={handleClose}>
        <DialogTitle>เพิ่มกล่องข้อความสี</DialogTitle>
        <DialogContent>
        
        <PhotoshopPicker
        color={colorTB}
        onChange={colorTB => {
          setColorTB(colorTB.hex);
        }}
      />
 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={onAddBtnClickSq}>สร้าง</Button>
        </DialogActions>
      </Dialog>





      <Dialog open={openColorPick} onClose={handleClose}>
        <DialogTitle>สี</DialogTitle>
        <DialogContent>
        <PhotoshopPicker
        color={colorGG}
        onChange={colorGG => {
          setColorGG(colorGG.hex);
        }}
      />
 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={handleClose}>บันทึก</Button>
        </DialogActions>
      </Dialog>


          <DraggableCard />
          
          {inputListSq}
          {inputListChar}
          {inputListRel}
          {inputListTf}
          {inputListRelB}


          <Box sx={{ pb: 7 }} >
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 55, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={value} onChange={handleChange} showLabels={true}
        >
          <BottomNavigationAction onClick={handleClickOpenCrateChar} label="ตัวละคร" value='/person' icon={<CoPresentIcon/>} />
          <BottomNavigationAction onClick={handleClickOpenInputText} label="สี่เหลี่ยม" value='/square' icon={<Crop54Icon />} />
          <BottomNavigationAction onClick={handleClickOpenEmo} label="ความสัมพันธ์" value='/emotion' icon={<EmojiEmotionsIcon />} />
          <BottomNavigationAction onClick={onAddBtnClickTf} label="ข้อความ" value='/text' icon={<TextFieldsIcon />} />
          <BottomNavigationAction label="บันทึก" value='/saveicon' icon={<SaveIcon />} onClick={(e) => createMap(e)}/>
          
        </BottomNavigation>
      </Paper>
    </Box>





      <BottomNav/>
      
      
    </ThemeProvider>
  );
}

/**
 * Material-UI Card that you can drag and drop anywhere.
 */
// const DraggableCard = ({ text, bgColor }) => {
//   return (
//     <Draggable>
//       <Card
//         style={{ width: "0px", backgroundColor: bgColor, color: "#ffffff" }}
//       >
//         <Button variant="text">BUY</Button>
//         <Typography variant="h6">{text}</Typography>
//       </Card>
//     </Draggable>
//   );
// };

// const DraggableCardPerson = ({ text, bgColor }) => {
//   return (
//     <Draggable>
//       <Card
//         style={{ width: "px",height:"px", backgroundColor: bgColor, color: "#ffffff" }}
        
//       >
//          <Button color="primary" aria-label="add" style={{ width: "65px", height:"65px", backgroundColor: bgColor, color: "#ffffff" }} >
//         <PersonIcon />
//       </Button>

//       </Card>
//     </Draggable>
//   );
// };

// const DraggableCardSquare = ({ text, bgColor }) => {
//   return (
//     <Draggable>
     
//       <Card
//         style={{ width: "200px", backgroundColor: bgColor, color: "#ffffff" }}
//       >
//          <TextField id="textsquare" variant="outlined" multiline rows={5} />
//       </Card>
      
//     </Draggable>
//   );
// };

// const DraggableCardCircle = ({ text, bgColor }) => {
//   return (
//     <Draggable>
//       <Card
//         style={{ width: "10%", backgroundColor: bgColor, color: "#ffffff" }}
//       >
//         <Button variant="text">BUY</Button>
//         <Typography variant="h6">{text}</Typography>
//       </Card>
//     </Draggable>
//   );
// };

// const DraggableCardTriangle = ({ text, bgColor }) => {
//   return (
//     <Draggable>
//       <Card
//         style={{ width: "40%", backgroundColor: bgColor, color: "#ffffff" }}
//       >
//         <Button variant="text">BUY</Button>
//         <Typography variant="h6">{text}</Typography>
//       </Card>
//     </Draggable>
//   );
// };

// const DraggableCardEgood = ({ text, bgColor }) => {
//   return (
//     <Draggable>
//     <Card
//       style={{ width: "65px", height:"65px", backgroundColor: bgColor, color: "#ffffff" }}
//     >
//       <Button color="primary" aria-label="add" style={{ width: "65px", height:"65px", backgroundColor: bgColor, color: "#ffffff" }} >
//       <FavoriteIcon />
//     </Button>

//     </Card>
//   </Draggable>
//   );
// };

// const DraggableCardEbad = ({ text, bgColor }) => {
//   return (
//     <Draggable>
   
//     <Card
//       style={{ width: "65px", height:"65px", backgroundColor: bgColor, color: "#ffffff" }}
//     >
//        <Button color="primary" aria-label="add" style={{ width: "65px", height:"65px", backgroundColor: bgColor, color: "#ffffff" }} >
//       <BoltIcon />
//     </Button>

//     </Card>
    
//   </Draggable>
//   );
// };

// const DraggableCardTest = ({ text, bgColor }) => {
//   return (
//     <Draggable>
     
//       <Card
//         style={{ width: "200px", backgroundColor: bgColor, color: "#ffffff" }}
//       >
//          <TextField id="textsquare" label="ข้อความ.."  variant="outlined" multiline maxRows={5}/>
//       </Card>
      
//     </Draggable>
//   );
// };



/**
 * Material-UI Button in a Card. You can drag and drop the button
 * anywhere within the card.
 */
// const DraggableButtonInCard = ({ text, bgColor }) => {
//   return (
//     <Card style={{ width: "40%", backgroundColor: bgColor, color: "#ffffff" }}>
//       <Draggable>
//         <Button variant="text">BUY</Button>
//       </Draggable>
//       <Typography variant="h6">{text}</Typography>
//     </Card>
//   );
// };


//<Box sx={{ display: 'flex', justifyContent: 'center', }}>