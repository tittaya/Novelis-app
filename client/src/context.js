import { createContext } from 'react'

const Context = createContext({
    currentUser: null,
    isAuth: false,
    userProjects: null,
    currentProject: null
})

export default Context;