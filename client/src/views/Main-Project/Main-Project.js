import React from "react";
import Box from '@mui/material/Box';
import MainProjectHeader from "../../components/MainProjectHeader";
import Container from '@mui/material/Container';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/client';
import ProjectList from './ProjectList';
import ButtonNewProject from './ButtonNewProject';
require("dotenv").config();

const client = new ApolloClient({
  uri:process.env.SERVER_URI
});


const theme = createMuiTheme({
  palette: {
    primary: {
       main: "#967969" // This is an orange looking color
              },
    secondary: {
       main: "#F2D2BD" //Another orange-ish color
               }
          },
  
  });

export default function MyProject() {

  return (

    <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <MainProjectHeader/>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pb: 6,
          }}
        >
          <Container maxWidth="md" >
            <ProjectList/>
          </Container>
        </Box>
        <Box display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="20vh">
        <ButtonNewProject/>
        </Box>
      </main>
    </ThemeProvider>
    </ApolloProvider>  
  );
}