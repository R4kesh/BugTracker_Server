import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Task from './taskModel.js';
import User from './suserModel.js';
import BugReport from './bugReportModel.js';
import Project from './projectModel.js'; // Assuming you have a Project model

const ReAssign = db.define('ReAssign', {
  reassignId: {
    type: DataTypes.STRING, // Assuming string for reassign ID
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Task,
      key: 'id',
    },
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Project, // Assuming Project model exists
      key: 'id',
    },
  },
  testerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  taskStartedDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reassignDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Set default value to current date
  },
  severity: {
    type: DataTypes.ENUM('High', 'Medium', 'Low'),
    allowNull: false,
  },
  bugReportId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: BugReport,
      key: 'id',
    },
  },
  previousDeveloperId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  reassignedToId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  isCompleted: {
    type: DataTypes.BOOLEAN, // Boolean field for task completion
    defaultValue: false, // Set default value to false
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('not-started', 'in-progress', 'completed', 'on-hold'),
    allowNull: false,
    defaultValue: 'not-started',  
  },
});

export const associateReAssign = ({ Task, User, BugReport, Project }) => {
  ReAssign.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });
  ReAssign.belongsTo(Project, { foreignKey: 'projectId', as: 'project'  });
  ReAssign.belongsTo(User, { foreignKey: 'testerId', as: 'tester' });
  ReAssign.belongsTo(BugReport, { foreignKey: 'bugReportId', as: 'bugReport' });
  ReAssign.belongsTo(User, { foreignKey: 'previousDeveloperId', as: 'previousDeveloper' });
  ReAssign.belongsTo(User, { foreignKey: 'reassignedToId', as: 'reassignedTo' });
};

export const syncReAssignTable = async () => {
    try {
        await ReAssign.sync({ alter: true });
     
        console.log('All tables synced successfully');
    } catch (error) {
        console.error('Error syncing tables:', error);
    }
  };

  syncReAssignTable();


export default ReAssign;