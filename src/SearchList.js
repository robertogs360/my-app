import React, { useState, useEffect } from 'react';
const SearchList = ({ searchText, setStudentId, setCurrentView }) => {
  const [searchResults, setSearchResults] = useState([]);

  console.log(searchText);

  useEffect(() => {
    if (searchText) {
      fetch(`https://localhost:7297/api/Students/search?term=${searchText}`)
        .then(response => response.json())
        .then(data => setSearchResults(data))
        .catch(error => console.error('Error fetching data: ', error));
    }
  }, [searchText]);

  const handleStudentClick = (id) => {
    setStudentId(id);
    setCurrentView('StudentDetails');
  };

  return (
    <div className="search-results">
      <div className="search-header">
        <h2>Resultados de Búsqueda</h2>
      </div>
      <div className="search-list">
        {searchResults.map(student => (
          <div key={student.id} className="search-item" onClick={() => handleStudentClick(student.id)}>
            <span>{student.name}</span>
            <span>{student.surname}</span>
          </div>
        ))}
      </div>
      <button onClick={() => setCurrentView('Home')}>Back to Home</button>
    </div>
  );
};

export default SearchList;
