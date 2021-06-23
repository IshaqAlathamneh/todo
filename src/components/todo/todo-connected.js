import React, { useEffect, useState, useContext } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import { Button, Dropdown, Modal, Form, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './todo.scss';
import useForm from '../../hooks/form'
import useAjax from '../../hooks/ajax'
import axios from 'axios';
import Paagination from '../pagination'
import './todo.scss';
import MyContextProvider from '../../context/pag-prov.js';
import {AuthContext} from '../../context/authContext.js';
import Show from '../auth/role'
import Login from '../auth/login.js';
import Auth from '../auth/auth.js';

const todoAPI = 'https://ishaq-api.herokuapp.com/tasks';
const ToDo = ({ children }) => {
  const context = useContext(AuthContext)
  console.log('-1-2-3-1-2-3-',context);
  const [handleSubmit, handleChange, values] = useForm(cb)
  const [list, setList] = useState([]);
  const [editShow, setEditShow] = useState(false);
  const [popVal, setPopVal] = useState({})
  const [_addItem, _toggleComplete, handleDelete, _getTodoItems] = useAjax(list, setList);
  const [string, setString] = useState('')

  function cb(v) {
    let obj = {
      ...popVal,
      ...v
    }
    setPopVal(obj)
    if (popVal._id) {
      let myList = list.map(i => {
        if (i._id == popVal._id) {
          i = obj
        }
        return i;
      })
      let url = `${todoAPI}/${popVal._id}`;

      axios(url, {
        method: 'put',
        url: `/tasks/${popVal._id}`,
        mode: 'cors',
        baseURL: todoAPI,
        data: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-origin': todoAPI
        }
      })
        .then(savedItem => {
          setList(myList);
          setEditShow(false)
        })
        .catch(console.error);
    }
  }
  const changeEdit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    let myTask = list.filter(x => x.text === e.target.value)
    setString(myTask[0].text);
    setPopVal(myTask[0])
  }

  useEffect(_getTodoItems, []);

  return (
    <>

      <MyContextProvider list={list}>
        <Paagination list={list} />
      </MyContextProvider>
      <header>
        <h1>Home</h1>
        <nav>
          <h2>
            To Do List Manager ({list.filter(item => !item.complete).length})
          </h2>
        </nav>
      </header>
      {/* <Button variant="danger" onClick={context.logout} id="logout">Logout</Button> */}
    <Show condition={context.loggedIn}>

      <section className="todo">

        <div className="form">
          <TodoForm handleSubmit={_addItem} />
        </div>

        <div className="cards">
          <Paagination>
            <TodoList
              list={list}
              handleComplete={_toggleComplete}
              deleteItem={handleDelete}
            />
          </Paagination>
        </div>
      </section>
      <Auth action="update">
      <Button onClick={() => setEditShow(true)} id="edit">Edit Form</Button>
      <Modal
        size="lg"
        show={editShow}
        onHide={() => setEditShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit} >
            <Form.Control as="select" onChange={changeEdit}>
              {list.map((task, inx) => {
                return (
                  <option selected="selected" key={inx}>{task.text}</option>
                )
              })}

            </Form.Control>
            <br />
            <Form.Control type="text" placeholder="Task Text" name="text" onChange={handleChange} />
            <br />
            <Form.Control type="number" min="0" max="5" placeholder="Task Difficulty" name="difficulty" onChange={handleChange} />
            <br />
            <Form.Control type="text" placeholder="Task assignee" name="assignee" onChange={handleChange} />
            <br />
            <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
          </Form.Group>
        </Modal.Body>
      </Modal>
      </Auth>
    </Show>
              <Login/>
    
    
    </>
  );
};

export default ToDo;
