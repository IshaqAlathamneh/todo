import axios from "axios";

const useAjax = (list, setList) => {
    const todoAPI = 'https://ishaq-api.herokuapp.com';
    const _addItem = (item) => {
        item.due = new Date();
        item.complete = false
        
        axios({
            method: 'post',
            url: `/tasks`,
            mode: 'cors',
            baseURL: todoAPI,
            data: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-origin': todoAPI
              }
        })
          .then(savedItem => {
            setList([...list, savedItem.data])
          })
          .catch(console.error);
      };
    
      const _toggleComplete = id => {
        console.log('toggle',id);
    
        let item = list.filter(i => i._id === id)[0] || {};
    
        if (item._id) {
    
          item.complete = !item.complete;
    
          let url = `${todoAPI}/${id}`;
    
          axios({
            method: 'put',
            url: `/tasks/${id}`,
            mode: 'cors',
            baseURL: todoAPI,
            data: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-origin': todoAPI
            }
          })
            .then(savedItem => {
              setList(list.map(listItem => listItem._id === item._id ? savedItem.data : listItem));
            })
            .catch(console.error);
        }
      };

      const handleDelete = (id) => {
        console.log('------------',id);
        let item = list.filter(i => i._id === id)[0] || {};
        console.log('-bbbbbbbbb-', item);
        let url = `${todoAPI}/${id}`;
        let myList = list.filter(item => item._id !== id)
        let myLs = myList.filter(item => !item.msg)
        console.log('-a--a-a-a-', myLs);
        
          axios({
            method: 'delete',
            url: `/tasks/${id}`,
            mode: 'cors',
            baseURL: todoAPI,
            data: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-origin': todoAPI
              }
          })
            .then(savedItem => {
              setList(myLs)
            })
            .catch(console.error);
        
      }

      const _getTodoItems = () => {
        axios( {
          method: 'get',
          url: '/tasks',
          mode: 'cors',
          baseURL: todoAPI,
          
        })
          .then(data => {
              setList(data.data.results)
            })
          .catch(console.error);
      };
    // const handleSubmit = (e) => {
    //     console.log("inside handleSubmit", values)
    //     e.preventDefault();
    //     // e.target.reset();
    //     console.log(callback);
    //     callback(values);
    // }

    // const handleChange = (e) => {
    //     console.log("inside handleChange", {[e.target.name]: e.target.value})
    //     setValues({...values, [e.target.name]: e.target.value});
    // }
    // return [handleSubmit, handleChange, values];
    return [_addItem, _toggleComplete, handleDelete, _getTodoItems]
}

export default useAjax;