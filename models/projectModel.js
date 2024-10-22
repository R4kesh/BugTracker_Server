
import { DataTypes } from 'sequelize';
import db from '../config/db.js';



const Project = db.define('Project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    completionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('not-started', 'in-progress', 'completed', 'on-hold'),
      allowNull: false,
    },
  });

  export default Project;

  export const associateProject = (models) => {
    Project.hasMany(models.Task, { foreignKey: 'projectId' });
};



  const syncProjectTable = async () => {
    try {
      await Project.sync({alter:true});
      console.log('Project table created or exists already');
    } catch (error) {
      console.error('Error creating project table:', error);
    } 
  };
  
  syncProjectTable();
      