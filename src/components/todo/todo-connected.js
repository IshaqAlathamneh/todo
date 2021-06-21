import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import { Button, Dropdown, Modal, Form, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './todo.scss';
import useForm from '../../hooks/form'
import useAjax from '../../hooks/ajax'
import axios from 'axios';

import './todo.scss';

const todoAPI = 'https://ishaq-api.herokuapp.com/tasks';


const ToDo = () => {

  const [handleSubmit, handleChange, values] = useForm(cb)
  const [list, setList] = useState([]);
  const [editShow, setEditShow] = useState(false);
  const [popVal, setPopVal] = useState({})
  const [_addItem, _toggleComplete, handleDelete, _getTodoItems] = useAjax(list, setList);
  const [editVal, setEditVal] = useState({})
  const [string, setString] = useState('')
  function cb (v) {
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
      <header>
        <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
        </h2>
      </header>

      <section className="todo">

        <div>
          <TodoForm handleSubmit={_addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={_toggleComplete}
            deleteItem={handleDelete}
          />
        </div>
      </section>
      {/* <DropdownButton variant="danger"  
      title="Delete Item"
      onSelect={handleDelete}>

        
          {
            list.map((task, inx) => {
              return (
                <Dropdown.Item key={inx} value={task} eventKey={task._id}>{task.text}</Dropdown.Item>
              )
            })
          }
        
      </DropdownButton> */}
      <Button onClick={() => setEditShow(true)}>Edit List</Button>
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
            <Form.Control type="text" placeholder="Task Text" name="text"  onChange={handleChange} />
            <br />
            <Form.Control type="number" min="0" max="5" placeholder="Task Difficulty" name="difficulty"  onChange={handleChange}/>
            <br />
            <Form.Control type="text" placeholder="Task assignee" name="assignee"  onChange={handleChange}/>
            <br/>
            <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
            </Form.Group>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ToDo;
