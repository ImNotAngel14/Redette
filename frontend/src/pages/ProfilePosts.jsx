import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/ProfilePosts.css';
import NavBar from './components/Navbar.jsx';
import ProfileHeader from "./components/ProfileHeader.jsx";
import PostContainer from './components/PostContainer.jsx';
import PostInputContainer from './components/PostInputContainer.jsx';
import SideBarProfile from "./components/SideBarProfile.jsx";

const ProfilePosts = () => {
    const [posts, setPosts] = useState([]);
    const [images, setImages] = useState({});
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    // Obtener el ID del usuario desde localStorage
    const userId = parseInt(localStorage.getItem('loggedUser'));

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (data.success && data.user_data) {
                    setUsername(data.user_data.usuario); // Aquí obtienes el nombre del usuario
                    // Obtener y convertir la imagen de perfil a base64
                    if (data.user_data.fotoPerfil) {
                        const base64Image = btoa(
                            new Uint8Array(data.user_data.fotoPerfil.data)
                                .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        );
                        setProfileImage(`data:image/png;base64,${base64Image}`);
                    }
                }
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
            }
        };
        fetchUserData();
    }, [userId]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/posts/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (data.success && data.posts_data.length > 0) {
                    setPosts(data.posts_data);

                    const imagePromises = data.posts_data.map(async (post) => {
                        const base64ProfileImage = post.usuario?.fotoPerfil?.data ? btoa(
                            new Uint8Array(post.usuario.fotoPerfil.data)
                                .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        ) : '';
                        const imageURL2 = `data:image/png;base64,${base64ProfileImage}`;
                    
                        const base64PostImage = post.imagen?.data ? btoa(
                            new Uint8Array(post.imagen.data)
                                .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        ) : '';
                        const imageURL = `data:image/png;base64,${base64PostImage}`;
                    
                        return { id: post.id_publicacion, imageURL2, imageURL };
                    });

                    const imagesData = await Promise.all(imagePromises);
                    const imagesMap = imagesData.reduce((acc, imageData) => {
                        acc[imageData.id] = { imageURL: imageData.imageURL, imageURL2: imageData.imageURL2 };
                        return acc;
                    }, {});
                    setImages(imagesMap);
                } else {
                    setPosts([]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error al llamar a la API:', error);
                setLoading(false);
            }
        };
        fetchPosts();
    }, [userId]);

    return (
        <div>
            <NavBar />
            <div className='container-fluid ContentPage'>
                <ProfileHeader username={username} profileImage={profileImage} />
                <div className='row'>
                    <div className='col-lg-8 col-md-8'>
                        {
                        /*
                        
                        <div className='row'>
                            <PostInputContainer />
                        </div>
                        
                        */
                        }
                        
                        <div className='row'>
                            {loading ? (
                                <p>Cargando publicaciones...</p>
                            ) : posts.length > 0 ? (
                                posts.map((post) => (
                                    <PostContainer
                                        key={post.id_publicacion}
                                        post={post}
                                        imageURL={images[post.id_publicacion]?.imageURL}
                                        imageURL2={images[post.id_publicacion]?.imageURL2}
                                    />
                                ))
                            ) : (
                                <p style={{ marginLeft: '4.5rem', marginBottom: '1rem' }}>No haz hecho publicaciones anteriormente</p>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-1 d-lg-block d-none">
                        {/* Espacio entre las columnas visible solo en pantallas LG o más grandes */}
                    </div>
                    <div className='col-lg-3 col-md-4 order-last'>
                        <SideBarProfile />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePosts;
