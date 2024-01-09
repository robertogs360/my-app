import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import Home from './Home';
import CreateStudent from './CreateStudent';
import StudentDetails from './StudentDetails';
import SearchList from './SearchList';

import './Styles/index.css';
import './Styles/Home.css';
import './Styles/StudentDetails.css';
import './Styles/SearchList.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const [currentView, setCurrentView] = useState('Home');
  const [studentId, setStudentId] = useState(null);
  const [searchText, setSearchText] = useState(''); // Nuevo estado para searchText

  let ComponentToShow;
  switch (currentView) {
    case 'Home':
      ComponentToShow = <Home setCurrentView={setCurrentView} setStudentId={setStudentId} searchText={searchText} setSearchText={setSearchText} />;
      break;
    case 'CreateStudent':
      ComponentToShow = <CreateStudent setCurrentView={setCurrentView} />;
      break;
    case 'StudentDetails':
      ComponentToShow = <StudentDetails studentId={studentId} setCurrentView={setCurrentView} />;
      break;
    case 'SearchList':
      ComponentToShow = <SearchList setStudentId={setStudentId} setCurrentView={setCurrentView} searchText={searchText} />;
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