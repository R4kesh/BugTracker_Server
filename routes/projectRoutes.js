import express from 'express';
import {addProject,displayProject,getProjectName,taskCreation
,taskList,taskModalData,getroles,assignTo,assignedList
,assignedListStatus,addModules,listingEpic} from '../controllers/projectController/projectController.js'

const router = express.Router();

router.post('/add',addProject)
router.get('/display',displayProject)
router.get('/getProjectName/:id',getProjectName)
router.post('/task/create',taskCreation)
router.get('/task/getAll/:projectId',taskList)
router.get('/task/getModalData',taskModalData)
router.get('/task/assign/roles',getroles)
// router.get('/task/assign/names',getnames)
router.put('/task/assignto',assignTo)
router.get('/tasks/assignedlist',assignedList)
router.patch('/tasks/assignedlist/:taskId',assignedListStatus)


router.post('/addModules',addModules)
router.get('/listEpic',listingEpic)







export default router; 
