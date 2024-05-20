import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Community.css'
import NavBar from './components/Navbar.jsx'
import CommunityHeader from "./components/CommunityHeader.jsx"
import PostContainer from './components/PostContainer.jsx';
import PostInputContainer from './components/PostInputContainer.jsx';
import SideBarCmt from "./components/SideBarCmt.jsx"

// import UserImage from "./components/img/userimage.jpeg"

const Community = () => {
    const { id } = useParams();  // Obtener el ID del post desde la URL
    const [community, setCommunity] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    useEffect(() => {
        console.log('CommunityHeader montado');
        const fetchCommunity = async () => {
            try {
                const response = await fetch(`http://localhost:3000/community/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (data.success) {
                    // Actualiza el estado con los datos obtenidos
                    setCommunity(data.community_data);
                    console.log('ComunidadHeader cargado');
                    console.log('Datos de la comunidad', data);
                    // Decodificar base64
                    const base64Image = btoa(
                        new Uint8Array(data.community_data.fotoComunidad.data)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    // Generar URL de la imagen
                    const imageURL = `data:image/png;base64,${base64Image}`;
                    setImageURL(imageURL);
                    console.log(imageURL);

                } else {
                    console.error('Error al cargar ComunidadHeader:', data.message);
                }
            } catch (error) {
                console.error('Error al llamar a la API:', error);
            }
        };
        console.log('CommunityHeader desmontado');
        fetchCommunity();
    }, [id]);

    const [postsComm, setPostsComm] = useState([]);
    const [images, setImages] = useState({});

    useEffect(() => {
        console.log('Community Posts montados');
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/community/posts/1`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (data.posts_data && data.posts_data.length > 0) {
                    console.log('Datos de la publicaciones:', data);
                    console.log('Datos de la publicación:', data.posts_data[0].imagen.data);


                    setPostsComm(data.posts_data);

                    const imagePromises = data.posts_data.map(async (post) => {
                        const base64Image = btoa(
                            new Uint8Array(post.imagen.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                        );
                        const imageURL = `data:image/png;base64,${base64Image}`;

                        const base64Image2 = btoa(
                            new Uint8Array(post.imagen.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
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
        fetchPosts();
    }, []);

    return (
        <div>
            <NavBar>
            </NavBar>

            <div className='container-fluid ContentPage'>
                {community && (
                <CommunityHeader community={community} imageURL={imageURL}/>                   
                )}
                <div className='row'>
                    <div className='col-lg-8 col-md-8'>
                        <div className='row'>
                        <PostInputContainer>
                        </PostInputContainer>
                        </div>
                        <div className='row'>
                        {/* <PostContainer>
                        </PostContainer> */}
                        {postsComm.map((post) => (
                            <PostContainer
                                key={post.id_publicacion}
                                post={post}
                                imageURL={images[post.id_publicacion]?.imageURL}
                                imageURL2={images[post.id_publicacion]?.imageURL2}
                            />
                        ))}
                        </div>
                    </div>
                    <div className="col-lg-1  d-lg-block d-none" >
                    {/* Espacio entre las columnas visible solo en pantallas LG o más grandes */}
                    </div>
                    <div className='col-lg-3 col-md-4 order-last'>
                    {community && (
                    <SideBarCmt community={community}/>
                    )}
                    </div>
                </div>
            </div>

        </div>

    )


}

export default Community;