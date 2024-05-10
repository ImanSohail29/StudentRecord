import React, { useState, useEffect } from 'react';
import ImportCSV from '../../components/importCSV';
import StudentTable from '../../components/studentTable';

const DashboardCompoent = ({getStudents,newStudent,deleteStudent,updateStudent}) => {
  const [students, setStudents] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  const handleImport = (data) => {
    console.log("data:"+JSON.stringify(data))
    // Assuming the CSV data format is [{ id, name, age, grade }, ...]
    newStudent(data)
      .then(() => {
        // Refresh students after importing
        getStudents().then(setStudents);
      })
      .catch(error => console.error('Error importing students:', error));
  };

  const handleDelete = (studentId) => {
    deleteStudent(studentId)
      .then(() => {
        // Refresh students after deleting
        const updatedStudents = students.filter(student => student.id !== studentId);
        setStudents(updatedStudents);
      })
      .catch(error => console.error('Error deleting student:', error));
  };

  const handleEdit = (studentId) => {
    setEditingStudentId(studentId);
  };

  const handleSaveEdit = (studentId, newData) => {
    updateStudent(studentId, newData)
      .then(() => {
        // Refresh students after editing
        getStudents().then(setStudents);
        setEditingStudentId(null);
      })
      .catch(error => console.error('Error editing student:', error));
  };


  return (
    <div>
      <h1>Dashboard</h1>
      <ImportCSV onImport={handleImport} />
      <StudentTable students={students} editingStudentId={editingStudentId} onDelete={handleDelete} onEdit={handleEdit} onSaveEdit={handleSaveEdit} />
    </div>
  );
};

export default DashboardCompoent;
