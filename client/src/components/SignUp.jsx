import { useState } from 'react';
import axios from 'axios'
import toast from 'react-hot-toast';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuEyeOff } from "react-icons/lu";
import blob from '../assets/blob.svg'
import VerifyOTP from './VerifyOTP';
import { Link } from 'react-router-dom';




const SignUp = ({setUser}) => {
    const [viewPass, setViewPass] = useState(false)
    const [sentOtp, setOtpSent] = useState(false)
    const [sedingOtp, setSendingOtp] = useState(false)

    const [formData, setFormData] = useState({
        fullName:"",
        email:"",
        password:"",

    })

    const [errors, setErrors] = useState({})

    const validate = () => {
        let newError = {};
        let emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(formData.fullName === ''){
            newError.fullNameErr = "Full name is required!";
        }

        if(formData.email === ""){
            newError.emailErr = "Email is required!";
        }else if(!emailRegExp.test(formData.email)){
            newError.emailErr= "Enter email in proper format!"
        }

        if(formData.password === ""){
            newError.passwordErr = "Password is required!"
        }else if(formData.password.length < 8){
            newError.passwordErr = "Password length must be more then 7 characters!"
        }
        

        setErrors(newError)

        return Object.keys(newError).length === 0;
    }

    const onSubmitHandler = async (e)=> {
        try {
            e.preventDefault();
            const name = formData.fullName;
            const email = formData.email;
            const password = formData.password;
          
            if(validate()){
                setSendingOtp(true)
                const {data} = await axios.post(`/api/user/register`,{name,email,password});
                
                if (data.success)
                {
                     
                    setOtpSent(true)
                } else {
                        toast.error(data.message)
                }
            }
        } catch (error) {
            console.log(error.message)
        }
        
    }

    const onChangeHandler = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }


    return(
        <>
      
            {sentOtp ? <VerifyOTP setUser={setUser} name={formData.fullName} email={formData.email} password={formData.password}/> 
            : <div className="container">
                    <div className="form-container">
                        <div className="form-blob">
                            <img src={blob} alt="" className="blob-image bi-1" />
                            <img src={blob} alt="" className="blob-image bi-2" />
                            <img src={blob} alt="" className="blob-image bi-3" />
                        </div>
                    
                    <div className="form-header">
                        <p>Pealse enter your details</p>
                        <h1>Register as User</h1>
                    </div>
                    <form className="form-box">
                        <div className="input-group">
                            <input type="text" onChange={(e)=> onChangeHandler(e)} value={formData.fullName} className="input-field" name="fullName" />
                            <label for="fullname" className="floating-label">Full Name</label>
                        </div>
                        <p>{errors.fullNameErr}</p>

                        <div className="input-group">
                            <input type="email" onChange={(e)=> onChangeHandler(e)} value={formData.email} className="input-field" name="email" />
                            <label for="email" className="floating-label">Email</label>
                        </div>
                        <p>{errors.emailErr}</p>
        
                        <div className="input-group">
                            <input type={viewPass ? "text":"password"} onChange={(e)=> onChangeHandler(e)} value={formData.password} id="password" name="password" className="input-field" />
                            <label for="password" className="floating-label">Password</label>
                            <div className="eye-icon">
                                {viewPass ? <MdOutlineRemoveRedEye onClick={()=> setViewPass(!true)} className='eye'/> :<LuEyeOff onClick={()=> setViewPass(true)} className='eye'/>}
                            </div>
                            
                        </div>
                        <p>{errors.passwordErr}</p>

                        <button type="submit" onClick={(e)=> onSubmitHandler(e)} className="form-btn form-btn-smbt">{sedingOtp ? "Seding OTP..." : "Sign Up"}</button>

                    </form>
                    
                    <div className="form-bottom">
                        <p>Already have an account ? {<Link to="/login">Login</Link>} </p>
                        <p style={{ color: "#4b6bfb",cursor: "pointer",textDecoration:"none",}}><Link to={"/"}>Go Back</Link></p>
                    </div> 
                  </div>
                </div>}  
        </>
    )
}

export default SignUp