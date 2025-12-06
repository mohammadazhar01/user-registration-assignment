import React from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setUser, user }) => {

    const navigate = useNavigate()

    const logout = async ()=>{
      try {
        const { data } = await axios.get('/api/user/logout')
        if(data.success){
          toast.success(data.message)
          setUser(null);
          navigate('/')
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }  
    }
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>
          Welcome, <span>{user.name}</span> 
        </h1>
        <p>You are successfully logged in.</p>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;