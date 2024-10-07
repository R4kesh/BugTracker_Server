import Project from '../../models/projectModel.js'

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
