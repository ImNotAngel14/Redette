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
    // Si las credenciales no son validas regresa auth = 0
    if(user.length === 0){
      console.log("No encontrado.")
      res.json({ auth: 0  });
    }
    else
    {
      // Devolver el usuario como respuesta al cliente
      res.json({auth: 1, userId: user[0].id_usuario}); 
    }
    
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Metodo para el registro de usuarios en la plataforma
app.post('/register', async (req, res) =>
{
  // Parametros del request body que usaremos para el registro del usuario
  const { email, username, password, pImage } = req.body;
  try
  {
    // Usando prisma generamos el usuario
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

// Metodo para creacion de comunidades
app.post('/community', async (req, res) =>
{
  // Parametros requisito para la creacion de una comunidad
  const { name, description, image, creator} = req.body;
  try
  {
    // Creacion de la comunidad con prisma
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
    {
      const member = await prisma.miembros.create
      ({
        data:
        {
          FKUsuario: creator,
          FKComunidad: community.id_comunidad
        }
      });
      if(member)
      {
        res.json({success: 1});
      }
      else
      {
        res.status(500).json({success: 0});
      }
    }
    else
      res.status(500).json({success: 0});
  }
  catch(error)
  {
    console.error('Error al crear comunidad:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Metodo para la creacion de publicaciones.
app.post('/post', async (req, res) =>
{
  // Parametros para la creacion de un publicacion.
  // title: titulo del publicacion.
  // body: cuerpo o texto de la publicacion.
  // image: imagen de la publicacion, si este tiene una.
  // link: link del post, si este tiene uno.
  // author: usuario que crea la publicacion.
  // community: comunidad en la que se generara el post.
  const { title, body, image, link, author, community } = req.body;
  try
  {
    // Creacion del post con prisma
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

// Metodo para agregar un usuario a una comunidad
app.post('/member', async (req, res) =>
{
  // Parametros requeridos
  // user: usuario a ingresar a la comunidad
  // community: comunidad destino
  const { user, community } = req.body;
  try
  {
    // Validamos que el usuario no se encuentre registrado en la comunidad
    // Un usuario no puede unirse dos veces a una comunidad de la que ya es parte.
    const user_validation = await prisma.miembros.findFirst
    ({
      where:
      {
        FKUsuario: user,
        AND:
        {
          FKComunidad: community
        }
        
      }
    });
    if(user_validation)
    {
      // El usuario esta en la comunidad, por lo que no puede unirse de nuevo.
      res.status(409).json({success: 0, message: "¡Actualmente pertenece a la comunidad seleccionada!."});
    }
    else
    {
      // El usuario no esta en la comunidad. Puede ingresar.
      // Se genera el registro del usuario dentro de la comunidad.
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
    res.status(500).json({error: 'Error interno del servidor', detalles: error});
  }
});

// Obtiene la informacion del usuario mediante el id
app.get('/user/:id', async (req, res) =>
{
  // Convertimos el id de usuario tomado del URL a Integer para el uso del API.
  const userId = parseInt(req.params.id);
  try
  {
    // Buscamos el unico registro de usuario con el id.
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
    res.status(500).json({error: 'Error interno del servidor', detalles: error});
  }
});

// Metodo para la obtencion de los datos de una publicacion
app.get('/post/:id', async(req,res)=>
{
  // Obtenemos el id de la publicacion del URL y convertimos a Integer.
  const postId = parseInt(req.params.id);
  try
  {
    // Obtenemos los datos generales de la publicacion.
    const post = await prisma.publicacion.findUnique({
      where:
      {
        id_publicacion: postId
      },
      include:
      {
        usuario: true,
        comunidad: true
      }
    });
    const likeCount = await prisma.likes.count({
      where: 
      {
        FKPublicacion: postId
      }
    });
    post.likeCount = likeCount;
    if(post)
      // Regresamos los datos importantes de los querys previos.
      res.json(
      {
        success: 1,
        likeCount: likeCount,
        post_data: post
      }); 
    else
      res.json({success: 0});
  }
  catch(error)
  {
    res.status(500).json({error: 'Error interno del servidor', detalles: error});
  }
});

// Metodo para la obtencion de publicaciones de una comunidad concreta.
app.get('/community/posts/:id', async(req, res) =>
{
  // Obtenemos y convertimos el parametro del id_comunidad a Integer.
  const communityId = parseInt(req.params.id);
  try
  {
    const posts = await prisma.publicacion.findMany(
      {
        where:
        {
          FKComunidad: communityId
        },
        include: 
        {
          comunidad: true,
          usuario: true
        }
      }
    );
    for(let i = 0; i < posts.length; i++)
    {
      const likeCount = await prisma.likes.count({
        where: 
        {
          FKPublicacion: posts[i].id_publicacion
        }
      });
      posts[i].likeCount = likeCount;
    }
    if(posts.length > 0)
      res.json({success: 1, posts_data: posts}); 
    else
      res.json({success: 0});
  }
  catch(error)
  {
    res.status(500).json({error: 'Error interno del servidor', detalles: error});
  }
});

// Metodo para la obtencion de publicaciones realizadas por un usuario.
app.get('/user/posts/:id', async(req, res) =>
{
  // Obtenemos y convertimos de la URL el id_usuario.
  const userId = parseInt(req.params.id);
  try
  {
    // Recuperamos las publicaciones realizadas por el usuario.
    const posts = await prisma.publicacion.findMany(
      {
        where:
        {
          FKUsuario: userId
        },
        include: 
        {
          comunidad: true,
          usuario: true
        }
      }
    );
    for(let i = 0; i < posts.length; i++)
      {
        const likeCount = await prisma.likes.count({
          where: 
          {
            FKPublicacion: posts[i].id_publicacion
          }
        });
        posts[i].likeCount = likeCount;
      }
    if(posts.length > 0)
      res.json({success: 1, posts_data: posts}); 
    else
      res.json({success: 0});
  }
  catch(error)
  {
    res.status(500).json({error: 'Error interno del servidor', detalles: error});
  }
});

// Metodo para la obtencion de la informacion de una comunidad.
app.get('/community/:id', async(req, res) =>
{
  // Obtenemos y convertimos del URL el id_comunidad.
  const communityId = parseInt(req.params.id);
  try
  {
    // Obtenemos los datos de la comunidad.
    const community = await prisma.comunidad.findUnique
    ({
      where:
      {
        id_comunidad: communityId
      }
    });
    const membersCount = await prisma.miembros.count
    ({
      where:
      {
        FKComunidad: communityId
      }
    });
    // Obtenemos la informacion e imagen de usuario del creador de la comunidad.
    const creator = await prisma.usuario.findUnique
    ({
      where:
      {
        id_usuario: community.FKUsuario
      }
    });
    // Si la comunidad fue encontrada regresamos los datos referentes a la comunidad.
    if(community)
      res.json({
        success: 1, 
        creatorUsername: creator.usuario,
        community_data: community,
        members: membersCount,
        creatorProfileImage: creator.fotoPerfil,
      }); 
    else
      res.json({success: 0});
  }
  catch(error)
  {
    res.status(500).json({error: 'Error interno del servidor', detalles: error});
  }
});

// Metodo para eliminar a un miembro de una comunidad.
app.delete('/member', async(req, res) =>
{
  // Parametros del usuario y la comunidad.
  // user: usuario a eliminar de la comunidad.
  // community: comunidad de la que se eliminara al usuario.
  const { user, community } = req.body;
  try
  {
    // Validamos la existencia del usuario como miembro de la comunidad.
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
      // Si el usuario pertenece a la comunidad procede la eliminacion
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
      // De lo contrario, si el usuario no pertenece a la comunidad,
      // se notifica que no se encuentra dentro de la comunidad.
      res.status(409).json({success: 0, message: "¡No puede salir de una comunidad en la que no se encuentra!."});
    }
  }
  catch(error)
  {
    res.status(500).json({error: 'Error interno del servidor', detalles: error});
  }
});

// Metodo para la busqueda de comunidades.
app.get('/community/search/:keyword', async(req, res)=>
{
  console.log("search:");
  // Obtenemos del URL el la palabra clave a buscar entre los resultados de comunidades.
  const search = req.params.keyword;
  console.log(search);
  try
  {
    // Realiza la busqueda de las comunidades que contengan la palabra clave.
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
    if(communitys.length > 0)
    {
      // En caso de encontrarse comunidades, regresamos la lista de comunidades coincidentes.
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

// Metodo para la baja de publicaciones.
app.delete('/post', async(req, res)=>
{
  const { author, post } = req.body;
  try
  {
    // Valida existencia del usuario
    let user = await prisma.usuario.findUniqueOrThrow({
      where:
      {
        id_usuario: author
      }
    });
    // Borra el post mediante su id
    const post = await prisma.publicacion.delete
    ({
      where:
      {
        id_publicacion: post
      }
    });
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({error: 'Error interno del servidor', detalles: error});
  }
});

// Metodo para obtener las publicaciones que se mostraran en la pagina principal del usuario.
app.get('/home/:id', async(req, res)=>
{
  // Obtenemos los parametros del usuario para obtener las publicaciones que deben ser relevantes para el.
  const user = parseInt(req.params.id);
  try
  {
    // Obtenemos las publicaciones de las comunidades a las que pertenece el usuario.
    const communitys = await prisma.publicacion.findMany
    ({
      where: {
        comunidad: {
          miembros: {
            some: {
              FKUsuario: user
            }
          }
        }
      },
      include: {
        comunidad: true,
        usuario: true,
      },
    });
    for(let i = 0; i < communitys.length; i++)
    {
      const likeCount = await prisma.likes.count({
        where: 
        {
          FKPublicacion: communitys[i].id_publicacion
        }
      });
      communitys[i].likeCount = likeCount;
    }
    if(communitys.length > 0)
    {
      res.json({Resultados: communitys});
    }
    else
    {
      // No se encontraron posts relacionados al usuario.
      res.json({Resultados: communitys, message: "No se encontraron coincidencias."});
    }
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({error: 'Error interno del servidor', detalles: error});
  }
});

app.get('/member/:id', async(req, res)=>
{
  const id_member = parseInt(req.params.id);
  try
  {
    const communitys = await prisma.miembros.findMany
    ({
      where:
      {
        FKUsuario: id_member
      },
      include: {
        comunidad: true,
        usuario: true,
      },
    });
    if(communitys.length > 0)
      res.json({success: 1, userCommunityList: communitys});
    else
      res.json({success: 0});
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({error: 'Error interno del servidor', detalles: error});
  }
});

//Guarda el like del usuario
app.post('/like', async (req, res)=>
{
  const { user_id, post_id } = req.body;
  console.log("user_id:"+user_id);
  console.log("post_id:"+post_id);
  try
  {
    const like_validation = await prisma.likes.findFirst
    ({
      where:
      {
        FKUsuario: user_id,
        FKPublicacion: post_id
      }
    });
    if(like_validation)
    {
      const like = await prisma.likes.delete
      ({
        where:
        {
          id_like: like_validation.id_like
        }
      });
      if(like)
        res.json({success: 1, like: 0});
      else
        res.status(500).json({success: 0, message: "Ocurrio un error al efectuar esta accion."});
    }
    else
    {
      const like = await prisma.likes.create
      ({
        data:
        {
          FKUsuario: user_id,
          FKPublicacion: post_id
        }
      });
      if(like)
        res.json({success: 1, like: 1});
      else
        res.status(500).json({success: 0, message: "Ocurrio un error al efectuar esta accion."});
    }
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({error: 'Error interno del servidor', detalles: error});
  }
});

app.post('/comment', async (req, res)=>
  {
    const { text, user, post } = req.body;
    console.log("text:"+text);
    console.log("user:"+user);
    console.log("post:"+post);
    try
    {
      const comment = await prisma.comentarios.create
      ({
        data:
        {
          texto: text,
          FKUsuario: user,
          FKPublicacion: post
        }
      });
      
      if(comment)
        res.json({success: 1});
      else
        res.json({success: 0});
    }
    catch(error)
    {
      console.log(error);
      res.status(500).json({error: 'Error interno del servidor', detalles: error});
    }
  });

  // Obtener comentarios publicacion
  app.get('/comment/:id', async (req, res)=>
  {
    // Obtenemos del URL el ID de la publicacion.
    const post_id = parseInt(req.params.id);
    console.log("Buscando comentarios post: "+ post_id);
    try
    {
      const comments = await prisma.comentarios.findMany
      ({
        where:
        {
          FKPublicacion: post_id
        },
        include:
        {
          usuario: true
        }
      });
      if(comments.length > 0)
        res.json({success: 1, comentarios: comments});
      else
        res.json({success: 0});
    }
    catch(error)
    {
      console.log(error);
      res.status(500).json({error: 'Error interno del servidor', detalles: error});
    }
  });

  app.get('/like/post_id=:postId&user_id=:userId', async(req,res)=>
  {
    const user = parseInt(req.params.userId);
    const post = parseInt(req.params.postId);
    try
    {
      const like_validation = await prisma.likes.findFirst
      ({
        where:
        {
          FKUsuario: user,
          FKPublicacion: post
        }
      });
      if(like_validation)
        res.json({like: 1});
      else
        res.json({like: 0});
    }
    catch(error)
    {
      console.log(error);
      res.status(500).json({error: 'Error interno del servidor', detalles: error});
    }
  });

