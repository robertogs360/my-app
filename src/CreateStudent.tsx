import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Definición de la interfaz para las props
interface CreateStudentProps {
  setCurrentView: (view: string) => void;
  editStudentData?: {
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

// Definición de la interfaz para el estado del formulario
interface FormData {
  id: string;
  name: string;
  surname: string;
  dni: string;
  address: string;
  cp: string;
  city: string;
  phone: string;
  email: string;
}

const CreateStudent: React.FC<CreateStudentProps> = ({ setCurrentView, editStudentData, isEditMode }) => {
  const [formData, setFormData] = useState < FormData > ({
    id: '',
    name: '',
    surname: '',
    dni: '',
    address: '',
    cp: '',
    city: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    if (editStudentData) {
      setFormData(editStudentData);
    }
  }, [editStudentData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = isEditMode ? `https://localhost:7297/api/Students/${formData.id}` : 'https://localhost:7297/api/Students';
    const method = isEditMode ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          if (response.status === 204) {
            return {};
          } else {
            return response.json();
          }
        } else {
          throw new Error(isEditMode ? 'Error while modifying student' : 'Error creating new student');
        }
      })
      .then(data => {
        console.log(data);
        alert(isEditMode ? 'Student modified correctly' : 'Student created correctly');
        if (!isEditMode) {
          setFormData({
            id: '',
            name: '',
            surname: '',
            dni: '',
            address: '',
            cp: '',
            city: '',
            phone: '',
            email: ''
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert(isEditMode ? 'Error while modifying student' : 'Error creating new student');
      });
  };
  return (
    <div>
      <div className='student-form-title'>
        <h2>New student</h2>
        <p>Insert new students details: </p>
      </div>
      <Button onClick={() => setCurrentView('Home')} className="home-button">Back to Home</Button>
      <form className="student-form" onSubmit={handleSubmit}>
        <TextField
          id="id"
          label="ID"
          variant="standard"
          name="id"
          value={formData.id}
          onChange={handleChange}
          disabled={isEditMode}
          fullWidth
        />

        <TextField
          id="name"
          label="Name"
          variant="standard"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          id="surname"
          label="Surname"
          variant="standard"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          id="dni"
          label="DNI"
          variant="standard"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          id="address"
          label="Address"
          variant="standard"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          id="cp"
          label="CP"
          variant="standard"
          name="cp"
          value={formData.cp}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          id="city"
          label="City"
          variant="standard"
          name="city"
          value={formData.city}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          id="phone"
          label="Phone"
          variant="standard"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          id="email"
          label="E-mail"
          variant="standard"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />

        <Button variant="outlined" color="success" type="submit" className="submit-button">
          {isEditMode ? 'Modify' : 'Create'}
        </Button>
      </form>
    </div>
  );
};

export default CreateStudent;