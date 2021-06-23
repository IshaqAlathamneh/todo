import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import Show from './role';
function Auth(props) {
    const { loggedIn, user, validateAction } = useContext(AuthContext);
    // loggedIn && has action access 
    console.log('------', user);
    function validateActionn(action) {
        console.log('-------->>>', user)
        console.log('-------->>>', user.capabilities.includes(action))
        return user.capabilities.includes(action);
    }
    return (
        <Show condition={loggedIn && validateActionn(props.action)}>
            {props.children}
        </Show>
    )
}




export default Auth;