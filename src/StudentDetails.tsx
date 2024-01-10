import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { red, green, blue, yellow } from '@mui/material/colors';

interface StudentDetailsProps {
  studentId: number | null; 
  setCurrentView: (view: string) => void;
  setEditStudentData: (data: Student | null) => void;
}

interface Student {
  id: number;
  name: string;
  surname: string;
  dni: string;
  address: string;
  cp: string;
  city: string;
  phone: string;
  email: string;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ studentId, setCurrentView, setEditStudentData }) => {
  const [studentDetails, setStudentDetails] = useState<Student | null>(null);

  const getRandomColor = () => {
    const colors = [red[500], green[500], blue[500], yellow[500]];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const avatarColor = getRandomColor();

  useEffect(() => {
    fetch(`https://localhost:7297/api/Students/${studentId}`)
      .then(response => response.json())
      .then(data => setStudentDetails(data))
      .catch(error => console.error('Error fetching student details: ', error));
  }, [studentId]);


  const deleteStudent = () => {
    if (window.confirm('¿Seguro que deseas eliminar este alumno?')) {
      fetch(`https://localhost:7297/api/Students/${studentId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            alert('Student successfully removed .');
            setCurrentView('Home');
          } else {
            alert('Error to remove student.');
          }
        })
        .catch(error => {
          console.error('Error to remove student: ', error);
          alert('Error to remove student.');
        });
    }
  };

  const stringAvatar = (name: string, surname: string) => {
    return {
      children: `${name.split(' ')[0][0]}${surname.split(' ')[0][0]}`,
    };
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
          <Avatar className='student-avatar' sx={{ width: 75, height: 75, bgcolor: avatarColor }} {...stringAvatar(studentDetails.name, studentDetails.surname)} />
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