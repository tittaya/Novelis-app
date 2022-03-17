import * as React from 'react';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/client';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import MapList from './MapList';
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

function MyMap() {

  const client = new ApolloClient({
    uri:process.env.SERVER_URI
  });

  //const [open, setOpen] = React.useState(true);
  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };

  return (
    <ApolloProvider client={client}>
        <ThemeProvider theme={mdTheme}>
          <Header/>
          <MapList />
        <BottomNav/>
      </ThemeProvider>
    </ApolloProvider>
    
  );
}


export default MyMap;