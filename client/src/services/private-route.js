import React  from "react";
import AuthService from "./auth.service";
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = AuthService.getCurrentUser();

    return(
        <Route
            {...rest}
            render={props => 
            isLoggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )}  
        /> 
    )
}

export default PrivateRoute;