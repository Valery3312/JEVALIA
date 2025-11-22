
// app.js (SOLO CÓDIGO DE BACKEND)

// 1. CREDENCIALES RAILWAY (Configuración de Entorno y DB)
require('dotenv').config(); 
const mysql = require('mysql2');

// 2. Usar las variables cargadas
const pool = mysql.createPool({
    host: process.env.DB_HOST,      
    user: process.env.DB_USER,      
    password: process.env.DB_PASSWORD,  
    database: process.env.DB_DATABASE,  
    port: process.env.DB_PORT           
});

// Ejemplo: Probar la conexión
pool.getConnection((err, connection) => {
    if (err) {
        // Muestra el error si no puede conectar
        console.error('❌ Error al conectar a la base de datos:', err.stack);
        return;
    }
    console.log('✅ Conexión a MySQL (Railway) exitosa con ID:', connection.threadId);
    connection.release(); // Libera la conexión inmediatamente
});

/* -------------------------- 3. CONFIGURACIÓN DE SERVIDOR EXPRESS (¡CRUCIAL! Define 'app') -------------------------------------*/
const express = require('express');
const app = express(); // <-- AHORA 'app' ESTÁ DEFINIDO AQUÍ
const port = process.env.PORT || 3000; 

// Middleware necesario para procesar los datos JSON que vienen del formulario
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// ⚠️ Esta línea es CRUCIAL. Sirve los archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));


/* -------------------------- 4. RUTA PARA GUARDAR LA COTIZACIÓN EN MYSQL -------------------------------------*/
// Esta ruta usa la variable 'app' que fue definida arriba.

app.post('/api/cotizar', (req, res) => {
    // 1. Mapeo de campos del frontend (req.body) a los nombres de la base de datos (solicitudes_viaje)
    const formData = {
        nombre_completo: req.body.nombre,
        correo_electronico: req.body.email,
        telefono: req.body.telefono,
        destino_deseado: req.body.destino,
        fecha_salida: req.body.fechaSalida,
        fecha_retorno: req.body.fechaRetorno,
        adultos: req.body.adultos,
        ninos: req.body.ninos, // Corregido: usaremos 'children' si así lo enviaste en el frontend
        bebes: req.body.bebes, // Corregido: usaremos 'infants' si así lo enviaste en el frontend
        comentarios: req.body.comentarios
    };

    // 2. Consulta SQL usando el nombre de tabla correcto: solicitudes_viaje
    const sql = 'INSERT INTO solicitudes_viaje SET ?'; 

    pool.query(sql, formData, (err, result) => {
        if (err) {
            console.error('❌ Error al insertar en tabla solicitudes_viaje:', err);
            // Envía un error al frontend
            return res.status(500).json({ success: false, message: 'Error en el servidor al guardar cotización.' });
        }
        
        console.log('✅ Solicitud guardada, ID:', result.insertId);
        // Envía una confirmación al frontend
        res.json({ success: true, message: 'Cotización recibida y guardada.' });
    });
});

/* -------------------------- 3. INICIO DEL SERVIDOR -------------------------------------*/
app.listen(port, () => {
    console.log(`🚀 Servidor Express.js corriendo en http://localhost:${port}`);
});
