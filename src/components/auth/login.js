import React, {useContext, useState} from 'react';
import {AuthContext} from '../../context/authContext';
import {Form, FormControl, Button} from 'react-bootstrap'
import SignUp from './signup';
import Show from './role'

function Login (props) {

    const context = useContext(AuthContext); 
    const [logn, setLogn] = useState({
        username: '',
        password: ''
    })
    // I have access to this.context

    const handleChange = e => {
        console.log('handleChange', e.target.name);
        console.log('handleChange', e.target.value);
        let key = e.target.name;
        let val = e.target.value;
        setLogn( prev => {return {...prev,[key]:val}});
    }

    const handleSubmit = e => {
        e.preventDefault();
        e.target.reset();
        context.login(logn.username, logn.password);
    }
    return (
        <>
          {context.loggedIn ? (
            <Button variant="danger" className="ml-auto" onClick={context.logout} id={'logout'}>
              Logout
            </Button>
          ) : (
            <Form inline className="ml-auto" onSubmit={handleSubmit} id="signinForm">
              <FormControl
                className="mr-sm-2"
                placeholder="username"
                type="text"
                required
                name="username"
                onChange={handleChange}
              />
              <FormControl
                className="mr-sm-2"
                placeholder="password"
                type="password"
                required
                name="password"
                onChange={handleChange}
              />
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          )}
          <SignUp></SignUp>
        </>
      );
        // return (
        //     <>
        //         <Show condition={context.loggedIn}>
        //             <button onClick={context.logout}>Logout</button>
        //         </Show>
        //         <Show condition={!context.loggedIn}>
        //             <form onSubmit={handleSubmit}>
        //                 <input
        //                     name="username"
        //                     type="text"
        //                     onChange={handleChange} />
        //                 <input 
        //                     name="password"
        //                     type="password"
        //                     onChange={handleChange}/>
        //                 <button type="submit">Login</button>
        //             </form>
        //         </Show>
        //     </>
        // )
}

export default Login;