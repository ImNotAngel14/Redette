import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Post.css'
import { useParams } from 'react-router-dom';
import NavBar from './components/Navbar'
import SideBar from './components/SideBar'
import PostContainer from './components/PostContainer';
import CommentInputContainer from './components/CommentInputContainer';
import CommentContainer from './components/CommentContainer';



const Post = () => {

    const { id } = useParams();  // Obtener el ID del post desde la URL
    const [post, setPost] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [imageURL2, setImageURL2] = useState(null);


    useEffect(() => {
        console.log('PostContainer montado');
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3000/post/${id}`, {  // Usar el ID del post en la URL
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (data.success) {
                    setPost(data);  // Ajuste para acceder correctamente a los datos del post
                    console.log('Publicación cargada');
                    console.log('Datos de la publicación:', data);

                    const base64Image = btoa(
                        new Uint8Array(data.post_data.imagen.data)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    const imageURL = `data:image/png;base64,${base64Image}`;
                    setImageURL(imageURL);

                    const base64Image2 = btoa(
                        new Uint8Array(data.profileImage.data)  // Ajuste para acceder correctamente a la imagen de perfil
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    const imageURL2 = `data:image/png;base64,${base64Image2}`;
                    setImageURL2(imageURL2);
                } else {
                    console.error('Error al cargar publicación:', data.message);
                }
            } catch (error) {
                console.error('Error al llamar a la API:', error);
            }
        };
        fetchPost();
    }, [id]);  // Agregar id como dependencia para que se ejecute el useEffect cuando cambie


    return (
        <div>
            <NavBar>
            </NavBar>

            <div className='container-fluid ContentPage'>
                <div className='row'>
                    <div className='col-lg-8 col-md-8'>
                        <div className='row'>
                        {post && (
                                <PostContainer post={post} imageURL={imageURL} imageURL2={imageURL2} />
                        )}
                        </div>
                        <div className='row'>
                            <div className='CommentHeader'>
                                <h3>Comentarios</h3>
                                <hr/>
                            </div>
                        </div>
                        <div className='row'>
                        <CommentInputContainer>
                        </CommentInputContainer>
                        </div>
                        <div className='row'>
                        <CommentContainer>
                        </CommentContainer>
                        </div>
                    </div>
                    <div className="col-lg-1  d-lg-block d-none" >
                    {/* Espacio entre las columnas visible solo en pantallas LG o más grandes */}
                    </div>
                    <div className='col-lg-3 col-md-4 order-last'>

                    <SideBar>
                    </SideBar>

                    </div>
                </div>
            </div>

        </div>
    )


}

export default Post