import React from "react";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import AddProject from "./AddProject";
import MainProjectHeader from '../../components/MainProjectHeader';
require("dotenv").config();


const client = new ApolloClient({
  uri: process.env.SERVER_URI
});

function CreateProject(){
    return(
    <ApolloProvider client={client}>
      <MainProjectHeader/>
      <AddProject/>
    </ApolloProvider>
    )
};

export default  CreateProject;