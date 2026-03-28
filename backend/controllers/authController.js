const jwt = require("jsonwebtoken");
const User = require("../modals/User");


// Generate JwT token 

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,  {expiresIn: "1h"})
}

// Register user;

exports.registerUser = async(req, res) => {
    const {fullName, email, password, profileImageUrl} = req.body

    // Validation : check for missing feilds 
    if(!fullName || !email || !password){
        return res.status(400).json({message: "All feilds are required "});
    
    }

    try{
        // check email already exit 

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        // create new user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        })

        res.status(201).json({
            _id: user._id,
            user, 
            token: generateToken(user._id)
        })
    }catch(err){
       res.status(500).json({ message : "Error registering user", error: err.message});
    }
}


// Login user;

exports.loginUser = async(req, res) => {
    const {email, password} = req.body

    // Validation : check for missing feilds
    if(!email || !password){
        return res.status(400).json({message: "All feilds are required "});
    }

    try{
        const user = await User.findOne({email})
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message: "Invalid credentials"});
        }

        res.status(200).json({
            _id: user._id,
            user, 
            token: generateToken(user._id)
        })
    } catch(err){
        res.status(500).json({ message : "Error registering user", error: err.message});
    }
}

// get user info;

exports.getUserInfo = async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json(user);
        } catch (err){
            res.status(500).json({ message : "Error registering user", error: err.message});
        }
    }
