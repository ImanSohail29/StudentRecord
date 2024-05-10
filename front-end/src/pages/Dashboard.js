import axios from "axios";
import DashboardCompoent from "./components/DashboardComponent";

const getStudents = async () => {
    const { data } = await axios.get("/api/students")
    return data
}
const newStudent = async (students) => {
    const { data } = await axios.post("/api/students", students)
    return data
}
const deleteStudent = async (id) => {
    console.log(id)
    const { data } = await axios.delete(`/api/students/${id}`)
    return data
}
const updateStudent = async (id,newData) => {
    console.log("id+newData:  "+id+JSON.stringify(newData))
    const { data } = await axios.put(`/api/students/${id}`, { ...newData })
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