import express from 'express';
import multer from 'multer'
import path from 'path'

import {listAllTasks,dashboardCount,testCaseCreation,listTestCases,updateBugReport} from '../controllers/testerController/testerController.js'


const router = express.Router();

router.get('/listTasks',listAllTasks)
router.get('/dashboardCount',dashboardCount)
router.post('/testCaseCreation/:id',testCaseCreation)
router.get('/listTestCases/:id',listTestCases)
router.post('/bugreport',updateBugReport)


export default router; 