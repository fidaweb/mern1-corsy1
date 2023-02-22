import express from "express";
import { getUser,
         getUserPreviousCourses,
         getUserCurrentCourses,
         addRemoveTeacherFromCourse,
         addRemoveStudentFromCourse,
         changeCourseToPrevious,
} from "../controllers/user.js"


const router=express.Router()
router.get("/:id",getUser)
router.get("/:id/previousCourses",getUserPreviousCourses)
router.get("/:id/currentCourses",getUserCurrentCourses)

router.patch("/:userId/:courseId/teacher",addRemoveTeacherFromCourse)
router.patch("/:userId/:courseId/student",addRemoveStudentFromCourse)
router.patch("/change/:id/:courseId",changeCourseToPrevious)

export default router