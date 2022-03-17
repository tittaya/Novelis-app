import * as React from 'react';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import ChapterList from './ChapterList';
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

function MyStory() {

  const client = new ApolloClient({
    uri:process.env.SERVER_URI
  });

  // const [open, setOpen] = React.useState(true);
  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={mdTheme}>
        <Header/>
        <ChapterList />
        <BottomNav/>
      </ThemeProvider>
    </ApolloProvider>
    
  );
}


export default MyStory;