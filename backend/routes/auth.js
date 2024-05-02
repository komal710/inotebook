const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET ='komalisagoodgirl';
//Route 1
router.post('/createuser', [
    body('name','Enter a valid Name').isLength({ min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min: 5}),
] , async(req, res)=>{
      success = false;
    // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({sucess,errors: errors.array()});
        }
        //check whether the user with this email exists already
        try {let user= await User.findOne({success,email: req.body.email});
        if(user){
            
            return res.status(400).json({success, error:"Sorry a user with this email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
      })
    // .then(user => res.json(user))
    //   .catch(err=>{console.log(err)})
    //   res.json({error:'Please enter a unique value for email'})
    const data ={
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken})}
    //catch error
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error occured");
    }
})
//Route 2
// AUthenticate a User
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password cannot to blank').exists(),
] , async(req, res)=>{
  const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
        }
        const {email, password}= req.body;
        try{
          let user= await User.findOne({email});
          if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});

          }
          const passwordCompare = await bcrypt.compare(password, user.password);
          if(!passwordCompare){
            success=false;
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
          }
          //Payload
          const data ={
            user:{
              id: user.id
            }
          }
          const authtoken = jwt.sign(data, JWT_SECRET);
          success = true;
          res.json({success, authtoken})
        }
        catch(error){
          console.error(error.message);
          res.status(500).send("Internal server Error occured");
        }
});

//Route 3
//Get loggedin user details using: POST "/api/auth/getuser".Login required
router.post('/getuser', fetchuser,async(req, res)=>{

try{
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
}catch(error){
  console.error(error.message);
  res.status(500).send("Internal server Error occured");
}
})
module.exports = router;

