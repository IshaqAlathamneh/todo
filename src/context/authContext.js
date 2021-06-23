import React,{useState, useEffect} from 'react';
import cookie from 'react-cookies';
import useHandlers from '../hooks/handlers'
import base64 from 'base-64';
import jwt from 'jsonwebtoken';
const API_SERVER = 'https://api-js401.herokuapp.com';
export const AuthContext = React.createContext();

function AuthProvider (props) {
    const [user, setUser] = useState({
        loggedIn: false,
        user: {},
        capabilities: [],
        login, 
        logout, 
        validateAction,
        signup
    })
    let cap = [];
    // const [login, validateToken, setAuthState, logout, validateAction] = useHandlers(user, setUser);

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

    async function signup (username, password, role)  {
        // send username:password encoded -> add them to the Authorization header
        // prefixed with Basic XXXencoded_valueXXX
        const obj = {
            username, password, role
        }
        const result = await fetch(`${API_SERVER}/signup`, {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(obj)
        });

        let data = await result.json();
        console.log('ishaq------s-a-d-a-sd',data);
        // validateToken(data.token);
        // verify ==> with the secret
        // decode ==> does not need the secret
    }

    function validateToken  (token)  {
        // jwt.verify with the secret.
        const user = jwt.decode(token); // not very recommended
        if (user) {
            let arr = user.capabilities;
            setAuthState(true, user, token);
            cap = [...arr]
        }
    }

    function setAuthState  (loggedIn, user2, token)  {
        let obj = user2
        setUser(prev =>{return{...prev,loggedIn, user:{...obj}}});
        console.log('11111111111', user2);
        console.log('11111111111', user);
        // add the token to the browser cookies
        cookie.save('auth-token', token);
    }

    function logout  ()  {
        setAuthState(false, {}, null);
    }

    function validateAction  (action)  {
        console.log('-------->>>',user)
        console.log('-------->>>',user.capabilities.includes(action))
        return cap.includes(action);
    }
    useEffect (() => {
        // functional component, useEffect -> inital render
        console.log("component did mount", user)
        const token = cookie.load('auth-token'); // read the cookie from browser
        
        validateToken(token);
    }, [])

    
        return (
            <AuthContext.Provider value={user}>
                {props.children}
            </AuthContext.Provider>
        )
    
}

export default AuthProvider;