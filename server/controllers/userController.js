const User = require('../models/user')
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)

exports.findOrCreateUser = async token => {
    const googleUser = await verifyAuthToken(token) 
    const user = await checkIfUserExists(googleUser.email);
    if(user){
        return user
    }else{
        return createNewUser(googleUser);
    }
}

const verifyAuthToken = async token => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
        })
        return ticket.getPayload()
        
    } catch (err) {
        console.error("Error verifying auth token", err)
        
    }
}

const checkIfUserExists = async email => await User.findOne({email}).exec();
     
const createNewUser = googleUser => {

    const name = googleUser.name;
    const email = googleUser.email;
    const picture = googleUser.picture;
    const newUser = { name, email, picture }
    return new User(newUser).save()
}