import User from '../models/suserModel.js';
import BugReport from '../models/bugReportModel.js';
import Task from '../models/taskModel.js';
import Project from '../models/projectModel.js';
import Epic from '../models/epicModel.js';
import ReAssign from '../models/reAssignModel.js';


export const getDasboardCount = async (req, res) => {
    try {
        
      const userRequestCount = await User.count({
        where: {
          isVerified: true,
          isApproved: false,
        },
      });

      const activeUserCount = await User.count({
        where: {
          isVerified: true,
          isApproved: true,
        },
      });

    
      
      return res.status(200).json({ userRequestCount,activeUserCount });  
    } catch (error) {
      console.error('Error fetching active severity count:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

export const requestedUser = async (req, res) => {
try {
  const users = await User.findAll({
    where: {
      isVerified: true,
      isApproved: false,
    },
  });

  res.status(200).json(users);
  
} catch (error) {
  console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
 }

export const approveUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedUser = await User.update(
      { isApproved: true }, 
      { where: { id: userId } } 
    );

    if (updatedUser[0] === 1) {
      res.status(200).json({ success: true, message: 'User approved successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found or already approved' });
    }
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const listUsers = async (req, res) => {
  try {
    const users=await User.findAll({
      where:{
        isVerified: true,
      isApproved: true,
      
      }
    })
    res.status(200).json(users);
    
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Server error' });
    
  }
}

export const blockUnblockUser= async (req, res) => {
  try {
    const { id } = req.params;
    const { isBlocked } = req.body;

    const user = await User.findByPk(id); 
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.isBlocked = isBlocked; 
    await user.save(); 

    res.status(200).json({ success: true, message: 'User block status updated' });

    
  } catch (error) {
    console.error('Error updating block status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}


export const listReport = async (req, res) => {
  try {
    console.log('dfg');

    const testReports = await BugReport.findAll({
      include: [
        {
          model: Task,
          as: 'task',
          attributes: ['taskName','id','description','starting'],
          include: [
            {
              model: Project,
              attributes: ['name','id'], // Include Project name
            },
            {
              model: User,
              as: 'assignedUser', // Developer assigned to the task
              attributes: ['name','id'],
            },
          ],
        },
        {
          model: User,
          as: 'tester',
          attributes: ['name','id'], // Tester for the bug report
        },
      ],
    });

    res.json(testReports);
    
    
  } catch (error) {
    console.error('Error fetching test reports:', error);
    res.status(500).json({ message: 'Server Error' });
    
  }
}

export const projectPreview=async (req, res) => {
  
  try {
    const projects = await Project.findAll();
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
};


export const previewModule= async (req, res) => {
  const { id } = req.params;  
  try {
    const modules = await Epic.findAll({ where: { projectId :id } });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching modules' });
  }
};

export const previewTask= async (req, res) => {

  
  const {id}=req.params
  console.log('epic',id);
  
  try {
    const tasks = await Task.findAll({
      where: { epicId:id },
      include: [
        {
          model: Project,
          attributes: ['name'], // Select project name
        },
        {
          model: User,
          as: 'assignedUser', // Alias used in Task model
          attributes: ['name'], // Select user name
        },
        {
          model: Epic,
          attributes: ['name'], // Select epic name
        },
        
      ],
    });
    console.log('tsss',tasks);

    // Map the results to include the necessary fields
    const formattedTasks = tasks.map(task => ({
      id: task.id,
      projectName: task.Project.name, // Access the project name
      epicName: task.Epic ? task.Epic.name : 'No Epic Name', // Provide a default if no epic name exists
      assignedUserName: task.assignedUser ? task.assignedUser.name : 'Unassigned', // Access user name
      userStory: task.userStory || 'No user story provided', // Access user story
      taskName: task.taskName,
      description: task.description,
      starting: task.starting,
      deadline: task.deadline,
      status: task.status,
    }));

    console.log('fills',formattedTasks);

    res.json(formattedTasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

export const userProfile = async (req, res) => {
  

  // Destructure userId from req.params
  const { Id } = req.params;
  

  try {
    const user = await User.findOne({
      where: { id: Id },
    });
  
    
    // Send the user data as JSON response
    res.json(user);
  } catch (error) {
    // Handle the error and respond appropriately
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'An error occurred while fetching the user profile.' });
  }
};

export const editUserProfile=async (req, res) => {
  const { userId } = req.params;
  const { name, phoneNumber } = req.body;

  try {
    const user = await User.update(
      { name,  phoneNumber },
      { where: { id: userId } }
    );
    
    if (user[0] === 1) {
      res.status(200).json({ message: 'Profile updated successfully' });
    } else {
      res.status(400).json({ message: 'Failed to update profile' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const reAssign=async (req, res) => {
  console.log('req.body-11',req.body);
  try {
    const {
      reassignId,
      deadline,
      taskId,
      projectId,
      testerId,
      taskStartedDate,
      reassignDate,
      severity,
      bugReportId,
      previousDeveloperId,
      reassignedToId,
    } = req.body;

    // Ensure required fields are present
    if (!reassignId || !taskId || !projectId || !testerId || !severity || !bugReportId || !previousDeveloperId || !reassignedToId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create the ReAssign record in the database
    const newReassign = await ReAssign.create({
      reassignId,
      deadline,
      taskId,
      projectId,
      testerId,
      taskStartedDate,
      reassignDate,
      severity,
      bugReportId,
      previousDeveloperId,
      reassignedToId,
    });

    return res.status(201).json({ message: 'Reassignment data saved successfully', data: newReassign });
    
  } catch (error) {
    
  }
}

export const getProjectCounts = async (req, res) => {
  try {
    // Get total project count
    const totalProjects = await Project.count();

    // Get count of completed projects
    const completedProjects = await Project.count({
      where: { status: 'completed' }
    });

    res.status(200).json({ totalProjects, completedProjects });
  } catch (error) {
    console.error('Error fetching project counts:', error);
    res.status(500).json({ error: 'Failed to fetch project counts' });
  }
};

export const getReAssignedTasks = async (req, res) => {

  
  try {
    const reAssignedTasks = await ReAssign.findAll({
      include: [
        { model: Task, as: 'task', attributes: ['TaskName'] },
        { model: Project, as: 'project', attributes: ['name'] },
        { model: User, as: 'tester', attributes: ['name'] },
        { model: User, as: 'previousDeveloper', attributes: ['name'] },
        { model: User, as: 'reassignedTo', attributes: ['name'] },
        { model: BugReport, as: 'bugReport', attributes: ['severity','steps','fileLink'] },
      ],
    });
console.log('reassigndata',reAssignedTasks);

    res.status(200).json(reAssignedTasks);
  } catch (error) {
    console.error('Error fetching re-assigned tasks:', error);
    res.status(500).json({ error: 'Failed to fetch re-assigned tasks' });
  }
};

export const projectTrack=async (req, res) => {
  const {id}=req.params
 console.log('userdetails');
 
   try {
     const tasks = await Task.findAll({
       where: { assigned: id }, // Fetch tasks where 'assigned' matches the userId
       include: [Project], // Assuming Task belongs to Project, you can include the Project details as well
     });
 console.log('task',tasks);
 
     res.status(200).json(tasks);
   } catch (error) {
     console.error('Error fetching tasks:', error);
     res.status(500).json({ message: 'Failed to fetch tasks for the user' });
   }
 };