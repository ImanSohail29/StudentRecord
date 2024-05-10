import React, { useState } from 'react';
import Papa from 'papaparse'; // A library to parse CSV data
import { Button, Col, Row } from 'react-bootstrap';

const ImportCSV = ({ onImport }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target.result;
        Papa.parse(csv, {
          complete: (result) => {
            onImport(result.data); // Pass parsed CSV data to parent component
          },
          header: true // Assuming the first row contains headers
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <Row className='m-5'>
      <Col md={4}>  <input class="form-control form-control-lg" id="formFileLg" type="file" onChange={handleFileChange} />
      </Col>
      <Col md={2}>      <Button variant='success' onClick={handleImport}>Import CSV</Button>
      </Col>

    </Row>
  );
};

export default ImportCSV;