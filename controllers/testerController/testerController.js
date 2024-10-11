import Task from '../../models/taskModel.js'
import Project from '../../models/projectModel.js'
import User from '../../models/suserModel.js';
import TestCase from '../../models/testCasesModel.js';
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

export const  listTestCases = async (req, res) => {
  try {
    console.log('jhjh',req.params.id);
    const testCases = await TestCase.findAll({
      where: {
        taskId: req.params.id  
      }
    });
   
    res.json(testCases);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching test cases' });
    
  }
}



export const  testCaseCreation  = async (req, res) => {
  try {
    console.log('test',req.body);
    console.log('testParams',req.params);

    const { id } = req.params;
    const taskId=id
  const { name, description, steps } = req.body;
  

    const testCase = await TestCase.create({
      name,
      description,
      steps,
      taskId, // Associate the test case with the task
    });

    res.status(201).json(testCase);

    
  } catch (error) {
    console.error('Error creating test case:', error);
    res.status(500).json({ message: 'Error creating test case' });
    
  }
}

export const updateBugReport  = async (req, res) => {
  try {
    console.log('g');
    console.log('req',req.body);
    
  } catch (error) {
    console.error('Error creating bug report:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
    
  }
}