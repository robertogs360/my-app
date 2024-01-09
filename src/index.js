import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import Home from './Home';
import CreateStudent from './CreateStudent';
import StudentDetails from './StudentDetails';
import SearchList from './SearchList';
import ModifyStudent from './ModifyStudent';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const [currentView, setCurrentView] = useState('Home');
  const [studentId, setStudentId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [editStudentData, setEditStudentData] = useState(null); // Nuevo estado para los datos del estudiante a editar


  let ComponentToShow;
  switch (currentView) {
    case 'Home':
      ComponentToShow = <Home setCurrentView={setCurrentView} setStudentId={setStudentId} searchText={searchText} setSearchText={setSearchText} />;
      break;
    case 'CreateStudent':
      ComponentToShow = <CreateStudent setCurrentView={setCurrentView} />;
      break;
    case 'StudentDetails':
      ComponentToShow = <StudentDetails studentId={studentId} setCurrentView={setCurrentView} setEditStudentData={setEditStudentData} />;
      break;
    case 'SearchList':
      ComponentToShow = <SearchList setStudentId={setStudentId} setCurrentView={setCurrentView} searchText={searchText} />;
      break;
    case 'ModifyStudent':
      ComponentToShow = <ModifyStudent setCurrentView={setCurrentView} studentData={editStudentData} />;
      break;
    default:
      ComponentToShow = <Home setCurrentView={setCurrentView} />;
  }

  return (
    <React.StrictMode>
      {ComponentToShow}
    </React.StrictMode>
  );
};

root.render(<App />);