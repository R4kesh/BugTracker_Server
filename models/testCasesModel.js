// models/testCaseModel.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Task from './taskModel.js';

const TestCase = db.define('TestCase', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,  // Make sure the type matches the corresponding field
    references: {
        model: 'Tasks', // The table your `taskId` relates to
        key: 'id',
    },
},
  severity: {
    type: DataTypes.ENUM('High', 'Medium', 'Low'),
    allowNull: true,  // Or provide a default value like:
        defaultValue: 'low',
  },
  testStatus: {
    type: DataTypes.STRING,
    allowNull: true,  // Or provide a default value:
    defaultValue: 'pending', 
  },
  fileLink: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

// Association with Task
export const associateTestCase = (models) => {
  TestCase.belongsTo(models.Task, { foreignKey: 'taskId' }); // Each test case belongs to a specific task
};

export default TestCase;

// Sync function for TestCase
const syncTestCaseTable = async () => {
  try {
    await TestCase.sync({ force: true });
    console.log('TestCase table created or exists already');
  } catch (error) {
    console.error('Error creating TestCase table:', error);
  }
};

syncTestCaseTable();
