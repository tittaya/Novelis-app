import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import GetCharacterDetails from './GetCharacterDetails';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/client';
require("dotenv").config();


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

function CharacterDetails() {

  const client = new ApolloClient({
    uri: process.env.SERVER_URI
  });
 
  const location = useLocation();
  const data = location.state;
  const [thisProjectId, setThisProjectId] = useState('');

  useEffect(() => {
    if(data){
      console.log(data.selectedProjectId)
      setThisProjectId(data.selectedProjectId)
      
    }
  }, [data]);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={mdTheme}>
      <Header/>
      <GetCharacterDetails/>
      <BottomNav thisProjectId={thisProjectId}/>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default CharacterDetails;