import express from 'express';

import {displayCount,getNewTasks,userAcceptTask
,listTasks,changeStatus} from '../controllers/userController/userController.js'



const router = express.Router();

router.get('/count',displayCount)
router.get('/newtasks/user',getNewTasks)
router.put('/tasks/verifyByUser',userAcceptTask)
router.get('/listApprovedTasks/:userId',listTasks)
router.put('/changeTasksStatus/:taskId',changeStatus)

export default router; 
