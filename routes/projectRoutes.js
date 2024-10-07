import express from 'express';
import {addProject,displayProject} from '../controllers/projectController/projectController.js'

const router = express.Router();

router.post('/add',addProject)
router.get('/display',displayProject)



export default router; 
