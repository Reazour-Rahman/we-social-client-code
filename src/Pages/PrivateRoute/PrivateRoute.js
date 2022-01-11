import { Progress } from '@chakra-ui/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();

    // loader for not logout on reload
    if (isLoading) {
        return <div className='text-center'>
            <div class="text-center">
            <div class="spinner-border" role="status">
            <Progress size='xs' isIndeterminate />
            </div>
            </div>
        </div>
    }
    // private route
    return (
        <Route
            {...rest}
            render={({ location }) => user.email ? children : <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location }
                }}
            ></Redirect>}
        ></Route>
    );
};

export default PrivateRoute;