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
    allowNull: false,
  },
});

// Association with Task
export const associateTestCase = (models) => {
  TestCase.belongsTo(models.Task, { foreignKey: 'taskId' }); // Each test case belongs to a specific task
};

export default TestCase;

// Sync function for TestCase
const syncTestCaseTable = async () => {
  try {
    await TestCase.sync();
    console.log('TestCase table created or exists already');
  } catch (error) {
    console.error('Error creating TestCase table:', error);
  }
};

syncTestCaseTable();
