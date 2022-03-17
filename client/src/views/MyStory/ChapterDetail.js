import React from "react";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import GetChapterDetail from './GetChapterDetail';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
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

function ChapterDetail(){
    return(
    <ApolloProvider client={client}>
      <ThemeProvider theme={mdTheme}>
        <Header/>
        <GetChapterDetail/>
        <BottomNav/>
      </ThemeProvider>
    </ApolloProvider>
    )
};

export default  ChapterDetail;
