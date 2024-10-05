import express from 'express';
import { registerUser } from '../controllers/authController.js'; // Ensure to use .js for local imports
import { loginUser } from '../controllers/authController.js';
import {verifyOtp} from '../controllers/authController.js'
import {resentOtp} from '../controllers/authController.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp',verifyOtp)
router.post('/resend-otp',resentOtp)

export default router; 
