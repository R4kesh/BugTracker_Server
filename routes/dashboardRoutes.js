import express from 'express';
import {editUserProfile, getDasboardCount, previewModule, previewTask, projectPreview, projectTrack, userProfile,reAssign, getProjectCounts, getReAssignedTasks,trackHistoryTaskLIst,
    trackHistoryReassign,
    getBugReportCount,
    reAssignCount} from '../controllers/dashboardController.js'
import {requestedUser} from '../controllers/dashboardController.js'
import {approveUser} from '../controllers/dashboardController.js'
import {listUsers} from '../controllers/dashboardController.js'
import {blockUnblockUser,listReport} from '../controllers/dashboardController.js'
import { validateToken } from '../middlewares/validateToken.js';

const router = express.Router();

router.get('/dashboard_count',validateToken,getDasboardCount);
router.get('/requested_user',validateToken,requestedUser)
router.put('/approve_user/:id',approveUser)
router.get('/usermanagement',validateToken,listUsers)
router.put('/usermanagement/block_unblock/:id',validateToken,blockUnblockUser)
router.get('/project_counts',validateToken, getProjectCounts);

router.get('/listBugReport',validateToken,listReport)
router.get('/projecttrack/:id',validateToken,projectTrack)
router.get('/projectpreview',validateToken,projectPreview)
router.get('/previewmodule/:id',validateToken,previewModule)
router.get('/previewcard/:id',validateToken,previewTask)
router.get('/userprofile/:Id',validateToken,userProfile)
router.put('/updateprofile/:userId',validateToken,editUserProfile)

router.post('/reassign',validateToken,reAssign)
router.get('/reassignlist',validateToken,getReAssignedTasks )

router.get('/trackhistory/listTasks/:id',validateToken,trackHistoryTaskLIst)
router.get('/trackhistory/listReassignTask/:id',validateToken,trackHistoryReassign)

router.get('/testreport_count',validateToken, getBugReportCount);
router.get('/reassigned_task_count',validateToken,reAssignCount)
export default router; 