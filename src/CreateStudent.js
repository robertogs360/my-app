import React, { useState, useEffect } from 'react';

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
      <form className="student-form" onSubmit={handleSubmit}>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          readOnly={isEditMode} // Hace que el campo sea de solo lectura en modo edición
        />

        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="surname">Apellidos:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
        />

        <label htmlFor="dni">DNI:</label>
        <input
          type="text"
          id="dni"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
        />

        <label htmlFor="address">Dirección:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <label htmlFor="cp">Código Postal:</label>
        <input
          type="text"
          id="cp"
          name="cp"
          value={formData.cp}
          onChange={handleChange}
        />

        <label htmlFor="city">Ciudad:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />

        <label htmlFor="phone">Teléfono:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit" className="submit-button">
          {isEditMode ? 'Modificar Alumno' : 'Crear Alumno'}
        </button>
      </form>
      <button onClick={() => setCurrentView('Home')} className="home-button">Home</button>
    </div>
  );
};

export default CreateStudent;
