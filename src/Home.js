import React, { useState, useEffect } from 'react';
const Home = ({ setCurrentView, setStudentId, searchText, setSearchText }) => {
  const [Students, setStudents] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7297/api/Students')
      .then(response => response.json())
      .then(data => {
        const lastFiveStudents = data.slice(-5);
        setStudents(lastFiveStudents);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const handleStudentClick = (id) => {
    setStudentId(id);
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
      <div className="Student-list">
        <div className="student-item header">
          <span>Name</span>
          <span>Surname</span>
          <span>DNI</span>
          <span>Address</span>
          <span>CP</span>
          <span>City</span>
          <span>Phone</span>
        </div>
        {Students.map(student => (
          <div key={student.id} className="student-item" onClick={() => handleStudentClick(student.id)}>
            <span>{student.name}</span>
            <span>{student.surname}</span>
            <span>{student.dni}</span>
            <span>{student.address}</span>
            <span>{student.cp}</span>
            <span>{student.city}</span>
            <span>{student.phone}</span>
          </div>
        ))}
      </div>
      <button onClick={() => setCurrentView('CreateStudent')} className="create-student-button">Crear Alumno</button>
    </div>
  );
};

export default Home;
