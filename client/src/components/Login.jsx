import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import blob from '../assets/blob.svg'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuEyeOff } from "react-icons/lu";



const Login = ({setUser,}) => {

    const Navigate = useNavigate();

    const [viewPass, setViewPass] = useState(false)

    const [formData, setFormData] = useState({
        email:"",
        password:"",

    })

    const onChangeHandle = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }


    const onSubmitHandler = async (e) => {
            e.preventDefault();
            const email = formData.email;
            const password = formData.password;
         

            const {data} = await axios.post(`/api/user/login`,{email,password});
            if (data.success){
                Navigate('/dashboard') 
                setUser(data.user)
                toast.success("Login Successfull")
            }else {
                toast.error(data.message)
            }  

    }
    
    return(
        <div className="container">
            <div className="form-container">
                <div className="form-blob">
                    <img src={blob} alt="" className="blob-image bi-1" />
                    <img src={blob} alt="" className="blob-image bi-2" />
                    <img src={blob} alt="" className="blob-image bi-3" />
                </div>
            
            <div className="form-header">
                <p>Pealse enter your details</p>
                <h1>Welcom Back to Login</h1>
            </div>
            <form className="form-box">
                <div className="input-group">
                    <input type="text" className="input-field" onChange={(e)=> onChangeHandle(e)} name='email' required />
                    <label for="email" className="floating-label">Email</label>
                </div>

                <div className="input-group">
                    <input type={viewPass ? "text":"password"} id="password" onChange={(e)=> onChangeHandle(e)} className="input-field" name='password'  required />
                    <label for="password" className="floating-label">Password</label>
                    <div className="eye-icon">
                        {viewPass ? <MdOutlineRemoveRedEye onClick={()=> setViewPass(!true)} className='eye'/> :<LuEyeOff onClick={()=> setViewPass(true)} className='eye'/>}
                    </div>
                </div>
                <button type="submit" onClick={(e)=> onSubmitHandler(e)} className="form-btn form-btn-smbt">Login</button>
            </form>
            <div className="form-bottom">
                <p>Don't have an account ?{<Link to="/signup"> Signup</Link>} </p>
                <p style={{ color: "#4b6bfb",cursor: "pointer",textDecoration:"none",}}><Link to={"/"}>Go Back</Link></p>
            </div> 

            
            
          </div>
        </div>
    )
}

export default Login