import React from 'react';
import {ListGroup, Toast, Badge} from 'react-bootstrap';
function TodoList (props) {
console.log('inside the list js',props.list);
  
    return (
      <>
        {props.list.map(item => (
        <Toast
          animation
          onClose={() => props.deleteItem(item._id)}
          // className={`complete-${item.complete.toString()}`}
          key={item._id}
        >
          <Toast.Header>
            <Badge
              style={{ cursor: 'pointer' }}
              className="mr-auto m-1"
              onClick={() => props.handleComplete(item._id)}
              size="sm"
              pill
              variant={`${item.complete ? 'danger' : 'success'}`}
            >{`${item.complete ? 'completed' : 'pending'}`}</Badge>
            <strong className="mr-auto ml-2">{item.assignee}</strong>
          </Toast.Header>
          <Toast.Body>
            <p>{item.text}</p>
            <small>difficulty: {item.difficulty}</small>
          </Toast.Body>
        </Toast>
        ))}
        </>
    );
  
}

export default TodoList;