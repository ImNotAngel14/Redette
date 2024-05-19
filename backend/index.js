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

// 
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
      res.json({auth: 1, userId: user[0].id_usuario}); // Devolver el usuario como respuesta al cliente
    }
    
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/register', async (req, res) =>
{
  const { email, username, password, pImage } = req.body;
  console.log ("imagen:"+pImage);
  try
  {
    const user = await prisma.usuario.create
    ({
      data:
      {
        usuario: username,
        contrasena: password,
        correo: email,
        fotoPerfil: pImage
      }
    });
    if(user)
      res.json({success: 1});
    else
      res.status(500).json({success: 0});
  }
  catch (error) 
  {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/community', async (req, res) =>
{
  const { name, description, image, creator} = req.body;
  try
  {
    const community = await prisma.comunidad.create
    ({
      data:
      {
        nombre: name,
        descripcion: description,
        fotoComunidad: image,
        FKUsuario: creator
      }
    });
    if(community)
      res.json({success: 1});
    else
      res.status(500).json({success: 0});
  }
  catch(error)
  {
    console.error('Error al crear comunidad:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/post', async (req, res) =>
{
  const { title, body, image, link, author, community } = req.body;

  try
  {
    const post = await prisma.publicacion.create
    ({
      data:
      {
        titulo: title,
        texto: body,
        imagen: image,
        link: link,
        FKUsuario: author,
        FKComunidad: community
      }
    });
    if(post)
      res.json({success: 1});
    else
      res.status(500).json({success: 0});
  }
  catch(error)
  {
    console.error('Error al crear publicacion:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/member', async (req, res) =>
{
  const { user, community } = req.body;
  try
  {
    const user_validation = await prisma.miembros.findFirst
    ({
      where:
      {
        FKUsuario: user
      }
    });
    if(user_validation)
    {
      res.status(409).json({success: 0, message: "¡Actualmente pertenece a la comunidad seleccionada!."});
    }
    else
    {
      const member = await prisma.miembros.create
      ({
        data:
        {
          FKUsuario: user,
          FKComunidad: community
        }
      });
      if(member)
        res.json({success: 1});
      else
        res.status(500).json({success: 0});
    }
  }
  catch(error)
  {
    console.error('Error al crear publicacion:', error);
    res.status(500).json({error: 'Error interno del servidor'});
  }
});

// Obtiene la informacion del usuario mediante el id
app.get('/user/:id', async (req, res) =>
{
  const userId = parseInt(req.params.id);
  try
  {
    const user = await prisma.usuario.findUnique({
      where: {
        id_usuario: userId
      }
    });
    if(user)
      res.json({success: 1, user_data: user}); 
    else
      res.json({success: 0});
  }
  catch(error)
  {
    console.error('Error al obtener datos de usuario:', error);
    res.status(500).json({error: 'Error interno del servidor'});
  }
});

app.get('/post/:id', async(req,res)=>
{
  const postId = parseInt(req.params.id);
  try
  {
    const post = await prisma.publicacion.findUnique({
      where:
      {
        id_publicacion: postId
      }
    });
    const user = await prisma.usuario.findUnique({
      where:
      {
        id_usuario: post.FKUsuario
      }
    });
    const community = await prisma.comunidad.findUnique({
      where:
      {
        id_comunidad: post.FKComunidad
      }
    });
    if(post)
      res.json(
      {
        success: 1,
        username: user.usuario,
        community: community.nombre,
        post_data: post,
        profileImage: user.fotoPerfil,
      }); 
    else
      res.json({success: 0});
  }
  catch(error)
  {
    res.status(500).json({error: 'Error interno del servidor'});
  }
});

app.get('/community/posts/:id', async(req, res) =>
{
  const communityId = parseInt(req.params.id);
  try
  {
    const posts = await prisma.publicacion.findMany(
      {
        where:
        {
          FKComunidad: communityId
        }
      }
    );
    if(posts.length > 1)
      res.json({success: 1, posts_data: posts}); 
    else
      res.json({success: 0});
  }
  catch(error)
  {
    res.status(500).json({error: 'Error interno del servidor'});
  }
});

app.get('/user/posts/:id', async(req, res) =>
{
  const userId = parseInt(req.params.id);
  try
  {
    const posts = await prisma.publicacion.findMany(
      {
        where:
        {
          FKUsuario: userId
        }
      }
    );
    if(posts.length > 1)
      res.json({success: 1, posts_data: posts}); 
    else
      res.json({success: 0});
  }
  catch(error)
  {
    res.status(500).json({error: 'Error interno del servidor'});
  }
});

app.get('/community/:id', async(req, res) =>
{
  const communityId = parseInt(req.params.id);
  try
  {
    const community = await prisma.comunidad.findUnique
    ({
      where:
      {
        id_comunidad: communityId
      }
    })
    const creator = await prisma.usuario.findUnique
    ({
      where:
      {
        id_usuario: community.FKUsuario
      }
    });
    if(community)
      res.json({
        success: 1, 
        creatorUsername: creator.usuario,
        community_data: community,
        creatorProfileImage: creator.fotoPerfil
      }); 
    else
      res.json({success: 0});
  }
  catch(error)
  {
    res.status(500).json({error: 'Error interno del servidor'});
  }
});

app.delete('/member', async(req, res) =>
{
  const { user, community } = req.body;
  try
  {
    const user_validation = await prisma.miembros.findFirst
    ({
      where:
      {
        FKUsuario: user,
        FKComunidad: community
      }
    });
    if(user_validation)
    {
      const delete_result = await prisma.miembros.delete
      ({
        where:
        {
          id_miembro: user_validation.id_miembro
        }
      });
      if(delete_result)
        res.json({success: 1});
      else
        res.status(500).json({success: 0});
    }
    else
    {
      res.status(409).json({success: 0, message: "¡No puede salir de una comunidad en la que no se encuentra!."});
    }
  }
  catch(error)
  {
    res.status(500).json({error: 'Error interno del servidor', detalles: error});
  }
});

app.get('/community/search/:keyword', async(req, res)=>
{
  console.log("search:");
  const search = req.params.keyword;
  console.log(search);
  try
  {
    console.log("Buscando comunidades...");
    const communitys = await prisma.comunidad.findMany
    ({
      where:
      {
        nombre: {
          contains: search
        }
      }
    });
    console.log("Imprimiendo resultados...");
    if(communitys.length > 1)
    {
      console.log("Correcto!");
      res.json({success: 1, results: communitys}); 
    }
    else
    {
      console.log("No encontrado!");
      res.json({success: 0});
    }
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({error: 'Error interno del servidor', detalles: error});
  }
});