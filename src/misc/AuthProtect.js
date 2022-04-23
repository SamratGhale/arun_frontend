import React from 'react';
import PropTypes from 'prop-types';

import { pagePath, routes } from '../Routes/path';
import { getUser } from './sessionManager';
import { Redirect } from 'react-router-dom';
AuthProtect.propTypes = {
    children: PropTypes.node
};
function AuthProtect({ children, isAdminPage}) {
    const user = getUser(); //gets the user data from the local storage
    if (!user) {
        return <Redirect to={pagePath.app.login} />
    }

    if(!isAdminPage){
        return <>{children}</>
    }else if(isAdminPage &&  user.user.is_admin == 1){
        return <>{children}</>
    }else{
        return <Redirect to={routes.app} />
    }

}

export default AuthProtect;