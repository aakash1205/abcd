const express = require("express");
const User = require("./model/user");
const app = express();
const bcrypt=require("bcryptjs");
// const user = require("./model/user");
const jwt=require("jsonwebtoken");
cors = require("cors");
const cookieParser =require("cookie-parser");
const auth = require("./middleware/auth");
require("dotenv").config();
require("./database/database").connect()

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.get("/",(req,res)=>{

    res.send("<h1>SERVER IS WORKING</h1>");

})


app.post("/register", async(req,res)=>{
    try {
        //get data from body
        const {firstname,lastname,email,password}=req.body
        //all data should exist 
        if(!(firstname && lastname && email && password )){
            res.status(400).send(`all data should be entered`);
        }
        // if user already exists 
        const exisUser = await User.findOne({email})
        if(exisUser){
            res.status(400).send("User already exists with the email");
        }

        // encrypt password
        const encrpass = await bcrypt.hash(password,10);

        //save user in DB
       const user = await User.create({
        firstname,
        lastname,
        email,
        password:encrpass

       })


       const token = jwt.sign({
        id:user._id,email
       }, 'shhhhh',{
        expiresIn:"2h"
       });


       user.token=token;
       res.status(200).json(user);


        //generate token for user 
        
    } catch (error) {
        console.log(`Error it issss`);
        
    }
})

app.post("/login",async (req,res)=>{
    try {
        //get all data from frontend
        const { email, password } = req.body;
        //validation
        if(!(email && password)){
            res.status(400).send(`send all data`)
        }

        const user = await User.findOne({email})
        if( user && await bcrypt.compare(password,user.password)){
           const token= jwt.sign({id:user._id},'shhhhh',{
                expiresIn:"2h"
            });


            user.token = token;
            
            res.status(200).json(user);
        }
       

        const options={
            expires: new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true
        };
        res.status(200).cookie("token",token,options).json({
            success:true,
            token:token,
            user
        })


        //find user in DB
        // password should be encrypted and compared
        // match password
        //send token
        
    } catch (error) {
        console.log("Error",error)
        
    }
    
})


app.get("/dashboard",auth,(req,res)=>{
    res.send("WELCOME TO DASHBOARD")
   
})


app.get("/blogs", async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/blogger/v3/blogs/2399953?key=${process.env.API_KEY}`
    );
    res.json(response.data);
    console.log(res.json(response.data));
    
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal Server Error");
  }
});
   






module.exports = app;
