import React from "react";
import PropTypes from 'prop-types';
import {getUser} from '../misc/sessionManager'

AuthProtectNav.propTypes = {
    children: PropTypes.node
};

function AuthProtectNav({children, isAdminPage}) {
   const currentUser = getUser();
   if(!currentUser){
    return <div></div>;
   }
   const {is_admin} = currentUser.user; 

  if(!isAdminPage){
    return <>{children}</>;
  }else if (isAdminPage &&  is_admin == 1) {
    return <>{children}</>;
  } else {
    return <div></div>;
  }
}
export default AuthProtectNav;