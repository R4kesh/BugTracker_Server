import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Project from './projectModel.js'
import User from './suserModel.js'

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
    allowNull: false,
  },
   
});

export const associateTask = (models) => {
    
    if (models.Project) {
    Task.belongsTo(models.Project, { foreignKey: 'projectId' });
   
    }
    if (models.User) {
      
    Task.belongsTo(models.User, { foreignKey: 'assigned', as: 'assignedUser' });
    }
};

export default Task;

// const syncTaskTable = async () => {
//     try {
//         await Task.sync();
//         console.log('Task table created or exists already');
//     } catch (error) {
//         console.error('Error creating task table:', error);
//     }
// };

const syncTables = async () => {
  try {
      // Sync Project and User first since Task depends on them
      await Project.sync();
      await User.sync();

      // Now sync Task, which has foreign key dependencies
      await Task.sync({ alter: true });  // or use { force: true } if you want to recreate the table

      console.log('All tables synced successfully');
  } catch (error) {
      console.error('Error syncing tables:', error);
  }
};

syncTables();


