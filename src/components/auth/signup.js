
import React, {useContext, useState} from 'react';
import {Form, FormControl, Button, Dropdown, DropdownButton, ButtonGroup} from 'react-bootstrap'
import {AuthContext} from '../../context/authContext';
function SignUp() {
    const context = useContext(AuthContext);
    const [logn, setLogn] = useState({
        username: '',
        password: '',
        role:''
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
        console.log(logn);

        context.signup(logn.username, logn.password, logn.role);
    }
    const handleRole = e => {
        console.log(e.target.innerHTML);
        let val = e.target.innerHTML;
        setLogn( prev => {return {...prev,role:val}});
    }
    return (
        <Form inline className="ml-auto" onSubmit={handleSubmit} id="signupForm">
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
            <DropdownButton
                as={ButtonGroup}
                key={'secondary'}
                id={`dropdown-variants-secondary`}
                variant={'secondary'}
                title={'ROLE'}
                required
                name='role'
                onClick={handleRole}
            >
                <Dropdown.Item eventKey="admin">admin</Dropdown.Item>
                <Dropdown.Item eventKey="user">user</Dropdown.Item>
                <Dropdown.Item eventKey="editor" >
                editor
                </Dropdown.Item>
                
            </DropdownButton>
            <Button variant="primary" type="submit">
                SignUp
            </Button>
        </Form>
    )
}
export default SignUp;