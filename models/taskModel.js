// models/taskModel.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Project from './projectModel.js';
import User from './userModel.js'; 

const Task = db.define('Task', {
    projectName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  taskName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
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
  
  assigned: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User, 
      key: 'id',
    },
  },
  starting: {
    type: DataTypes.DATE,
    allowNull: true, 
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true, 
  },
});

export default Task;


const syncTaskTable = async () => {
  try {
    await Task.sync();
    console.log('Task table created or exists already');
  } catch (error) {
    console.error('Error creating task table:', error);
  }
};

syncTaskTable();
