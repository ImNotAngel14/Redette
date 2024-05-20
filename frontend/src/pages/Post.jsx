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
    const [comments, setComments] = useState([]);
    const [imageURL, setImageURL] = useState(null);
    const [imageURL2, setImageURL2] = useState(null);
    const [like, setLike] = useState(null);
    const [likeCount, setLikeCount] = useState(null);
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
                    setPost(data.post_data);  // Ajuste para acceder correctamente a los datos del post
                    setLikeCount(data.likeCount);
                    console.log(data.post_data.id_publicacion);
                    console.log("//////////////Data:"+data.post_data);
                    const base64Image = btoa(
                        new Uint8Array(data.post_data.imagen.data)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    const imageURL = `data:image/png;base64,${base64Image}`;
                    setImageURL(imageURL);

                    const base64Image2 = btoa(
                        new Uint8Array(data.post_data.usuario.fotoPerfil.data)  // Ajuste para acceder correctamente a la imagen de perfil
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
        const fetchComment = async () =>{
            try
            {
                const response = await fetch(`http://localhost:3000/comment/${id}`, {  // Usar el ID del post en la URL
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
                });
                const data = await response.json();
                if (data.success)
                {
                    setComments(data.comentarios);
                    console.log("Comentarios cargados con exito.");
                }
            }
            catch(error)
            {
                console.error('Error al llamar a la API:', error);
            }
        };
        fetchComment();
        const fetchLike = async () =>{
            const user = parseInt(localStorage.getItem("loggedUser"));
            try
            {
                const response = await fetch(`http://localhost:3000/like/post_id=${id}&user_id=${user}`, {  // Usar el ID del post en la URL
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
                });
                const data = await response.json();
                if (data.like)
                {
                    // Settear like como 1
                    setLike(data.like);
                    console.log("Like cargado con exito.");
                }
            }
            catch(error)
            {
                console.error('Error al llamar a la API:', error);
            }
        }
        fetchLike();
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
                                <PostContainer post={post} imageURL={imageURL} imageURL2={imageURL2} like={like}/>
                        )}
                        </div>
                        <div className='row'>
                            <div className='CommentHeader'>
                                <h3>Comentarios</h3>
                                <hr/>
                            </div>
                        </div>
                        <div className='row'>
                        <CommentInputContainer
                            id_post={parseInt(id)}
                        />
                        </div>
                        <div className='row'>
                        {comments.map((comment) => (
                            <CommentContainer
                                texto={comment.texto}
                                fecha={comment.fecha}
                                usuario={comment.usuario.usuario}
                                fotoPerfil={btoa(
                                        new Uint8Array(comment.usuario.fotoPerfil.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                                    )
                                }
                            />
                        ))}
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