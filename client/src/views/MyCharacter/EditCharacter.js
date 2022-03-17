import React from "react";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import AddCharacter from "./AddCharacter";
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
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

const client = new ApolloClient({
  uri: process.env.SERVER_URI
});

const cloudinary = process.env.CLOUDINARY_URL

function CreateProject(){
    return(
    <ApolloProvider client={client}>
      <ThemeProvider theme={mdTheme}>
      <Header/>
      <AddCharacter cloudinary={cloudinary}/>
      <BottomNav/>
      </ThemeProvider>
    </ApolloProvider>
    )
};

export default  CreateProject;
