const express=require("express")
const router=express.Router()
const {getStudents, newStudent, deleteStudent, updateStudent}=require("../controller/studentController")

router.get("/",getStudents)
router.post("/",newStudent)
router.put("/:id",updateStudent)
router.delete("/:id",deleteStudent)

module.exports=router