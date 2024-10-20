import express from 'express';

import {displayCount,getNewTasks,userAcceptTask
,listTasks,changeStatus,reAssignedList,updateStatus} from '../controllers/userController/userController.js'



const router = express.Router();

router.get('/count',displayCount)
router.get('/newtasks/user',getNewTasks)
router.put('/tasks/verifyByUser',userAcceptTask)
router.get('/listApprovedTasks/:userId',listTasks)
router.put('/changeTasksStatus/:taskId',changeStatus)
router.get('/reassignedList',reAssignedList)
router.put('/updateTaskStatus',updateStatus)


export default router; 
