import React, {useState} from 'react'
export const myContext = React.createContext()

function MyContextProvider(props) {
    // const [list, setList] = useState([])

    return(
      <myContext.Provider value={props.list}>
        {props.children}
      </myContext.Provider>
    )
  }
  export default MyContextProvider;