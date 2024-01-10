import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CreateStudent = ({ setCurrentView, editStudentData, isEditMode }) => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
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
          if (response.status === 204) { // Suponiendo que el servidor devuelve un 204 para una respuesta sin contenido
            return {}; // Devuelve un objeto vacío para manejar correctamente la respuesta
          } else {
            return response.json();
          }
        } else {
          throw new Error(isEditMode ? 'Error al modificar el alumno' : 'Error al crear el alumno');
        }
      })
      .then(data => {
        console.log(data);
        alert(isEditMode ? 'Alumno modificado satisfactoriamente' : 'Alumno creado satisfactoriamente');
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
        alert(isEditMode ? 'Error al modificar el alumno' : 'Error al crear el alumno');
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
          label="Nombre"
          variant="standard"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          id="surname"
          label="Apellidos"
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
          label="Dirección"
          variant="standard"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          id="cp"
          label="Código Postal"
          variant="standard"
          name="cp"
          value={formData.cp}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          id="city"
          label="Ciudad"
          variant="standard"
          name="city"
          value={formData.city}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          id="phone"
          label="Teléfono"
          variant="standard"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          id="email"
          label="Correo Electrónico"
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