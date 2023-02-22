import express from "express"
import {
    getCourses,
    getCourse,
    createCourse,
    getCourseStudents,
    getCourseTeachers} from "../controllers/course.js"


const router=express.Router()
router.get("/",getCourses)
router.get("/:id",getCourse)
router.get("/:id/students",getCourseStudents)
router.get("/:id/teachers",getCourseTeachers)
router.post("/new",createCourse)

export default router