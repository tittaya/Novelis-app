import * as React from 'react';
import { ThemeProvider, createMuiTheme } from '@mui/material/styles';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import TimelineList from './TimelineList';
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

function MyTimeline() {

  const client = new ApolloClient({
    uri:process.env.SERVER_URI
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={mdTheme}>
          <Header/>
          <TimelineList/>
        <BottomNav/>
      </ThemeProvider>
    </ApolloProvider>
    
  );
}


export default MyTimeline;