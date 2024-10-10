import Task from '../../models/taskModel.js'
import Project from '../../models/projectModel.js'
import User from '../../models/suserModel.js';
import { Op } from 'sequelize'; 


export const listAllTasks  = async (req, res) => {
    try {
     
        const tasks = await Task.findAll({
            include: [
              {
                model: Project,
                attributes: ['name'], 
              },
              {
                model: User,
                as: 'assignedUser',
                attributes: ['name', 'role'], 
              },
            ],
          });
          console.log('hgvd',tasks);
      
          res.json(tasks);
        
    } catch (error) {
        console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
        
    }
}