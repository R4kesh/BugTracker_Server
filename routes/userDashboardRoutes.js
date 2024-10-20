import express from 'express';

import {displayCount,getNewTasks,userAcceptTask
,listTasks,changeStatus,reAssignedList,updateStatus} from '../controllers/userController/userController.js'
import { validateToken } from '../middlewares/validateToken.js';


const router = express.Router();

router.get('/count',validateToken,displayCount)
router.get('/newtasks/user',validateToken,getNewTasks)
router.put('/tasks/verifyByUser',validateToken,userAcceptTask)
router.get('/listApprovedTasks/:userId',validateToken,listTasks)
router.put('/changeTasksStatus/:taskId',validateToken,changeStatus)
router.get('/reassignedList',validateToken,reAssignedList)
router.put('/updateTaskStatus',validateToken,updateStatus)


export default router; 
