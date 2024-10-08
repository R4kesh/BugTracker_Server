import express from 'express';
import {getDasboardCount} from '../controllers/dashboardController.js'
import {requestedUser} from '../controllers/dashboardController.js'
import {approveUser} from '../controllers/dashboardController.js'
import {listUsers} from '../controllers/dashboardController.js'
import {blockUnblockUser} from '../controllers/dashboardController.js'

const router = express.Router();

router.get('/dashboard_count',getDasboardCount);
router.get('/requested_user',requestedUser)
router.put('/approve_user/:id',approveUser)
router.get('/usermanagement',listUsers)
router.put('/usermanagement/block_unblock/:id',blockUnblockUser)



export default router; 