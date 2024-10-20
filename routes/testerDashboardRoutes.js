import express from 'express';
import { upload } from '../middlewares/fileUpload.js';
import { validateToken } from '../middlewares/validateToken.js';
import {listAllTasks,dashboardCount,testCaseCreation,listTestCases,updateBugReport,listSubmitterReport, testerProfile, editTesterProfile
,listReassigned} from '../controllers/testerController/testerController.js'


const router = express.Router();

router.get('/listTasks',validateToken,listAllTasks)
router.get('/dashboardCount',validateToken,dashboardCount)
router.post('/testCaseCreation/:id',validateToken,testCaseCreation)
router.get('/listTestCases/:id',validateToken,listTestCases)
router.post('/bugreport', upload.array('files', 5),validateToken,updateBugReport)
router.get('/submited_report/:testerId',validateToken,listSubmitterReport)
router.get('/testerprofile/:Id',validateToken,testerProfile)
router.put('/updatetesterprofile/:userId',validateToken,editTesterProfile)
router.get('/reassignlist',validateToken,listReassigned)
export default router; 