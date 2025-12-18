import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from './Pages/Home';
import About from './Pages/About';
import Search from './Pages/Search';
import Login from './Pages/Login';
import Chatting from './Pages/Chatting';
import Admin from './Pages/Admin';

const routerVaraible = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        index: true,
        element:<Home />,
      },
      {
        path:"about",
        element:<About></About>,
      },
      {
        path:"search",
        element:<Search></Search>,
      },
      {
        path:"chatting",
        element:<Chatting></Chatting>,
      },
      {
        path:"login",
        element:<Login></Login>,
      },
      {
        path:"admin",
        element:<Admin></Admin>,
      },
      {
        path:"*",
        element:<h1>Page Not Found</h1>,
      }
    ]
  }
 ])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={routerVaraible}></RouterProvider> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();