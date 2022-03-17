import React, {useContext} from 'react';
import {Navigate, Outlet} from 'react-router-dom';

import Context from './context';

const ProtectedRoute = () => {
    const { state } = useContext(Context);
    return state.isAuth ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute;