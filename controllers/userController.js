const User=require("../models/userModel")
const validator=require("validator")
const bcrypt=require("bcrypt")

exports.signup= async(req,res) =>{
    try{

        let email=req.body.email
        if(!validator.isEmail(email)){
            return res.status(404).json({message:"Enter a valid email"})

        }
         const checkEmail= await User.findOne({email:req.body.email})
         if(checkEmail){
            return res.status(400).json({message:"email already in use"}) 
         }

         let pass=req.body.password
         let passConfirm=req.body.confirmPassword
         if(pass!==passConfirm){
            return res.status(400).json({message:"Passwords do not match"})

         }

        //  const hashedPassword= await bcrypt.hash(pass,12)

         const newUser= await User.create({
            userName:req.body.userName,
            email:req.body.email,
            //type:req.body.type,
            password:req.body.password,
            confirmPassword:req.body.confirmPassword,
            type:req.body.type
         });

         
            return res.status(201).json({message:"User created",data:{newUser}})
            
         



    }
    catch(err){
        res.status(400).json({message:err.message})

    }
}

exports.login= async(req,res) =>{
    try{
        const currentUser=await User.findOne({email:req.body.email})
        if(!currentUser){
            return res.status(404).json({message:"The user does not exist"})

        }

        if(!(await currentUser.checkPassword(req.body.password,currentUser.password))){
            return res.status(401).json({message:"Invalid credentials P"})

        }

        return res.status(201).json({message:"Logged in Succ"})


       

    }
    catch(err){
        return res.status(404).json({message:err.message})
    }
}