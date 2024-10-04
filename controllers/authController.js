import { createUser, getUserByEmail } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { name, email, password, role, phoneNumber } = req.body;

    
    if (!name || !email || !password || !role || !phoneNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

       
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        
        const newUser = await createUser(name, email, hashedPassword, role, phoneNumber);

        return res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    

    // Validate fields
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if user exists
        const user = await getUserByEmail(email);
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT payload
        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        // Generate token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        
        return res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
