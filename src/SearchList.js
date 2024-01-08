import React, { useState, useEffect } from 'react';

const SearchList = ({ searchTerm, setCurrentView }) => {
  const [searchResults, setSearchResults] = useState([]);

useEffect(() => {
  fetch(`https://localhost:7297/api/Students/search?term=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
        const searchResults = data;
        setSearchResults(searchResults);
    })
}, [searchTerm]);

  return (
    <div>
      <button onClick={() => setCurrentView('Home')}>Back to Home</button>
    </div>
  );
};

export default SearchList;
