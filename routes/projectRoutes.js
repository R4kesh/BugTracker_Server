import express from 'express';
import {addProject,displayProject,getProjectName,taskCreation} from '../controllers/projectController/projectController.js'

const router = express.Router();

router.post('/add',addProject)
router.get('/display',displayProject)
router.get('/getProjectName/:id',getProjectName)
router.post('/task/create',taskCreation)




export default router; 
