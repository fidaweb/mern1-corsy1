import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        min:2,
        max:50,
    },
    lastName:{
        type:String,
        required:true,
        min:2,
        max:50,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    previousCourses:{
        type:Array,
        default:[],
    },

    currentCourses:{
        type:Array,
        default:[],
    },
    teacher:{
        type:Boolean,
        default:true,
        required:true,
    },
    student:{
        type:Boolean,
        default:true,
        required:true,
    }

})

const User=mongoose.model("User",UserSchema)
export default User