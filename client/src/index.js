import React, {useContext, useReducer} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainProject from './views/Main-Project/Main-Project.js';
import CreateProject from './views/Main-Project/CreateProject.js';
import MyProject from './views/MyProject/MyProject';
import MyCharacter from './views/MyCharacter/MyCharacter';
import EditCharacter from './views/MyCharacter/EditCharacter.js';
import CharacterDetails from './views/MyCharacter/CharacterDetails.js';
import MyMap from './views/MyMap/MyMap';
import MyStory from './views/MyStory/MyStory'
import MyTimeline from './views/MyTimeline/MyTimeline';
import LoginPage from './views/Login-page/Login-page';
import EditTimeline from './views/MyTimeline/EditTimeline';
import EditMap from './views/MyMap/EditMap';
import EditStory from './views/MyStory/EditStory';
import ChapterDetail from './views/MyStory/ChapterDetail';
import TimelineDetails from './views/MyTimeline/TimelineDetails';
import VersionMenu from './views/Main-Project/VersionMenu';
import Context from './context';
import reducer from './reducer';
import ProtectedRoute from './ProtectedRoute';

const Root = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log({state})

  return(
    <BrowserRouter>
      <Context.Provider value={{state, dispatch}}>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>  
          <Route element={<ProtectedRoute/>}>
            <Route path="/main-project" element={<MainProject/>}/>
            <Route path="/create-project" element={<CreateProject/>}/>
            <Route path="/myproject" element={<MyProject/>}/>
            <Route path="/mycharacter" element={<MyCharacter/>}/>
            <Route path="/editcharacter" element={<EditCharacter/>}/>
            <Route path="/characterdetails" element={<CharacterDetails/>}/>
            <Route path="/mymap" element={<MyMap/>}/>
            <Route path="/mystory" element={<MyStory/>}/>
            <Route path="/mytimeline" element={<MyTimeline/>}/>
            <Route path="/edittimeline" element={<EditTimeline/>}/>
            <Route path="/timelinedetails" element={<TimelineDetails/>}/>
            <Route path="/editmap" element={<EditMap/>}/>
            <Route path="/editstory" element={<EditStory/>}/> 
            <Route path="/chapterdetail" element={<ChapterDetail/>}/> 
            <Route path="/versionmenu" element={<VersionMenu/>}/> 

          </Route>

            {/* <Route path="/main-project" element={ <MainProject/>}/>
            <Route path="/create-project" element={<CreateProject/>}/>
            <Route path="/myproject" element={<MyProject/>}/>
            <Route path="/mycharacter" element={<MyCharacter/>}/>
            <Route path="/editcharacter" element={<EditCharacter/>}/>
            <Route path="/mymap" element={<MyMap/>}/>
            <Route path="/mystory" element={<MyStory/>}/>
            <Route path="/mytimeline" element={<MyTimeline/>}/> 
            <Route path="/edittimeline" element={<EditTimeline/>}/>
            <Route path="/editmap" element={<EditMap/>}/>
            <Route path="/editstory" element={<EditStory/>}/> */}
    
        </Routes>
      </Context.Provider>
    </BrowserRouter>   
  )
}

ReactDOM.render(
    <Root />, document.getElementById('root')
);

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root')
// );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
