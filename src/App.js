import {  Outlet } from 'react-router-dom';
import './App.css';
import Header from './Common/Header'
import { useEffect, useState } from 'react';

function App() {
  let [data,setData] = useState([]);
  useEffect(()=>{
      const fetchResponse = async()=>{
      try{
        const response = await fetch("http://localhost:3001/detail.json");
        const da =await response.json();
        setData(da);
      }catch(err){}
    };
    fetchResponse();
  },[]);
  return (
    <div className="App">
      <Header></Header>
       <Outlet
        context={{
          data,
        }}></Outlet>
    </div>
  );
}

export default App;