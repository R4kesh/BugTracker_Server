import express from 'express';
import {editUserProfile, getDasboardCount, previewModule, previewTask, projectPreview, projectTrack, userProfile,reAssign, getProjectCounts, getReAssignedTasks} from '../controllers/dashboardController.js'
import {requestedUser} from '../controllers/dashboardController.js'
import {approveUser} from '../controllers/dashboardController.js'
import {listUsers} from '../controllers/dashboardController.js'
import {blockUnblockUser,listReport} from '../controllers/dashboardController.js'

const router = express.Router();

router.get('/dashboard_count',getDasboardCount);
router.get('/requested_user',requestedUser)
router.put('/approve_user/:id',approveUser)
router.get('/usermanagement',listUsers)
router.put('/usermanagement/block_unblock/:id',blockUnblockUser)
router.get('/project_counts', getProjectCounts);

router.get('/listBugReport',listReport)
router.get('/projecttrack/:id',projectTrack)
router.get('/projectpreview',projectPreview)
router.get('/previewmodule/:id',previewModule)
router.get('/previewcard/:id',previewTask)
router.get('/userprofile/:Id',userProfile)
router.put('/updateprofile/:userId',editUserProfile)

router.post('/reassign',reAssign)
router.get('/reassignlist',getReAssignedTasks )

export default router; 