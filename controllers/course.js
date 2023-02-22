import User from "../models/User.js";
import Course from "../models/Course.js";

export const getCourses=async(req,res)=>{
    try{
        const courses=await Course.find();
        console.log("kidiqid")
        res.status(200).json(courses)

    }
    catch(err){
        res.status(404).json({message:err.message})
    }
   

}


export const getCourse=async(req,res)=>{
    try{
        const {id}=req.params
        const course=await Course.findById(id)
        res.status(200).json(course)
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}

export const getCourseStudents=async(req,res)=>{
    try{
        const {id}=req.params
        const course=await Course.findById(id)

        const students=await Promise.all(course.students.map((id)=>User.findById(id)))
        const formattedStudents=students.map(({firstName,lastName})=>{return {firstName,lastName}})

        res.status(201).json({formattedStudents})
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}

export const getCourseTeachers=async(req,res)=>{
    try{
        const {id}=req.params
        const course=await Course.findById(id)

        const getCourseteachers=await Promise.all(course.teachers.map((id)=>User.findById(id)))
        const formattedTeachers=getCourseteachers.map(({firstName,lastName})=>{return {firstName,lastName}})

        res.status(201).json({formattedTeachers})
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}

export const createCourse=async(req,res)=>{
    try{
        console.log(req.body)
        const {userId,courseName,year,semester,description}=req.body
        console.log(req.body)
        const user=await User.findById(userId)
        if(user.teacher===true){
            const newCourse=new Course({
                courseName,
                year,
                semester,
                students:[],
                teachers:[],
                description


            
            })
           
            newCourse.teachers.push(userId)
            user.currentCourses.push(newCourse.id)
            await user.save();
            await newCourse.save();
            const courses=await Course.find()
            res.status(201).json(courses)

       }
       else{
           res.status(404).json({message:"not teacher"})
       }
    }
    catch(err){
        res.status(409).json({message:err.message})
    }
}