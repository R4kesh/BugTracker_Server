import express from 'express';

import {listAllTasks} from '../controllers/testerController/testerController.js'


const router = express.Router();

router.get('/listTasks',listAllTasks)


export default router; 