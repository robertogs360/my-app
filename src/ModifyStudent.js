import React from 'react';
import CreateStudent from './CreateStudent'; // Asegúrate de que la ruta sea correcta

const ModifyStudent = ({ setCurrentView, studentData }) => {
    return <CreateStudent setCurrentView={setCurrentView} editStudentData={studentData} isEditMode={true} />;
};

export default ModifyStudent;
