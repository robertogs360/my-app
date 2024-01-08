import React, { useState } from 'react';

const CreateStudent = ({ setCurrentView }) => {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    fetch('https://localhost:7297/api/Students', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error en la creación del alumno');
      }
    })
    .then(data => {
      console.log(data);
      alert('Alumno creado satisfactoriamente');
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
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al crear el alumno');
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

    <button type="submit" className="create-button">Crear Alumno</button>
  </form>
  <button onClick={() => setCurrentView('Home')} className="home-button">Home</button>
</div>
  
);

};

export default CreateStudent;
