import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; 
import dashboardRoutes from './routes/dashboardRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import sequelize from './config/db.js';
import User from './models/userModel.js'
import Task, { associate as associateTask } from './models/taskModel.js'

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/project', projectRoutes);




app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Server Error!' });
});

const syncModels = async () => {
    try {
        
        await sequelize.sync();
        console.log('Database models synced successfully');

        associateTask({ User }); 
    } catch (error) {
        console.error('Error syncing models:', error);
    }
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        await syncModels(); 
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
