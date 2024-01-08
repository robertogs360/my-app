import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import CreateStudent from './CreateStudent';
import StudentDetails from './StudentDetails';
import SearchList from './SearchList';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const [currentView, setCurrentView] = useState('Home');
  const [studentId, setStudentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  let ComponentToShow;
  switch (currentView) {
    case 'Home':
      ComponentToShow = <Home setCurrentView={setCurrentView} setStudentId={setStudentId} setSearchTerm={setSearchTerm} />;
      break;
    case 'CreateStudent':
      ComponentToShow = <CreateStudent setCurrentView={setCurrentView} />;
      break;
    case 'StudentDetails':
      ComponentToShow = <StudentDetails studentId={studentId} setCurrentView={setCurrentView} />;
      break;
    case 'SearchList':
      ComponentToShow = <SearchList searchTerm={searchTerm} setCurrentView={setCurrentView} />;
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
