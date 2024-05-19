import React, { useEffect, useState } from 'react';
import './styles/PostContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserImgPost from "./img/userimage.jpeg"
import PostImg from "./img/userimage.jpeg"


const PostContainer = () => {

    const [post, setPost] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        console.log('PostContainer montado');
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
        console.log('PostContainer desmontado');
        fetchPost();
    }, []);

    return (
        <div className='PostContainer'>
            {post && (
            <div className='PostWrapper'>
                {/* <div className='PostTopic'>
                    <p>Tema del Post</p>
                </div>
                <hr/> */}
                <div className='row'>
                    <div className='col-1'>
                        <img className='UserImgPost' src={UserImgPost} alt=''/>
                    </div>
                    <div className='col-11'>
                        <div className='PostCommunityUser'>
                            <p className='CommunityP'>{post.FKComunidad}</p> 
                            <span>/</span>
                            <p className='UserP'>{post.FKUsuario}</p>
                        </div>                        
                    </div>
                </div>
                <div className='PostTitle'>
                    <h3><a href='/post'>{post.titulo}</a></h3> 
                </div>
                <div className='PostContent'>
                    <div className='PostText'>
                        <p>{post.texto}</p>
                    </div>
                    <div className='PostImage'>
                        {/* <img className='PostImg' src={PostImg} alt=''/> */}
                        {imageURL && <img src={imageURL} className='PostImg' alt="Imagen de la publicación" />}
                    </div>
                    <div className='PostLink'>
                        <span>Link:</span><a href={post.link}>{post.link}</a>
                    </div>
                </div>
                <hr/>
                <div className='Buttons'>
                    <div className="btn-group btn-spacing" role="group" aria-label="Basic example">
                        <button type="button" className="btn"><i className="fa-solid fa-angles-up"></i></button>
                        <button type="button" className="btn" disabled>#</button>
                        <button type="button" className="btn"><i className="fa-solid fa-angles-down"></i></button>
                    </div>
                    <button className="btn-spacing"> <a href='/post'><i className="fa-solid fa-comments"></i> Comentarios</a> </button>
                    {/* <button className="btn-spacing"> <i className="fa-solid fa-share"></i> Compartir </button> */}
                    <button className="btn-spacing"> <i className="fa-solid fa-bookmark"></i> Guardar</button>
                </div>
            </div>
            )}
        </div>
    );
};

export default PostContainer;
