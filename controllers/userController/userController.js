import Task from '../../models/taskModel.js'
import ReAssign from '../../models/reAssignModel.js';
import User from '../../models/suserModel.js';
import BugReport from '../../models/bugReportModel.js';
import Project from '../../models/projectModel.js';



export const displayCount = async (req, res) => {
    try {
       
        const userId = req.query.id;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
          }

          const newTaskCount = await Task.count({
            where: {
                assigned: userId,
                isCompleted: false
            }
        });

        // Fetch other counts if needed (example: completed tasks, bugs, etc.)
        const completedTasksCount = await Task.count({
            where: {
                assigned: userId,
                isCompleted: true // Assuming completed tasks are verified
            }
        });

        res.status(200).json({ assignments: newTaskCount,
            tasksCompleted: completedTasksCount });
        
        
    } catch (error) {
        
    }
}


export const getNewTasks  = async (req, res) => {
    try {
        
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const tasks = await Task.findAll({
            where: {
                assigned: userId,
                isVerifiedByUser: false 
            }
        });

        res.status(200).json(tasks);

        
        
    } catch (error) {
        console.error('Error fetching user tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        
    }
}

export const userAcceptTask = async (req, res) => {
    try {
        const { taskId } = req.body;
        if (!taskId) {
            return res.status(400).json({ error: 'Task ID is required' });
        }

        
        const task = await Task.update(
            { isVerifiedByUser: true },
            { where: { id: taskId } }
        );

        if (task[0] === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task verified successfully' });
        
        
    } catch (error) {
        console.error('Error verifying task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const listTasks = async (req, res) => {
    try {
        
        const userId = req.params.userId;
        const tasks = await Task.findAll({
            where: {
                assigned: userId,
                isVerifiedByUser: true
            }
        });
        res.json(tasks);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        
    }
}

export const  changeStatus = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const { status, isCompleted } = req.body;
        await Task.update(
            { status, isCompleted }, 
            { where: { id: taskId } }
          );
        res.status(200).json({ message: 'Task updated successfully' })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating task' });
        
    }
}

export const reAssignedList= async (req, res) => {
    try {
     
        const { userid } = req.query;
        
        const reassignedTasks = await ReAssign.findAll({
            where: {
              reassignedToId: userid, // Filter by reassignedToId
            },
            include: [
              {
                model: Task, // Assuming you have a Task model
                as: 'task', // Adjust alias based on your model definition
            },
            {
              model: Project,
              as: 'project', // Make sure to use the correct alias if defined
            },
              {
                model: User, // Assuming you have a User model for the tester
                as: 'tester', // Adjust alias based on your model definition
              },
              {
                model: User, // Assuming you have a User model for the previous developer
                as: 'previousDeveloper', // Adjust alias based on your model definition
              },
              {
                model: User, // Assuming you have a User model for the user it is reassigned to
                as: 'reassignedTo', // Adjust alias based on your model definition
              },
              {
                model: BugReport, // Assuming you have a BugReport model
                as: 'bugReport', // Adjust alias based on your model definition
              },
            ],
          });

          
      
          // Send the retrieved tasks as a response
          return res.status(200).json(reassignedTasks);
        
    } catch (error) {
        console.error('Error fetching reassigned tasks:', error);
    return res.status(500).json({ message: 'Failed to fetch reassigned tasks' });
        
    }
}

export const updateStatus=async (req, res) => {
    try {
      
        const { taskId, status } = req.body; // Extract taskId and status from the request body

    // Find the ReAssign task using taskId
    const reassignTask = await ReAssign.findOne({ where: { taskId } });

    // If task not found, return 404
    if (!reassignTask) {
      return res.status(404).json({ message: 'Reassigned task not found' });
    }

    // Update the status of the found task
    reassignTask.status = status;

    // Save the changes back to the database
    await reassignTask.save();

    // Respond with the updated task
    res.status(200).json({
      message: 'Task status updated successfully',
      task: reassignTask,
    });
        
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({ message: 'Failed to update task status' });
        
    }
}


