import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import Home from './Home';
import CreateStudent from './CreateStudent';
import StudentDetails from './StudentDetails';
import SearchList from './SearchList';
import ModifyStudent from './ModifyStudent';
import Login from './Login';

import './styles/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState < string > ('Home');
  const [studentId, setStudentId] = useState < number | null > (null);
  const [searchText, setSearchText] = useState < string > ('');
  const [editStudentData, setEditStudentData] = useState < any | null > (null); // Consider specifying a more detailed type for student data
  const [isAuthenticated, setIsAuthenticated] = useState < boolean > (false);
  const [userName, setUserName] = useState < string > ('');

  let ComponentToShow: JSX.Element;

  if (!isAuthenticated) {
    ComponentToShow = <Login onLogin={setIsAuthenticated} onSetUserName={setUserName} />;
  } else {
    switch (currentView) {
      case 'Home':
        ComponentToShow = <Home setCurrentView={setCurrentView} setStudentId={setStudentId} searchText={searchText} setSearchText={setSearchText} userName={userName} />;
        break;
      case 'CreateStudent':
        ComponentToShow = <CreateStudent setCurrentView={setCurrentView} isEditMode={false} />;
        break;
      case 'StudentDetails':
        ComponentToShow = <StudentDetails studentId={studentId} setCurrentView={setCurrentView} setEditStudentData={setEditStudentData} />;
        break;
      case 'SearchList':
        ComponentToShow = <SearchList setStudentId={setStudentId} setCurrentView={setCurrentView} searchText={searchText} />;
        break;
      case 'ModifyStudent':
        ComponentToShow = <ModifyStudent setCurrentView={setCurrentView} studentData={editStudentData} isEditMode={true} />;
        break;
      default:
        ComponentToShow = <Home setCurrentView={setCurrentView} setStudentId={setStudentId} searchText={searchText} setSearchText={setSearchText} userName={userName} />;
    }
  }

  return (
    <React.StrictMode>
      {ComponentToShow}
    </React.StrictMode>
  );
};

root.render(<App />);