import * as React from 'react';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/client';
import CharacterList from './CharacterList';

import BottomNav from '../../components/BottomNav';
import Header from '../../components/Header';
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
function MyCharacter() {

  const client = new ApolloClient({
    uri:process.env.SERVER_URI
  });
  
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={mdTheme}>
        <Header/>
        <CharacterList />
        <BottomNav/>
      
      
      </ThemeProvider>
    </ApolloProvider>
    
  );
}


export default MyCharacter;