import express from 'express';

import {displayCount} from '../controllers/userController/userController.js'


const router = express.Router();

router.get('/count',displayCount)

export default router; 
