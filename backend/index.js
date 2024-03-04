const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'PrograWeb2'
  });

// Middleware para habilitar CORS
app.use(cors());

app.use(express.json());

app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});

// Ruta para el inicio de sesión
app.post('/login', (req, res) => 
{
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'PrograWeb2'
  });
  // Obtener los datos de inicio de sesión del cuerpo de la solicitud
  const { username, password } = req.body;
  try {
    connection.connect();
    connection.query('CALL PrograWeb2.sp_authLogin("'+username+'", "'+password+'");', (error, results, fields) => {
      if (error)
      {
        console.error('Error al ejecutar la consulta:', error);
        throw error;
      }
      else
      {
        res.json({ auth: results[0][0].found_user });
      }
    });
    
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    res.json({ auth: 0 });//false
  }
  finally
  {
    connection.end();
  }
  
});