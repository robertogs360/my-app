import React from 'react';
import CreateStudent from './CreateStudent';

// Definición de la interfaz para las props
interface ModifyStudentProps {
    setCurrentView: (view: string) => void;
    studentData?: {
        id: string;
        name: string;
        surname: string;
        dni: string;
        address: string;
        cp: string;
        city: string;
        phone: string;
        email: string;
    };
      isEditMode: boolean;
}

const ModifyStudent: React.FC<ModifyStudentProps> = ({ setCurrentView, studentData }) => {
    return (
        <CreateStudent setCurrentView={setCurrentView} editStudentData={studentData} isEditMode={true} />
    );
};

export default ModifyStudent;
