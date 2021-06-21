import React, {useState} from 'react';
import {FormControl, Form, Button} from 'react-bootstrap';
function TodoForm (props) {
  const [item, setItem] = useState({})

  const handleInputChange = e => {
    setItem({...item, [e.target.name]: e.target.value } );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(item);
    const myItem = {};
    setItem(myItem);
  };

  
    return (
      <>
        <h3>Add Item</h3>
        <Form onSubmit={handleSubmit}>
          <label>
            <span>To Do Item</span>
            <FormControl
              name="text"
              placeholder="Add To Do List Item"
              onChange={handleInputChange}
            />
          </label>
          <label>
            <span>Difficulty Rating</span>
            <FormControl defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
          </label>
          <label>
            <span>Assigned To</span>
            <FormControl type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
          </label>
          <Button type="submit">Add Item</Button>
        </Form>
      </>
    );
  
}

export default TodoForm;
