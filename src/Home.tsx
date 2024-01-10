import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface HomeProps {
  setCurrentView: (view: string) => void;
  setStudentId: (id: number) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  userName: string;
}

interface StudentApiResponse {
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

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  address: string;
  cp: string;
  city: string;
  phone: string;
  email: string;
}

const Home: React.FC<HomeProps> = ({ setCurrentView, setStudentId, searchText, setSearchText, userName }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);


  useEffect(() => {
    fetch('https://localhost:7297/api/Students')
      .then(response => response.json())
      .then((data: StudentApiResponse[]) => {
        setTotalStudents(data.length);
        const lastFiveStudents = data.slice(-4).map((student: StudentApiResponse) => ({
          id: student.id,
          firstName: student.name,
          lastName: student.surname,
          dni: student.dni,
          address: student.address,
          cp: student.cp,
          city: student.city,
          phone: student.phone,
          email: student.email
        }));
        setStudents(lastFiveStudents);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'firstName', headerName: 'First name', flex: 1, editable: false },
    { field: 'lastName', headerName: 'Last name', flex: 1, editable: false },
    { field: 'dni', headerName: 'DNI', flex: 1, editable: false },
    { field: 'address', headerName: 'Address', flex: 1, editable: false },
    { field: 'cp', headerName: 'CP', flex: 1, editable: false },
    { field: 'city', headerName: 'City', flex: 1, editable: false },
    { field: 'phone', headerName: 'Phone', flex: 1, editable: false },
    { field: 'email', headerName: 'Email', flex: 1, editable: false },
  ];

  const handleRowClick = (params: GridRowParams) => {
    setStudentId(params.row.id);
    setCurrentView('StudentDetails');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };


  const handleSearchSubmit = () => {
    setCurrentView('SearchList');
  };

  console.log(students.length)

  return (
    <div className="admin-panel">
      <header className="header">
        <h1 className="welcome">Welcome back, {userName}</h1>
      </header>
      <div className="search-bar">
        <div className="search-text">
          <TextField
            type="text"
            placeholder="ID, Name, Surname... "
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
        <div className="search-button">
          <Button variant="outlined" onClick={handleSearchSubmit}>Search</Button>
        </div>
        <h3 className="instructions">or... </h3>
        <h2 className="instructions">click on recently added students to see details</h2>
      </div>
      <Box className="data-box" sx={{ height: 350, width: '85%' }}>
        <DataGrid
          rows={students}
          columns={columns}
          hideFooterPagination={true}
          onRowClick={handleRowClick}
        />
      </Box>
      <Button variant="contained" onClick={() => setCurrentView('CreateStudent')} className="create-student-button">Create Student</Button>
      <h3 className="instructions">Total students: {totalStudents} </h3>
    </div>
  );
};

export default Home;