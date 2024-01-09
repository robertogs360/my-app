import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const Home = ({ setCurrentView, setStudentId, searchText, setSearchText }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7297/api/Students')
      .then(response => response.json())
      .then(data => {
        const lastFiveStudents = data.map(student => ({
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
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'firstName', headerName: 'First name', width: 150, editable: false },
    { field: 'lastName', headerName: 'Last name', width: 200, editable: false },
    { field: 'dni', headerName: 'DNI', width: 150, editable: false },
    { field: 'address', headerName: 'Address', width: 300, editable: false },
    { field: 'cp', headerName: 'CP', width: 100, editable: false },
    { field: 'city', headerName: 'City', width: 200, editable: false },
    { field: 'phone', headerName: 'Phone', width: 150, editable: false },
    { field: 'email', headerName: 'Email', width: 300, editable: false },
  ];

  const handleRowClick = (params) => {
    setStudentId(params.row.id);
    setCurrentView('StudentDetails');
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = () => {
    setCurrentView('SearchList');
  };

  return (
    <div className="admin-panel">
      <header className="header">
        <h1>Bienvenido, userAdmin</h1>
      </header>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Busca o pincha en un alumno para modificar o eliminar"
          value={searchText}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchSubmit}>Search</button>
      </div>
      <Box sx={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={students}
          columns={columns}
          pageSize={5}
          onRowClick={handleRowClick}
        // checkboxSelection
        />
      </Box>
      <button onClick={() => setCurrentView('CreateStudent')} className="create-student-button">Crear Alumno</button>
    </div>
  );
};

export default Home;
