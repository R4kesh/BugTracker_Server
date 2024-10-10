import Task from '../../models/taskModel.js'


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


