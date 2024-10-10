import express from 'express';

import {listAllTasks,dashboardCount,testCaseCreation} from '../controllers/testerController/testerController.js'


const router = express.Router();

router.get('/listTasks',listAllTasks)
router.get('/dashboardCount',dashboardCount)
router.post('/testCaseCreation',testCaseCreation)


export default router; 