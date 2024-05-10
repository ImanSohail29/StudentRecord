import React, { useState } from 'react';
import Papa from 'papaparse'; // A library to parse CSV data

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
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleImport}>Import CSV</button>
    </div>
  );
};

export default ImportCSV;