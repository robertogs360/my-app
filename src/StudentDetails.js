import React, { useState, useEffect } from 'react';

const StudentDetails = ({ studentId, setCurrentView }) => {
  const [studentDetails, setStudentDetails] = useState(null);

  console.log(studentId)

  useEffect(() => {
    // Aquí se haría la llamada a la API para obtener los detalles del estudiante
    fetch(`https://localhost:7297/api/Students/${studentId}`)
      .then(response => response.json())
      .then(data => setStudentDetails(data))
      .catch(error => console.error('Error fetching student details: ', error));
  }, [studentId]);

  if (!studentDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Student Details</h2>
      <h3>{studentDetails.name}</h3>
      <p>{studentDetails.id}</p>
      <p>{studentDetails.dni}</p>
      <p>{studentDetails.surname}</p>
      <p>{studentDetails.address}</p>
      <p>{studentDetails.cp}</p>
      <p>{studentDetails.city}</p>
      <p>{studentDetails.phone}</p>
      <p>{studentDetails.email}</p>
      <button onClick={() => setCurrentView('Home')}>Back to Home</button>
    </div>
  );
};

export default StudentDetails;
