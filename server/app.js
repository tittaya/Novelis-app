const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {ApolloServer} = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { findOrCreateUser } = require('./controllers/userController');
require("dotenv").config();

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    
        context: async ({req}) => {
            let authToken = null;
            let currentUser = null;
            
            try {
                authToken = req.headers.authorization
                //console.log(authToken)
                if(authToken){
                    
                    //find or create user
                    currentUser = await findOrCreateUser(authToken)
                }
            } catch (err) {
                console.error('Unable to authenticate user with this token')
                //console.error(`Unable to authenticate user with token: ${authToken}`)
            }
            return { currentUser }
        }
        
    });
    await server.start();
  
    let PORT = process.env.PORT || 4000
  
    const app = express()
  
    app.use(cors())
    app.use(express.static('public'))
    app.get('*',(req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
    })

    server.applyMiddleware({ app })

    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
    mongoose.connection.once('open', () => {
        console.log('connected to database');
    })
  
    app.listen(PORT, () =>{
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    }
  
);
  
}

startServer()