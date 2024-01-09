import React, { useState, useEffect } from 'react';

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
      <button onClick={deleteStudent}>Eliminar alumno</button>
      <button onClick={() => {
        setEditStudentData(studentDetails);
        setCurrentView('ModifyStudent');
      }}>
        Modificar alumno
      </button>    </div>
  );
};

export default StudentDetails;