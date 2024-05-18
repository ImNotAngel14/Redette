const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express();
const port = 3000;

// Activamos las dependencias necesarias para el proyecto.
app.use(cors());
app.use(express.json());

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Desconectado de la base de datos.');
  process.exit();
});

// Indicamos escuchar a la API escuchar el puerto indicado.
app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});

app.post('/login', async (req, res) => {
  // Obtener los datos de inicio de sesión del cuerpo de la solicitud.
  const { username, password } = req.body;
  try {
    // Buscar el usuario por nombre de usuario
    const user = await prisma.usuario.findMany({
      where: {
        usuario: username,
        contrasena: password
      }
    });
    if(user.length === 0){
      console.log("No encontrado.")
      res.json({ auth: 0  });
    }
    else{
      console.log("UserID: " + user[0].id_usuario); // Imprimir el usuario encontrado en la consola
      res.json({auth: 1, userId: user[0].id_usuario}); // Devolver el usuario como respuesta al cliente
    }
    
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.post('/register', async (req, res) =>
{
  const { email, username, password, profileImage } = req.body;
  try
  {
    const user = await prisma.usuario.create
    ({
      data:
      {
        usuario: username,
        contrasena: password,
        correo: email,
        fotoPerfil: profileImage
      }
    });
    if(user)
      res.json({success: 1});
    else
      res.status(500).json({success: 0});
  }
  catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
})
/*
  
*/