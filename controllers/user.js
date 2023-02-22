import User from "../models/User.js"
import Course from "../models/Course.js"

export const getUser=async(req,res)=>{
    try{
        const {id}=req.params
        const user=await User.findById(id);
        res.status(200).json(user)
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}

export const getUserPreviousCourses=async (req,res)=>{
    try{
        const { id }=req.params
        const user=await User.findById(id)

        const previousCourses=await Promise.all(
            user.previousCourses.map((id)=>Course.findById(id))
        )

        const formattedPreviousCourses=previousCourses.map(({
            _id,courseName,year,semester,
        })=>{return {_id,courseName,year,semester}})

        res.status(200).json(formattedPreviousCourses)
        


    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}


export const getUserCurrentCourses=async (req,res)=>{
    try{
        const { id }=req.params
        const user=await User.findById(id)

        const currentCourses=await Promise.all(
            user.currentCourses.map((id)=>Course.findById(id))
        )

        const formattedCurrentCourses=currentCourses.map(({
            _id,courseName,year,semester,
        })=>{return {_id,courseName,year,semester}})

        res.status(200).json(formattedCurrentCourses)
        


    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}

export const addRemoveStudentFromCourse=async(req,res)=>{

    try{
    const{userId,courseId}=req.params
    const user=await User.findById(userId)
    const course=await Course.findById(courseId)

  //  if(user.currentCourses.includes(courseId)){
   if(course.students.includes(userId)) {
    const count=0;
    
   
    user.currentCourses=user.currentCourses.filter((id)=>id!==courseId)
    course.students=course.students.filter((id)=>id!==userId)
    
      
        
    }
    else{
        user.currentCourses.push(courseId)
        course.students.push(userId)
    }

    await user.save()
    await course.save()

    const currentCourses=await Promise.all(
        user.currentCourses.map((id)=>Course.findById(id))
    )

    const formattedCurrentCourses=currentCourses.map(({
        _id,courseName,year,semester
    })=>{return {_id,courseName,year,semester}})

    res.status(200).json(formattedCurrentCourses)



    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}


export const addRemoveTeacherFromCourse=async(req,res)=>{

    try{
    const{userId,courseId}=req.params
    const user=await User.findById(userId)
    const course=await Course.findById(courseId)
       
   // if(user.currentCourses.includes(courseId)){
    if(course.teachers.includes(userId)){
        user.currentCourses=user.currentCourses.filter((id)=>id!==courseId)
        const count=0;
        
        

        course.teachers=course.teachers.filter((id)=>id!==userId)
    }
    else{
        user.currentCourses.push(courseId)
        course.teachers.push(userId)
    }

    await user.save()
    await course.save()

    const currentCourses=await Promise.all(
        user.currentCourses.map((id)=>Course.findById(id))
    )

    const formattedCurrentCourses=currentCourses.map(({
        _id,courseName,year,semester
    })=>{return {_id,courseName,year,semester}})

    res.status(200).json(formattedCurrentCourses)



    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}







export const changeCourseToPrevious=async(req,res)=>{

    try{
    const {id , courseId }=req.params
    const user=await User.findById(id)
    const course=await Course.findById(courseId)
    
    if(user.currentCourses.includes(courseId)){
        user.currentCourses=user.currentCourses.filter((id)=>id!==courseId)
        user.previousCourses.push(courseId)
        
        await user.save()

    const currentCourses=await Promise.all(user.currentCourses.map((id)=>Course.findById(id)))
    const formattedCurrentCourses=currentCourses.map(({ _id,courseName,year,semester})=>{return { _id,courseName,year,semester}})

    //const previousCourses=await Promise.all(user.previousCourses.map((id)=>Course.findById(id)))
    //const formattedPreviousCourses=previousCourses.map(({ _id,courseName,year,semester})=>{return { _id,courseName,year,semester}})

    res.status(200).json(formattedCurrentCourses)
       
    }
    else{
        res.status(404).json({message:`not found`})
    }
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
    
    
}   