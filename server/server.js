const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2'); // Cliente MySQL

const app = express();
const port = 3000;

// Middleware para analizar JSON
app.use(bodyParser.json());

// Ruta para servir archivos estáticos (CSS, JS)
app.use(express.static(path.join(__dirname, '../')));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Configuración de conexión a la base de datos
const db = mysql.createConnection({
    host: 'usuarios.c7uy2cgwm3aj.us-east-1.rds.amazonaws.com', // Endpoint RDS
    user: 'admin',                                            // Usuario de tu base de datos
    password: 'J1017270052c24*',                                  // Contraseña de tu base de datos
    database: 'test_db'                                       // Nombre de la base de datos
});

// Conexión a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Endpoint para registro
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    const queryCheck = 'SELECT * FROM users WHERE username = ?';
    db.query(queryCheck, [username], (err, results) => {
        if (err) {
            console.error('Error al verificar el usuario:', err);
            return res.status(500).json({ message: 'Error del servidor' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Insertar nuevo usuario
        const queryInsert = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(queryInsert, [username, password], (err) => {
            if (err) {
                console.error('Error al registrar el usuario:', err);
                return res.status(500).json({ message: 'Error del servidor' });
            }

            res.json({ message: 'Registro exitoso' });
        });
    });
});
// Endpoint para login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verificar usuario y contraseña
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error al verificar el usuario:', err);
            return res.status(500).json({ success: false, message: 'Error del servidor' });
        }

        if (results.length === 0) {
            return res.status(400).json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }

        // Si las credenciales son correctas, respondemos con éxito
        res.json({ success: true, message: 'Inicio de sesión exitoso' });
    });
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
