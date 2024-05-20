import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Home.css';
import NavBar from './components/Navbar';
import SideBar from './components/SideBar';
import PostContainer from './components/PostContainer';
import PostInputContainer from './components/PostInputContainer';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [images, setImages] = useState({});

    useEffect(() => {
        var value = localStorage.getItem('loggedUser');
        if(!value)
            window.location.replace("/login");
        console.log('Usuario ID: '+ value);
        console.log('Home montado');

        const fetchPosts = async (userId) => {
            try {
                const response = await fetch(`http://localhost:3000/home/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (data.Resultados && data.Resultados.length > 0) {
                    console.log('Datos de la publicación:', data);
                    console.log('Datos de la imagen:', data.Resultados[0].imagen.data);

                    setPosts(data.Resultados);

                    const imagePromises = data.Resultados.map(async (post) => {
                        const base64Image = btoa(
                            new Uint8Array(post.imagen.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                        );
                        const imageURL = `data:image/png;base64,${base64Image}`;

                        const base64Image2 = btoa(
                            new Uint8Array(post.usuario.fotoPerfil.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                        );
                        const imageURL2 = `data:image/png;base64,${base64Image2}`;

                        return { id: post.id_publicacion, imageURL, imageURL2 };
                    });

                    const imagesData = await Promise.all(imagePromises);
                    const imagesMap = imagesData.reduce((acc, imageData) => {
                        acc[imageData.id] = { imageURL: imageData.imageURL, imageURL2: imageData.imageURL2 };
                        return acc;
                    }, {});
                    setImages(imagesMap);
                } else {
                    console.error('Error al cargar publicaciones:', data.message);
                    console.log('Datos de la publicación:', data);
                }
            } catch (error) {
                console.error('Error al llamar a la API:', error);
            }
        };
        const userId = localStorage.getItem('loggedUser');
        console.log('Usuario ID:', userId);
        console.log('Community montado');

        if (userId) {
            fetchPosts(userId);
            console.log('Home del Usuario con ID '+userId);
        } else {
            console.error('No hay usuario ID en localStorage');
        }
        // fetchPosts();
    }, []);

    return (
        <div className='h_body'>
            <NavBar />
            <div className='container-fluid ContentPage'>
                <div className='row'>
                    <div className='col-lg-8 col-md-8'>
                        <div className='row'>
                            <PostInputContainer />
                        </div>
                        <div className='row'>
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <PostContainer
                                        key={post.id_publicacion}
                                        post={post}
                                        imageURL={images[post.id_publicacion]?.imageURL}
                                        imageURL2={images[post.id_publicacion]?.imageURL2}
                                    />
                                ))
                            ) : (
                                <p style={{ marginLeft: '4.5rem', marginBottom: '1rem' }}>No han publicado en tus comunidades</p>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-1 d-lg-block d-none" />
                    <div className='col-lg-3 col-md-4 order-last'>
                        <SideBar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
