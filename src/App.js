import { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';
import ListPage from './components/ListPage';
import AddUsers from './components/AddUser/AddUsers';
import { BrowserRouter, Route, Routes,Link } from "react-router-dom";


function App() {
    let [list, setList] = useState([]);


    const showAllList = function(data){
        if (Array.isArray(data)) {
           setList(data);
          } else if(typeof data === "object" && data !== null) {
            setList([...list, data]);
          } 
    }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => res.json())
            .then((data) => setList(data));
    }, []);



    return (
        <div className='App'>
            <BrowserRouter>
            <Routes>
                <Route path = '/' element = {<div className='btnWrap'>
               <Link to="showlist"> <Button value='Show all list' /></Link>
               <Link to="adduser"> <Button value='Add the user' /></Link>

            </div>}/>
                 <Route path = 'adduser' element = {<AddUsers showAllList={showAllList}/>}/>
                 <Route path = 'showlist' element = {<ListPage list={list} showAllList={showAllList}/> }/>
            </Routes>
        
            </BrowserRouter>
        </div>
    );
}

export default App;
