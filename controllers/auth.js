import User from "../models/User.js";

export const createUser=async(req,res)=>{

    try{
        const{firstName,lastName,email,password,teacher,student}=req.body
        console.log(req.body)
        const newUser=new User({
        firstName,
        lastName,
        email,
        password,
        previousCourses:[],
        currentCourses:[],
        teacher,
        student,


    })
    const savedUser=await newUser.save()
    res.status(201).json(savedUser)

    }
    catch(err){
        res.status(500).json(req.body)
    }
    
}

export const login=async (req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email:email})
        if(!user) return res.status(400).json({msg:"User does not exist"})
        res.status(200).json({user})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}