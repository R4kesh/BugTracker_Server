import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; 
import sequelize from './config/db.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', authRoutes);



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Server Error!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
