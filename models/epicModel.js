import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Project from './projectModel.js'; 

const Epic = db.define('Epic', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Project, 
      key: 'id',
    },
  },
  status: {
   
    type: DataTypes.ENUM('not started', 'started', 'in progress', 'completed'),

    allowNull: true,
    defaultValue: 'not started',
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,  
  },
});

export const associateEpic = (models) => {
  if (models.Project) {
    Epic.belongsTo(models.Project, { foreignKey: 'projectId' });
  }
};

export default Epic;

// Function to sync Epic table
const syncEpicTable = async () => {
  try {
    await Project.sync();  // Ensure Project table is synced first
    await Epic.sync({ alter: true });  // Use { alter: true } to update without recreating
    console.log('Epic table created or exists already');
  } catch (error) {
    console.error('Error creating Epic table:', error);
  }
};

syncEpicTable();
