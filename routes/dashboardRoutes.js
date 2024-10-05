import express from 'express';
import {getDasboardCount} from '../controllers/dashboardController.js'
import {requestedUser} from '../controllers/dashboardController.js'
import {approveUser} from '../controllers/dashboardController.js'

const router = express.Router();

router.get('/dashboard_count',getDasboardCount);
router.get('/requested_user',requestedUser)
router.put('/approve_user/:id',approveUser)



export default router; 