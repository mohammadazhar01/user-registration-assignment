import { useState } from 'react';
import './App.css'
import { Toaster } from "react-hot-toast";
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './components/Login'
import SignUp from './components/SignUp'
import { useEffect } from 'react';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [user, setUser] = useState(null)

  const fetchUser = async ()=>{
    try {
        const {data} = await axios.get('api/user/is-auth');
        if (data.success){
          console.log("this"+data.user)
            setUser(data.user)
        }
    } catch (error) {
        setUser(null)
    }
 } 
  

   useEffect(()=>{
        fetchUser()
    },[])

  
  return(
    <>
    <Toaster />
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/signup' element={<SignUp setUser={setUser}/>} />
      <Route path='/login' element={<Login setUser={setUser}/>} />
      <Route path='/dashboard' element={<Dashboard user={user} setUser={setUser}/>} />

    </Routes>

    </>

  )
}

export default App
