import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const SearchList = ({ searchText, setStudentId, setCurrentView }) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchText) {
      fetch(`https://localhost:7297/api/Students/search?term=${searchText}`)
        .then(response => response.json())
        .then(data => {
          const formattedData = data.map(student => ({
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
          setSearchResults(formattedData);
        })
        .catch(error => console.error('Error fetching data: ', error));
    }
  }, [searchText]);

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

  const handleRowClick = (params) => {
    setStudentId(params.row.id);
    setCurrentView('StudentDetails');
  };

  return (
    <div className="search-results">
      <h2 class="search-result">Results for <span class="search-text-result">{searchText}</span>:</h2>
      <Button onClick={() => setCurrentView('Home')}>BACK TO HOME</Button>
      <Box sx={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={searchResults}
          columns={columns}
          pageSize={5}
          hideFooterPagination={true}
          onRowClick={handleRowClick}
        />
      </Box>
    </div>
  );
};

export default SearchList;