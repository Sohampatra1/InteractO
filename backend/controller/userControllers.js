const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../config/generateToken");
const mongoose = require('mongoose');

// function for registering user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if(!name || !email || !password) {
        res.status(400);

        throw new Error("Please enter all the fields");
    }

    const userExists = await User.findOne( {email} )

    if(userExists) {
        res.status(400);

        throw new Error("User already exists");
    }

    // if user doesn't exist we need to create a new user with all the provided details

    const user = await User.create({
        name, 
        email,
        password,
        pic,
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("Failed to create user"); 
    }
});



// function for login
const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   
   const user = await User.findOne({email});

   if(user && (await user.matchPassword(password)) ) {
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
    })
   }
   else {
    res.status(400);
    throw new Error("Inavlid email or password");
   }
});   


// /api/user?search=raunak --> GET request
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    // console.log(req.query.search);
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    console.log(users);
    // const users = await User.find(keyword);
    res.send(users);
});
  

module.exports = { registerUser, authUser, allUsers }



