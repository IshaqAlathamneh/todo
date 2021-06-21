import React, { useState, useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import { Button, Dropdown, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './todo.scss';

function ToDo() {
  const [list, setList] = useState([])
  const [editShow, setEditShow] = useState(false);
  const [popVal, setPopVal] = useState({})
  const [editVal, setEditVal] = useState({})
  const [string, setString] = useState('')
  useEffect(() => {

    let list = [
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' },
    ];

    setList(list);
  }, [])

  useEffect(()=>{
    document.title = `There are ${list.filter(item => !item.complete).length} Items To Complete`
  })
  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList(prev => [...prev, item]);
  };

  const toggleComplete = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      let myList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(myList);
    }
  };
  const handleDelete = (e) => {
    let myList = list.filter(item => item.text !== e.target.innerHTML)
    setList(myList)
  }
  const changeEdit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    let myTask = list.filter(x => x.text === e.target.value)
    setString(myTask[0].text);
    setPopVal(myTask[0])
  }
  const editData = (e) => {
    e.preventDefault();
    let data = list.map(x => {
      console.log('-------', x);
      console.log('popVal.text-------', string);
      if(x.text == string) {
      x = {...x, ...editVal}
      console.log(x);
      }
      return x;
    })
    setList(data)
  }
  const changeText = (e) => {
    console.log('text', e.target.value);
    let text = e.target.value;
    setPopVal(prev => { return{...prev, text}})
    setEditVal(prev => { return{...prev, text}})
  }
  const changeDiff = (e) => {
    console.log('Diff', e.target.value);
    let difficulty = e.target.value;
    setPopVal(prev => { return{...prev, difficulty}})
    setEditVal(prev => { return{...prev, difficulty}})
  }
  const changeAssig = (e) => {
    console.log('Assig', e.target.value);
    let assignee = e.target.value;
    setPopVal(prev => { return{...prev, assignee}})
    setEditVal(prev => { return{...prev, assignee}})
  }
  return (
    <>
      <header>
        <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
        </h2>
      </header>

      <section className="todo">

        <div>
          <TodoForm handleSubmit={addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={toggleComplete}
          />
        </div>
      </section>
      <Dropdown>
        <Dropdown.Toggle variant="danger" id="dropdown-basic" >
          Delete
        </Dropdown.Toggle>

        <Dropdown.Menu onClick={handleDelete}>
          {
            list.map((task, inx) => {
              return (
                <Dropdown.Item key={inx} value={task.text}>{task.text}</Dropdown.Item>
              )
            })
          }
        </Dropdown.Menu>
      </Dropdown>
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
          <Form.Group>
            <Form.Control as="select" onChange={changeEdit}>
              {list.map((task, inx) => {
                return (
                  <option key={inx}>{task.text}</option>
                )
              })}

            </Form.Control>
            <br />
            <Form.Control type="text" placeholder="Task Text" value={popVal.text} onChange={changeText} />
            <br />
            <Form.Control type="number" min="0" max="5" placeholder="Task Difficulty" value={popVal.difficulty} onChange={changeDiff}/>
            <br />
            <Form.Control type="text" placeholder="Task assignee" value={popVal.assignee} onChange={changeAssig}/>
            <br/>
            <Button type="submit" onClick={editData}>Save Changes</Button>
            </Form.Group>
        </Modal.Body>
      </Modal>
    </>
      );

}

      export default ToDo;
