import React, { useRef, useState } from 'react';
import { Row, Col, Table, Container, InputGroup, Button } from "react-bootstrap";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
const StudentTable = ({ students, editingStudentId, onDelete, onEdit, onSaveEdit }) => {
  const [editedData, setEditedData] = useState({});
  const tableRef = useRef(null);
  const handleExportToPDF = () => {
    const input = tableRef.current;
    html2canvas(input)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('potrait', 'mm', 'a4')
        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('student_table.pdf')
      })
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditClick = (studentId, studentData) => {
    setEditedData(studentData);
    onEdit(studentId);
  };

  const handleSaveClick = (studentId) => {
    console.log("editedData:" + JSON.stringify(editedData))
    onSaveEdit(studentId, editedData);
    setEditedData({});
  };

  return (
    <Container>
      <Row>
        <Col>
          <Table bordered striped responsive ref={tableRef}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Grade</th>
                <th>Action        <Button onClick={handleExportToPDF}>Export to PDF</Button>
</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.ID}</td>
                  <td>{editingStudentId === student.id ? <input type="text" name="Name" defaultValue={editedData.Name || student.Name} onChange={handleInputChange} ></input> : student.Name}</td>
                  <td>{editingStudentId === student.id ? <input type="Number" name="Age" defaultValue={editedData.Age || student.Age} onChange={handleInputChange} ></input> : student.Age}</td>
                  <td>{editingStudentId === student.id ? <input type="text" name="Grade" defaultValue={editedData.Grade || student.Grade} onChange={handleInputChange} ></input> : student.Grade}</td>
                  <td>
                    {editingStudentId === student.id ? (
                      <Button variant='success' onClick={() => handleSaveClick(student.id)}>Save</Button>
                    ) : (
                      <>
                        <Button onClick={() => handleEditClick(student.id, student)}>Edit</Button>
                        <Button variant='danger' onClick={() => onDelete(student.id)}>Delete</Button>
                      </>)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentTable;