import React, { useState, useContext, useEffect } from 'react';
import { ListGroup, Toast, Badge, Pagination, Button } from 'react-bootstrap';
import { PagCon } from '../pagination'
function TodoList(props) {
  const [com, setCom] = useState(true)
  const [sort, setSort] = useState(false)
  const [length, setLength] = useState(0)
  const contex = useContext(PagCon)
  let pag = contex.pag;
  let setPag = contex.setPag;
  useEffect(() => {
    console.log('list', props.list);
    let lastIndex = contex.pag.currentPage * contex.pag.toastPerPage;
  let firstIndex = lastIndex - contex.pag.toastPerPage;
  let arr = props.list.slice(firstIndex, lastIndex);
  setPag(prev => { return { ...prev, list: [...arr] } })
    // setPag(prev => { return { ...prev, list: [...props.list] } })
    console.log('paaaaag', pag.list);
    setLength(props.list.length)
    bar()

  }, [props.list])
  useEffect(()=>{
    console.log('paaaaag', pag.list);
    setLength(props.list.length)
    bar()
  }, [pag.list])
  const paginate = e => {
    // e.preventDefault()
    let p = parseInt(e.target.innerHTML)
    console.log('-*-*-*-*--', p);
    let lastIndex = p * pag.toastPerPage;
    let firstIndex = lastIndex - pag.toastPerPage;
    let arr = props.list.slice(firstIndex, lastIndex);
    if (sort) {
      arr = arr.sort((a,b) => parseInt(b.difficulty) - parseInt(a.difficulty))
    }
    if(com){
      setPag(prev => { return { ...prev, list: [...arr], currentPage: p } })
    } else {
      let arr2 = arr.filter( x => !x.complete)
      setPag(prev => { return { ...prev, list: [...arr2], currentPage: p } })
    }
  }
  const toggleCom = (e) => {
    setCom(prev => !prev)
    let obj = {
      target: {
        innerHTML:'1'
      }
    }
    paginate(obj)
  }
  const diffSort = () => {
    setSort(prev => !prev)
    // arr = pag.list.sort((a,b) => parseInt(b.difficulty) - parseInt(a.difficulty))
    let obj = {
      target: {
        innerHTML:'1'
      }
    }
    paginate(obj)
  }

  const [items, setItems] = useState([])
  const bar = ()=> {
    console.log('in bar', length);
    setItems( prev => [])
  let number = 1
  for (let n = 0; n <= length-1; n += 3) {
    let p = <Pagination.Item key={number} active={number == pag.currentPage} onClick={paginate}>{number}</Pagination.Item>
    setItems( prev => [...prev, p])
    number++
  }
}

  return (
    <>
      {pag.list.map(item => (
        <Toast
          animation
          onClose={() => props.deleteItem(item._id)}
          key={item._id}
        >
          <Toast.Header>
            <Badge
              style={{ cursor: 'pointer' }}
              className="mr-auto m-1"
              onClick={() => props.handleComplete(item._id)}
              size="sm"
              pill
              variant={`${item.complete ? 'success' : 'danger'}`}
            >{`${item.complete ? 'completed' : 'pending'}`}</Badge>
            <strong className="mr-auto ml-2">{item.assignee}</strong>
          </Toast.Header>
          <Toast.Body>
            <p>{item.text}</p>
            <small>difficulty: {item.difficulty}</small>
          </Toast.Body>
        </Toast>
      ))}
      <Pagination>{items}</Pagination>
      <Button onClick={toggleCom} className="is">Toggle Complete</Button>
    <Button onClick={diffSort} className="is">Sort By Difficulty</Button>
    </>
  );

}

export default TodoList;