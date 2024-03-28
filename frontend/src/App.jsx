import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Signin from './pages/Signin.jsx'
import './App.css'
import {BrowserRouter,Route,Routes} from "react-router-dom";
import { useEffect, useState } from 'react';

function App() {
  const [auth,setAuth]=useState(false);

  const checkAuth= async()=>{
      fetch('http://localhost:3000/todo-app/userinfo/isAuthenticated')
          .then(async (res)=>{
              const json= await res.json();
              setAuth(json.setflag===1);})
    
  };

  useEffect(()=>{checkAuth()},[])
  return(
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin checkAuth={checkAuth} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={auth ? <Dashboard checkAuth={checkAuth}/> : <Signin checkAuth={checkAuth} />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
