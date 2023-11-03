const express  = require("express")
const routes = express.Router();
const {body , validationResult} = require('express-validator')
const User = require('../models/User')
const fetchuser = require('../middleware/fetchuser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_sec = "Aniskhan1234"
const nodemailer = require("nodemailer")
const otpgenerator = require("otp-generator")



const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
    user: "anisk8161@gmail.com",
    pass: "hlqa uesc gcsq czuq",
  }
});

let sharedOTP = "";


routes.post("/sendotp", async (req, res) => {
  const email = req.body.email;
  const otp = otpgenerator.generate(6, {
    integer: true,
    alphabets: false,
    specialChars: false,
  });
    sharedOTP = otp;
  try {
    // Send the OTP to the user's email
    const mailOptions = {
      from: "anisk8161@gmail.com",
      to: email,
      subject: "Email Verification OTP",
      text:` Your OTP for email verification is: ${otp}`,
  };
   await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error");
  }
});







routes.post('/createuser', [
    body('email' , 'Enter valid Email').isEmail(),
    body('name' , 'Enter Valid Name').isLength({ min: 5 }),
    body('password' , 'Enter valid password').isLength({ min: 5 }), 
    body('profile' , 'Please Select Profile'), 
], async (req, res ) =>{
  let success  = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
  try {
    

      
    let user= await  User.findOne({email : req.body.email});
    if(user){
      return res.status(400).json({success ,  errors: "Sorry a  user With email already Exist" });
    }
     const email = req.body.email;
      const providedOTP = req.body.otp;

      // Generate the OTP for the provided email (matching the one sent)
         const otp = sharedOTP;

      if (providedOTP !== otp) {
        return res.status(400).json({ success, message: "Invalid OTP" });
      }


    const salt = await bcrypt.genSalt(10);
    const secPass =  await bcrypt.hash(req.body.password,salt)
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        profile: "",
      })

    //   .then(user => res.json(user))
    //   .catch(err=> { 
    // res.json({error : "Please Enter Valid Input" , message :err.message})})
const data = {
  user:{id:user.id}
}
const token = jwt.sign(data, jwt_sec);
success = true
    res.json({success, token})
  } catch (error) {
    console.log(error.message)
    res.status(5000).send("Some Error occured")
        
  }
})


// login

routes.post('/login', [
  body('email' , 'Enter valid Email').isEmail(),
  body('password' , 'Enter valid password').exists(), 
], async (req, res ) =>{
  let success  = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
  const {email , password} = req.body
  try {
    const user =  await User.findOne({email});
    if(!user){
      return res.status(400).json({ success ,errors: "Please enter valid  credentails" });
    }
    const compare = await bcrypt.compare(password , user.password)
    if(!compare){
      return res.status(400).json({ success , errors: "Please enter valid  credentails" });
    }
    const data = {
      user:{
        id:user.id
      }
    }
    const token = await jwt.sign(data, jwt_sec);
    success = true
    res.json({ success ,token})
    
  } catch (error) {
    success = false
    console.log(error.message)
    res.status(5000).send(success , "Some Error occured")   
  }
})



// getuser

routes.post('/getuser',fetchuser, async (req, res ) =>{
  try {
   const userID =await req.user.id; 
   const user = await  User.findById(userID).select("-password")
   res.send(user)
  } catch (error) {
    console.log(error.message)
    res.status(5000).send("Some Error occured")   
  }
})
module.exports = routes; 