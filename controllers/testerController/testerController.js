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

export const dashboardCount  = async (req, res) => {
  try {
    const newTasksCount = await Task.count({
      where: { isCompleted: false },
    });

    // Count of tasks where isCompleted is true but not verified by admin (Tasks to Test)
    const taskToTestCount = await Task.count({
      where: { 
        isCompleted: true,
        isVerifiedByAdmin: false
      },
    });

    // Count of tasks where isVerifiedByAdmin is true (Tasks Tested Completed)
    const tasksTestedCompletedCount = await Task.count({
      where: { isVerifiedByAdmin: true },
    });
    console.log('new',newTasksCount);
    console.log('new1',taskToTestCount);
    console.log('new2',tasksTestedCompletedCount);



    // Return the counts as a response
    res.json({
      newTasks: newTasksCount,
      taskToTest: taskToTestCount,
      tasksTestedCompleted: tasksTestedCompletedCount,
    });
    
  } catch (error) {
    console.error('Error fetching task counts:', error);
    res.status(500).json({ message: 'Error fetching task counts' });
    
  }
}


export const  testCaseCreation  = async (req, res) => {
  try {
    console.log('test',req.body);
    console.log('testParams',req.params);

    const { taskId } = req.params;
  const { name, description } = req.body;

    
  } catch (error) {
    
  }
}