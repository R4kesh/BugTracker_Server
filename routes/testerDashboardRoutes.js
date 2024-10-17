import express from 'express';
import { upload } from '../middlewares/fileUpload.js';

import {listAllTasks,dashboardCount,testCaseCreation,listTestCases,updateBugReport,listSubmitterReport, testerProfile, editTesterProfile} from '../controllers/testerController/testerController.js'


const router = express.Router();

router.get('/listTasks',listAllTasks)
router.get('/dashboardCount',dashboardCount)
router.post('/testCaseCreation/:id',testCaseCreation)
router.get('/listTestCases/:id',listTestCases)
router.post('/bugreport', upload.array('files', 5),updateBugReport)
router.get('/submited_report/:testerId',listSubmitterReport)
router.get('/testerprofile/:Id',testerProfile)
router.put('/updatetesterprofile/:userId',editTesterProfile)
export default router; 