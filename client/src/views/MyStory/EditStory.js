import React from "react";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import WriteArea from "./WriteArea";
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
require("dotenv").config();

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

function EditStory(){
    return(
    <ApolloProvider client={client}>
      <ThemeProvider theme={mdTheme}>
      <Header/>
      <WriteArea/>
      <BottomNav/>
      </ThemeProvider>
    </ApolloProvider>
    )
};

export default  EditStory;