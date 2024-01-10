import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import Home from './Home';
import CreateStudent from './CreateStudent';
import StudentDetails from './StudentDetails';
import SearchList from './SearchList';
import ModifyStudent from './ModifyStudent'
import Login from './Login';

import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const [currentView, setCurrentView] = useState('Home');
  const [studentId, setStudentId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [editStudentData, setEditStudentData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');


  let ComponentToShow;
  if (!isAuthenticated) {
    ComponentToShow = <Login onLogin={setIsAuthenticated} onSetUserName={setUserName} />;
  } else {
    switch (currentView) {
      case 'Home':
        ComponentToShow = <Home setCurrentView={setCurrentView} setStudentId={setStudentId} searchText={searchText} setSearchText={setSearchText} userName={userName} />;
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
  }

  return (
    <React.StrictMode>
      {ComponentToShow}
    </React.StrictMode>
  );
};

root.render(<App />);