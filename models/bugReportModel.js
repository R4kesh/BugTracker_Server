import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import TestCase from './testCasesModel.js';
import Task from './taskModel.js';
import User from './suserModel.js';

const BugReport = db.define('BugReport', {
    severity: {
      type: DataTypes.ENUM('High', 'Medium', 'Low'),
      allowNull: false,
    },
    result: {
      type: DataTypes.ENUM('Pass', 'Fail'),
      allowNull: false,
    },
    steps: {
        type: DataTypes.JSON,
    allowNull: false,
    },
    testStatus: {
      type: DataTypes.ENUM('Not Started', 'In Progress', 'Completed'),
      allowNull: false,
      defaultValue: 'Not Started',
    },
    testCaseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TestCase,
        key: 'id',
      },
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Task,
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
    fileLink: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  // export const associateBugReport = (models) => {
  //   BugReport.belongsTo(models.TestCase, { foreignKey: 'testCaseId' });
  //   BugReport.belongsTo(models.Task, { foreignKey: 'taskId' });
  //   BugReport.belongsTo(models.User, { foreignKey: 'testerId', as: 'tester' }); // Reference to tester
  // };

  export const associateBugReport = ({ TestCase, Task, User }) => {
    BugReport.belongsTo(TestCase, { foreignKey: 'testCaseId', as: 'testCase' });
    BugReport.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });
    BugReport.belongsTo(User, { foreignKey: 'testerId', as: 'tester' });
  };
  


  export const syncBugReportTable = async (retryCount = 5) => {
  try {
    await BugReport.sync({ alter: true }); // or { force: true } depending on your need
    console.log('BugReport table created or exists already');
  } catch (error) {
    if (error.name === 'SequelizeDatabaseError' && error.original.code === 'ER_LOCK_DEADLOCK') {
      if (retryCount > 0) {
        console.error('Deadlock found, retrying...', retryCount, 'attempts left');
        await new Promise(res => setTimeout(res, 1000)); // Delay before retry
        return syncBugReportTable(retryCount - 1);
      } else {
        console.error('Deadlock could not be resolved after retries');
      }
    } else {
      console.error('Error creating BugReport table:', error);
    }
  }
};


  
  syncBugReportTable();

  export default BugReport;
 