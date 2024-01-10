import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

const StudentDetails = ({ studentId, setCurrentView, setEditStudentData }) => {
  const [studentDetails, setStudentDetails] = useState(null);

  useEffect(() => {
    // Llamada a la API para obtener los detalles del estudiante
    fetch(`https://localhost:7297/api/Students/${studentId}`)
      .then(response => response.json())
      .then(data => setStudentDetails(data))
      .catch(error => console.error('Error fetching student details: ', error));
  }, [studentId]);

  const deleteStudent = () => {
    if (window.confirm('¿Seguro que deseas eliminar este alumno?')) {
      // Realizar petición DELETE a la API
      fetch(`https://localhost:7297/api/Students/${studentId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            alert('Alumno eliminado correctamente.');
            setCurrentView('Home'); // Regresar a la vista principal después de la eliminación
          } else {
            alert('Error al eliminar al alumno.');
          }
        })
        .catch(error => {
          console.error('Error al eliminar al alumno: ', error);
          alert('Error al eliminar al alumno.');
        });
    }
  };

  if (!studentDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button onClick={() => setCurrentView('Home')}>BACK TO HOME</Button>
      <div className='student-details'>
        <div className='card'>
          <h2>Student Details</h2>
          <h4>{studentDetails.id}</h4>
          <h3>{studentDetails.surname}, {studentDetails.name}</h3>
          <p>DNI: {studentDetails.dni}</p>
          <p>Address: {studentDetails.address}</p>
          <p>CP: {studentDetails.cp}</p>
          <p>City: {studentDetails.city}</p>
          <p>Phone: {studentDetails.phone}</p>
          <p>E-mail: {studentDetails.email}</p>
        </div>
        <Button variant="outlined" color="error" onClick={deleteStudent}>DELETE</Button>
        <Button variant="outlined" onClick={() => {
          setEditStudentData(studentDetails);
          setCurrentView('ModifyStudent');
        }}>
          MODIFY
        </Button>    </div>
    </div>
  );
};

export default StudentDetails;