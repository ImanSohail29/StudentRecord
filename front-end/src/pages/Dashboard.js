import axios from "axios";
import DashboardCompoent from "./components/DashboardComponent";
//CRUD
const getStudents = async () => {
    const { data } = await axios.get("https://student-record-backend-2uc7nxzvq-imansohail29s-projects.vercel.app/api/students")
    return data
}
const newStudent = async (students) => {
    const { data } = await axios.post("https://student-record-backend-2uc7nxzvq-imansohail29s-projects.vercel.app/api/students", students)
    return data
}
const deleteStudent = async (id) => {
    console.log(id)
    const { data } = await axios.delete(`https://student-record-backend-2uc7nxzvq-imansohail29s-projects.vercel.app/api/students/${id}`)
    return data
}
const updateStudent = async (id,newData) => {
    console.log("id+newData:  "+id+JSON.stringify(newData))
    const { data } = await axios.put(`https://student-record-backend-2uc7nxzvq-imansohail29s-projects.vercel.app/api/students/${id}`, { ...newData })
    return data
}
const Dashboard = () => {

    return (
        <DashboardCompoent
        getStudents={getStudents} newStudent={newStudent} deleteStudent={deleteStudent} updateStudent={updateStudent}
        >
        </DashboardCompoent>
    )
}
export default Dashboard;