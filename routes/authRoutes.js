import express from 'express';
import { registerUser } from '../controllers/authController.js'; // Ensure to use .js for local imports
import { loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);


export default router; 
