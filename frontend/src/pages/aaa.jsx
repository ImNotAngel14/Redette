import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Post.css';
import NavBar from './components/Navbar';
import SideBar from './components/SideBar';
import PostContainer from './components/PostContainer';
import CommentInputContainer from './components/CommentInputContainer';
import CommentContainer from './components/CommentContainer';

const AAA = () => {
    const [post, setPost] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3000/post/1`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (data.success) {
                    // Actualiza el estado con los datos obtenidos
                    setPost(data.post_data);
                    console.log('Publicación cargada');
                    console.log('Datos de la publicación:', data.post_data);
                    // Decodificar base64
                    const base64Image = btoa(
                        new Uint8Array(data.post_data.imagen.data)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    // Generar URL de la imagen
                    const imageURL = `data:image/png;base64,${base64Image}`;
                    setImageURL(imageURL);
                } else {
                    console.error('Error al cargar publicación:', data.message);
                }
            } catch (error) {
                console.error('Error al llamar a la API:', error);
            }
        };

        fetchPost();
    }, []);

    return (
        <div>
            <NavBar />
            {post && (
                <div>
                    <p>Comunidad: {post.FKComunidad}</p>
                    <p>Título: {post.titulo}</p>
                    <p>Cuerpo: {post.texto}</p>
                    <p>Enlace: {post.link}</p>
                    <p>Autor: {post.FKUsuario}</p>
                    {imageURL && <img src={imageURL} alt="Imagen de la publicación" />}
                </div>
            )}
        </div>
    );
};

export default AAA;
