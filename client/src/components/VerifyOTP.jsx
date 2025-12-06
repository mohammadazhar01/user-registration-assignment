import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { FaArrowLeft } from "react-icons/fa6";


const VerifyOTP = ({ setUser, name, email, password }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    if (otp.trim() === "") {
      setError("OTP is required!");
      return;
    }

    try {
      const { data } = await axios.post('/api/user/verify-otp', { name, email, password, otp });
      setError(data.message);

      if (data.success) {
        setUser(data.user);
        navigate('/dashboard')
        toast.success("Login Successful");
      } else {
        console.log(data.message);
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed!');
    }
  };

  const handleResendOtp = async () => {
    try {
      if(email){
            const {data} = await axios.post(`/api/user/register`,{name,email, password});
            if (data.success){
                setError('')
                setOtp('')
                toast.success("New OTP is sent")
                
            }else {
                toast.error(data.message)
            }
        }
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="container">
      <div className="form-container">

        <div className="form-header">
             <span 
              onClick={() => navigate("/register")}
              style={{ cursor: "pointer", color: "  #4b6bfb",fontWeight: "500"}}>
               <FaArrowLeft />Back
             </span>
             <div className="flex-between" style={{ display: "flex", justifyContent: "space-between" }}>
            
            <p>Please enter the OTP sent to your email</p>
          </div>

          <h1>Verify OTP</h1>
        </div>

        <form className="form-box" onSubmit={handleVerifyOtp}>
          <div className="input-group">
            <input type="text" name="otp" placeholder=" " value={otp} onChange={(e) => setOtp(e.target.value)} className="input-field" />
            <label htmlFor="otp" className="floating-label">Enter OTP</label>
          </div>

          <p>{error}</p>

          <p 
            onClick={handleResendOtp}
            style={{ color: "#4b6bfb",cursor: "pointer",}}>
            Resend OTP
          </p>

          <button className="form-btn form-btn-smbt" type="submit">
            Verify OTP
          </button>

        </form>

      </div>
    </div>
  );
};

export default VerifyOTP;
