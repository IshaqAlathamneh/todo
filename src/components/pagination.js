import React, { useState, useContext, useEffect } from 'react'
import {myContext} from '../context/pag-prov';
export const PagCon = React.createContext()
function Prefer({children, list}) {
    const context = useContext(myContext)
    const [pag, setPag] = useState({
        list:[],
        currentPage: 1,
        toastPerPage:3
    })
    let obj = {
        pag, setPag
    }
    return (
        <PagCon.Provider value={obj}>
            {children}
        </PagCon.Provider>
    )
}
export default Prefer;