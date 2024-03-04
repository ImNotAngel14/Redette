const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Activamos las dependencias necesarias para el proyecto.
app.use(cors());
app.use(express.json());

// Indicamos escuchar a la API escuchar el puerto indicado.
app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});

// Ruta para el inicio de sesión.
app.post('/login', (req, res) => 
{
  
  // Obtener los datos de inicio de sesión del cuerpo de la solicitud.
  const { username, password } = req.body;
  
  //Creamos la conexion a mysql.
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Redette'
  });

  // Llamamos al procedure de autenticacion del login.
  try {
    connection.connect();
    connection.query('CALL Redette.sp_authLogin("'+username+'", "'+password+'");', (error, results, fields) => {
      if (error)
      {
        console.error('Error al ejecutar la consulta:', error);
        res.json({ auth: 0 });
      }
      else
      {

        // Respondemos el resultado de la autenticación del usuario.
        res.json({ auth: results[0][0].found_user });
      }
    });
    
  } catch (error) {

    // Imprimimos en consola el error capturado y respondemos al front end.
    console.error('Error al conectar a la base de datos:', error);

    res.json({ auth: 0 });

    // Aqui deberia enviar la respuesta como un codigo http.
    // ...
  }
  finally
  {

    // Finalizamos conexión a la base de datos.
    connection.end();
  }
});