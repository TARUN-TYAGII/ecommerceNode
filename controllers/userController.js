const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existinguser = await User.findOne({email});
        if(existinguser){
            return res.status(400).json({message : 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name,email,password : hashedPassword});
        await user.save();
        res.status(201).json({message : 'User registered successfully'});        
    }
    catch (error) {
        res.status(500).json({ message : 'Registration failed' });
    }
}

exports.login = async (req,res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message : 'Invalid credentials'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message : 'Invalid credentials'});
        }
        const token  = jwt.sign({userId : user._id, name : user.name, email : user.email}, process.env.JWT_SECRET, {expiresIn : '1h'});
        res.status(200).json({message : 'Login successful', token});
        
    }
    catch (error) {
        res.status(500).json({ message : 'Login failed' });
    }
}
