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

  export const associateBugReport = (models) => {
    BugReport.belongsTo(models.TestCase, { foreignKey: 'testCaseId' });
    BugReport.belongsTo(models.Task, { foreignKey: 'taskId' });
    BugReport.belongsTo(models.User, { foreignKey: 'testerId', as: 'tester' }); // Reference to tester
  };
  
//   export default BugReport;
  
//   const syncBugReportTable = async () => {
//     try {
//       await BugReport.sync({ alter: true }); // or { force: true } if you want to recreate the table
//       console.log('BugReport table created or exists already');
//     } catch (error) {
//       console.error('Error creating BugReport table:', error);
//     }
//   };

const syncBugReportTable = async () => {
    try {
      await BugReport.sync({ force: true }); // or { alter: true } to just modify
      console.log('BugReport table created or exists already');
    } catch (error) {
      if (error.name === 'SequelizeDatabaseError' && error.original.code === 'ER_FK_CANNOT_DROP_PARENT') {
        // Handle foreign key constraint error
        console.log('Dropping dependent tables due to foreign key constraints.');
        await BugReport.sync({ force: true }); // Drop the BugReport table first
        await syncTestCaseTable(); // Sync TestCase after dropping BugReport
      } else if (error.name === 'SequelizeDatabaseError' && error.original.code === 'ER_LOCK_DEADLOCK') {
        console.error('Deadlock found, retrying...');
        await syncBugReportTable(); // Retry syncing BugReport table
      } else {
        console.error('Error creating BugReport table:', error);
      }
    }
  };

  export { BugReport, syncBugReportTable };
  
  syncBugReportTable();
 