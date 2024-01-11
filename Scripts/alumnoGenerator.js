const axios = require('axios');
const https = require('https');

const url = 'https://localhost:7297/api/Students';

// Función para generar un alumno aleatorio
function generarAlumno(id) {
    return {
        id: id,
        dni: String(Math.floor(10000000 + Math.random() * 90000000)),
        name: `Nombre${id}`,
        surname: `Apellido${id}`,
        address: `Direccion${id}`,
        cp: String(Math.floor(1000 + Math.random() * 9000)),
        city: `Ciudad${id}`,
        phone: String(Math.floor(600000000 + Math.random() * 99999999)),
        email: `email${id}@ejemplo.com`
    };
}

// Enviar 100 solicitudes POST
async function crearAlumnos() {
    for (let i = 1; i <= 250; i++) {
        let alumno = generarAlumno(i);
        try {
            const response = await axios.post(url, alumno, {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                },
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });
            console.log(`Alumno ${i} creado con éxito:`, response.data);
        } catch (error) {
            console.error(`Error al crear el alumno ${i}:`, error.response?.data || error.message);
        }
    }
}

crearAlumnos();
