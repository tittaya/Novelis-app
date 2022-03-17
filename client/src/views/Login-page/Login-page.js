import React, {useContext} from "react";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {Navigate} from 'react-router-dom';

import Login from "./Login";
import Context from "../../context";
require("dotenv").config();


const client = new ApolloClient({
  uri:process.env.SERVER_URI
});

export default function LoginPage() {
  const { state } = useContext(Context);
  if(state.isAuth){
    return(
      <Navigate to="/main-project"/>
    );
  }else{
    return (
    <ApolloProvider client={client}>
      <Login /> 
    </ApolloProvider>  
    );
  }

}
