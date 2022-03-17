import React from "react";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import NewTimeline from "./NewTimeline";
import { polyfill } from "mobile-drag-drop";
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
require("dotenv").config();

polyfill();
window.addEventListener("touchmove", function () {});

const client = new ApolloClient({
  uri:process.env.SERVER_URI
});

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

function EditTimeline(){
    return(
    <ApolloProvider client={client}>
      <ThemeProvider theme={mdTheme}>
      <Header/>
      
      <NewTimeline/>

      <BottomNav/>

      </ThemeProvider>
      
    </ApolloProvider>
    )
};

export default  EditTimeline;