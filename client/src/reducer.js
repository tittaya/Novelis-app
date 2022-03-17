export default function reducer(state, {type, payload}){
    switch(type){
        case "LOGIN_USER":
            return{
                ...state,
                currentUser: payload
            };
        case "IS_LOGGED_IN":
            return{
                ...state,
                isAuth: payload
            };
        case "LOGOUT_USER":
            return{
                ...state,
                isAuth: false,
                currentUser: null
            };
        case "GET_USER_PROJECTS":
            return{
                ...state,
                userProjects: payload
            }
        case "SELECT_PROJECT":
            return{
                ...state,
                currentProject: payload
            }
        case "CREATE_PROJECT":
            const newProject = payload
            const userProjects = state.userProjects
            const prevProjects = Object.values(userProjects).filter(project => project._id !== newProject._id)
            return{
                ...state,
                userProjects: [...prevProjects, newProject]
            }
        default:
            return state; 
    }
}