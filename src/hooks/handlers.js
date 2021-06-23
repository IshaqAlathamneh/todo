import base64 from 'base-64';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
const API_SERVER = 'https://api-js401.herokuapp.com';
function useHandlers(user, setUser) {


    async function login (username, password)  {
        // send username:password encoded -> add them to the Authorization header
        // prefixed with Basic XXXencoded_valueXXX
        const encoded = base64.encode(`${username}:${password}`);
        const result = await fetch(`${API_SERVER}/signin`, {
            method: 'post',
            headers: {Authorization: `Basic ${encoded}`}
        });

        let data = await result.json();
        console.log(data);
        validateToken(data.token);
        // verify ==> with the secret
        // decode ==> does not need the secret
    }

    function validateToken  (token)  {
        // jwt.verify with the secret.
        const user = jwt.decode(token); // not very recommended
        if (user) {
            setAuthState(true, user, token);
        }
    }

    function setAuthState  (loggedIn, user, token)  {
        setUser(prev =>{return{...prev,loggedIn, user}});
        console.log('11111111111', user);
        // add the token to the browser cookies
        cookie.save('auth-token', token);
    }

    function logout  ()  {
        setAuthState(false, {}, null);
    }

    function validateAction  (action)  {
        console.log('-------->>>',user)
        return user.user.capabilities.includes(action);
    }
    return [login, validateToken, setAuthState, logout, validateAction]
}
export default useHandlers;