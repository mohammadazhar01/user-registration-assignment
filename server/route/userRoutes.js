import express from 'express';
import { isAuth, login, logout, registerUser, verifyOtp } from '../controller/UserController.js';
import authUser from '../middleware/authUser.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/verify-otp', verifyOtp)
userRouter.post('/login', login)
userRouter.get('/is-auth', authUser, isAuth)
userRouter.get('/logout', authUser, logout)

export default userRouter     