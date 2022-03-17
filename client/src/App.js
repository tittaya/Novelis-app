import React from 'react';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import MainProject from './views/Main-Project/Main-Project.js';
import CreateProject from './views/Main-Project/CreateProject.js';
import MyProject from './views/MyProject/MyProject';
import MyCharacter from './views/MyCharacter/MyCharacter';
import EditCharacter from './views/MyCharacter/EditCharacter.js';
import MyMap from './views/MyMap/MyMap';
import MyStory from './views/MyStory/MyStory';
import MyTimeline from './views/MyTimeline/MyTimeline';
import LoginPage from './views/Login-page/Login-page';

function App() {
  
  return (
        <Routes>
        <Route path="/main-project" element={<MainProject/>} />
        <Route path="/create-project" element={<CreateProject/>} />
        <Route path="/myproject" element={<MyProject/>} />
        <Route path="/mycharacter" element={<MyCharacter/>} />
        <Route path="/editcharacter" element={<EditCharacter/>} />
        <Route path="/mymap" element={<MyMap/>} />
        <Route path="/mystory" element={<MyStory/>} />
        <Route path="/mytimeline" element={<MyTimeline/>} />
        <Route path="/login" element={<LoginPage/>} />       
        </Routes>
  );
}

export default App;