const asyncHandler = require('express-async-handler');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/Users");

//User Registration
const usersController = {
    //Register
    register: asyncHandler(async(req, res) => {
        const { username,email,password } = req.body;
        if(!username || !email || !password){
            throw new Error("Please all fields are required");
        }
        const userExists = await User.findOne({ email });
        if(userExists){
            throw new("User already exists");
        }

        //Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create user and save to db
        const userCreated = await User.create({
            username,
            email,
            password: hashedPassword
        });

        //Send response
        res.json({
            username: userCreated.username,
            email: userCreated.email,
            id: userCreated._id
        })

        res.json({message: 'Register'})
    }),

    //Login
    login: asyncHandler(async(req,res) => {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            throw new Error('Invalid login credentials')
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error('Invalid password')
        }

        //Generate token
        const token = jwt.sign({id: user._id}, "userKey", {
            expiresIn: "30d"
        })

        //Send response
        res.json({
            message:'Login success',
            token,
            id: user._id,
            email: user.email,
            username: user.username
        })
    }),

    //Profile
    profile: asyncHandler(async(req,res) => {
        const user = await User.findById(req.user)
        if(!user) {
            throw new Error("User not found")
        }
        res.json({ username: user.username, email:user.email})
    }),

    //Change Password
    changePassword: asyncHandler(async(req,res) => {
        const {newPassword} = req.body;
        const user = await User.findById(req.user)
        if(!user) {
            throw new Error("User not found")
        }
        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: "Password changed successfully" })
    }),

    //Update User profile
     updateUserProfile: asyncHandler(async(req,res) => {
        const {email, username} = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.user, {
                username,
                email
            },
            {
                new: true
            }
        );
        res.json({ message: "User Profile updated successfully", updatedUser})
    }),
}

module.exports = usersController;