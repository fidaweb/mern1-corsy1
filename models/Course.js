import mongoose from "mongoose";

const CourseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
    },
    year:{
        type:String,
        required:true,
    },
    semester:{
        type:String,
        required:true,
    },
    students:{
        type:Array,
        default:[],

    },
    teachers:{
        type:Array,
        default:[],
    },
    description:{
        type:String,
    }
})

const Course=mongoose.model("Course",CourseSchema)
export default Course