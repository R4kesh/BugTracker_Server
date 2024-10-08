import Project from '../../models/projectModel.js'
import Task from '../../models/taskModel.js'

export const addProject = async (req, res) => {
    try {

        const { projectName, projectDescription, startDate, projectStatus } = req.body;
        
  if (!projectName || !projectDescription || !startDate || !projectStatus) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  
    // Create a new project instance
    const newProject = new Project({
      name: projectName,
      description: projectDescription,
      startDate,
      status: projectStatus,
    });

    // Save to database
    await newProject.save();

    // Respond with success message
    res.status(201).json({ message: 'Project created successfully!', project: newProject });
        
    } catch (error) {
        console.log(error)
    }
}


export const displayProject  = async (req, res) => {
    try {

        const projects = await Project.findAll();

        // Log fetched data for debugging purposes
        console.log('Fetched projects:', projects);
        
        // Send the projects as a JSON response
        res.status(200).json(projects);
        
        
    } catch (error) {
        console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error, unable to fetch projects.' });
    }
}

export const getProjectName = async (req, res) => {
    try {

        const projectId = req.params.id;
       
        const project = await Project.findOne({
            where: { id: projectId },
            attributes: ['name'], 
          });
          if (!project) {
            return res.status(404).json({ message: 'Project not found' });
          }
      
        
          res.status(200).json({ name: project.name });
    } catch (error) {
        console.error('Error fetching project name:', error);
    res.status(500).json({ message: 'Server error, unable to fetch project name.' });
        
    }
}

export const taskCreation = async (req, res) => {
    try {
        const { projectName, taskName, description, projectId } = req.body;
        const newTask = await Task.create({
            projectName,
            taskName,
            description,
            projectId,
            assigned: null, // Initially set to null, can be updated later
            starting: null, // Can be updated later
            deadline: null, // Can be updated later
          });
      
          res.status(201).json(newTask);
        
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: 'Failed to create task' });
        
    }
}

export const taskList = async (req, res) => {
    try {
       
        const tasks = await Task.findAll(); // Fetch all tasks from the database
    res.status(200).json(tasks);
        
    } catch (error) {
        console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
        
    }
}


