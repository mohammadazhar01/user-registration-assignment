import User from "../model/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import otpStore from "../middleware/otpStore.js";
import nodemailer from 'nodemailer';

// /api/user/register   -   Register as User-
export const registerUser = async (req, res)=>{
    try {
        console.log(req.body)
        const { name, email, password } = req.body;
    

        if(!name || !email || !password){
            return res.json({success: false, message: 'Missing Details'})
        }

        const existingUser = await User.findOne({email})

        if(existingUser)
            return res.json({success: false, message: 'User already exists'})

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const expiresAt = Date.now() + 5 * 60 * 1000;
      
        otpStore[email] = { otp, expiresAt };

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });
      
        try {
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your email verification',
            text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
          });
      
          res.json({ success:true, message: 'OTP sent to email.' });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Failed to send OTP' });
        }

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// /api/user/verify-otp     -   verify-user
export const verifyOtp = async (req, res) => {
    try {
        const { name,email,password, otp } = req.body;
        const record = otpStore[email];
      
        if (!record) {
          return res.status(400).json({success:false, message: 'No OTP found for this email.' });
        }
      
        if (Date.now() > record.expiresAt) {
          delete otpStore[email];
          return res.status(400).json({ success:false,message: 'OTP has expired' });
        }
      
        if (record.otp !== otp) {
          return res.status(400).json({success:false, message: 'Invalid OTP' });
        }
    
        if( record.otp === otp) {
            const hashedPassword = await bcrypt.hash(password, 10)
    
            const user = await User.create({name, email, password: hashedPassword})
    
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '2d'});
    
            res.cookie('token', token, {
                httpOnly: true, 
                secure: true,
                sameSite: "none",
                maxAge: 2 * 24 * 60 * 60 * 1000, 
            })
            delete otpStore[email];
    
            return res.json({success: true, user: {email: user.email, name: user.name}})
          } 
        }catch (error) {
            console.log(error.message);
            res.json({ success: false, message: error.message });
        }
    };
  

//  /api/user/login  - To Login as user

export const login = async (req, res)=>{
    try {
        const { email, password } = req.body;

        if(!email || !password)
        {
            return res.json({success: false, message: 'Email and password are required'});
        }
            
        const user = await User.findOne({email});

        if(!user){
            return res.json({success: false, message: 'User does not exists'});
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch)
            return res.json({success: false, message: 'Invalid email or password'});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none", 
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.json({success: true, user: {email: user.email, name: user.name}})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// /api/user/is-auth -    To authorize the user
export const isAuth = async (req, res)=>{
    try {
        const { userId } = req.body;
        const user = await User.findById(userId).select("-password")
        return res.json({success: true, user})

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// /api/user/logout    -  To logout User

export const logout = async (req, res)=>{
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: true, message: error.message });
    }
}
