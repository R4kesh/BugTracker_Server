import express from 'express';
import {addProject,displayProject,getProjectName,taskCreation
,taskList} from '../controllers/projectController/projectController.js'

const router = express.Router();

router.post('/add',addProject)
router.get('/display',displayProject)
router.get('/getProjectName/:id',getProjectName)
router.post('/task/create',taskCreation)
router.get('/task/getAll',taskList)
router.post('/task/getModalData',)



export default router; 
