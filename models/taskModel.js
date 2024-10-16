import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Project from './projectModel.js'
import User from './suserModel.js'
import Epic from './epicModel.js';

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
    epicId: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Epic,
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
    isVerifiedByAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
      allowNull: false,
  },
  isVerifiedByUser: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
    allowNull: false,
},
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
    allowNull: false,
},
status: {
    type: DataTypes.ENUM('pending', 'started', 'in-Progress', 'completed'),
    allowNull: true,
  },
  userStory: { 
    type: DataTypes.STRING(1000),
    allowNull: true, // Can be set to false if you want it to be required
},
   
});

export const associateTask = (models) => {
    
    if (models.Project) {
    Task.belongsTo(models.Project, { foreignKey: 'projectId' });
   
    }
    if (models.User) {
      
    Task.belongsTo(models.User, { foreignKey: 'assigned', as: 'assignedUser' });
    }
    if (models.Epic) {  
        Task.belongsTo(models.Epic, { foreignKey: 'epicId' });
    }
};

export default Task;



const syncTables = async () => {
  try {
    
      await Project.sync();
      await User.sync();
      await Epic.sync();
  
      await Task.sync({ alter: true });
    
      

      console.log('All tables synced successfully');
  } catch (error) {
      console.error('Error syncing tables:', error);
  }
};

syncTables();


