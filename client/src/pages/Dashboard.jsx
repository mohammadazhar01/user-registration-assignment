import React, { useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaRegSmileBeam } from "react-icons/fa";

const Dashboard = ({ setUser, user }) => {

    const navigate = useNavigate()

    console.log(user)

    const logout = async ()=>{
      try {
        const { data } = await axios.get('/api/user/logout',{
    withCredentials: true}
  
  )
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
        {user ? (<><h1>
          <FaRegSmileBeam />
          Welcome, <span>{user.name}</span> 
        </h1>
        <p>You are successfully logged in.</p>

        <h1>What is your plan today!!!</h1>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button></>): (<span>Loading....</span>)}
      </div>
    </div>
  );
};

export default Dashboard;