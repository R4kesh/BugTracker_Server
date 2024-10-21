import { createUser, getUserByEmail } from "../models/suserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOtp, sendOtpEmail } from "../utils/otp.js";

export const registerUser = async (req, res) => {
    const { name, email, password, role, phoneNumber } = req.body;
    const generatedotp = generateOtp();
    console.log("generatedotp", generatedotp);
    if (!name || !email || !password || !role || !phoneNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        await sendOtpEmail(email, generatedotp);

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const otp = generatedotp;
        const newUser = await createUser(name, email, hashedPassword, role, phoneNumber, otp);

        return res.status(201).json(newUser);
    } catch (error) {
        console.error("error at signup", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        if (role == "projectManager") {
            if (email === "pm@gmail.com" && password === "pm123") {
                const payload = {
                    user: {
                        id: "projectManagerId",
                        role: "projectManager",
                    },
                };

                // Generate token
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
                console.log("jw", jwt);
                return res.status(200).json({
                    token,
                    user: {
                        id: "projectManagerId",
                        name: "Project Manager",
                        email: "pm@gmail.com",
                        role: "projectManager",
                    },
                });
            }
        

    }else{
            

        const user = await getUserByEmail(email);
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (user.role !== role) {
            return res.status(403).json({ message: 'User role mismatch. Please select the correct role.' });
          }

        // Compare password
        if (!user.isVerified) {
            return res.status(400).json({ message: 'Please sign up and verify your identity.' });
          }
    
          // Check if the user is approved
          if (!user.isApproved) {
            return res.status(403).json({ message: 'Your team manager is not verified. Please wait or contact support.' });
          }
    
          // Check if the user is blocked
          if (user.isBlocked) {
            return res.status(403).json({ message: 'You have been blocked. Please contact your team manager.' });
          }

          
    
          // Check if password matches
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
          console.log('jw',token);

          res.cookie("accessToken", token, {
            httpOnly: false,
            secure: true,
            sameSite: "none",
            maxAge:60 * 60 * 1000,
          })

          return res.status(200).json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const otpNumber = Number(otp);
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.otp == otpNumber && user.otpExpires > new Date()) {
            user.isVerified = true; // Set the user as verified
            user.otp = null; // Clear the OTP

            await user.save();
            return res.status(200).json({ success: true, message: "OTP verified successfully" });
        } else {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const resentOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            console.log("User not found for email:", email);
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const newOtp = generateOtp();
        console.log("Generated new OTP:", newOtp);
        const otpExpirationTime = new Date(Date.now() + 10 * 60 * 1000);
        console.log("Updated user OTP and expiration time");

        user.otp = newOtp;
        user.otpExpires = otpExpirationTime;
        console.log("Updated user OTP and expiration time");

        await user.save();
        console.log("User saved successfully");

        console.log("Attempting to send OTP email...");
        await sendOtpEmail(user.email, newOtp);
        console.log("OTP email sent to:", user.email);

        res.status(200).json({ success: true, message: "OTP resent successfully" });
    } catch (error) {
        console.error("Error resending OTP:", error);
        res.status(500).json({ success: false, message: "An error occurred while resending OTP" });
    }
};
