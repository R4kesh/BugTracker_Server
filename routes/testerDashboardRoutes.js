import express from 'express';

import {listAllTasks,dashboardCount,testCaseCreation,listTestCases} from '../controllers/testerController/testerController.js'


const router = express.Router();

router.get('/listTasks',listAllTasks)
router.get('/dashboardCount',dashboardCount)
router.post('/testCaseCreation/:id',testCaseCreation)
router.get('/listTestCases',listTestCases)


export default router; 