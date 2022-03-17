import React, {useContext} from "react";
import GoogleLogin from 'react-google-login';
import {GraphQLClient} from 'graphql-request'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import Context from '../../context';
import { ME_QUERY } from "../../graphql/queries";
import { BASE_URL } from "../../client";
import config from '../../config.json'
require("dotenv").config();

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

function Login(){

  const {dispatch} = useContext(Context)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  
  const googleSuccess = async googleUser => {
      console.log({googleUser});
      try {
        const idToken = googleUser.getAuthResponse().id_token;
        const client = new GraphQLClient(BASE_URL, {
          headers: {authorization: idToken}
        })
        const {me} = await client.request(ME_QUERY);
        console.log({me});
        dispatch({ type: "LOGIN_USER", payload: me });
        dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() });
      } catch (error) {
        googleFailure(error);
      }
      
    };

  const googleFailure = (error) => {
      console.log(error);
      console.log('Google Sign In was unsuccessful. Try again later.');
    };
  
    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                pt: 20,
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                เข้าสู่ระบบ
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <Grid container>
                    <Grid item sx={{ mt: 3, mb: 2 }}>
                      <GoogleLogin 
                        clientId={config.GOOGLE_CLIENT_ID}
                        buttonText="Login with Google"
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                      />
                    </Grid>
                  </Grid>
                
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  
}

export default Login;