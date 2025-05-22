const asyncHandler = require('express-async-handler');
const bcrypt = require("bcryptjs")
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
    })
    //Login
    //Profile
}

module.exports = usersController;