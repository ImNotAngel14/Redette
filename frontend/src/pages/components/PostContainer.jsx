import React from 'react';
import './styles/PostContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostContainer = ({ post, imageURL, imageURL2, like }) => {
    const handleLike = async (event) => {
        const user = parseInt(localStorage.getItem("loggedUser"));
        try
        {
            const response = await fetch('http://localhost:3000/like', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({                         
                    user,
                    post: post.id_publicacion
                })
            });
            const data = await response.json();
            if(data.success)
            {
                console.log("Like status: "+ data.like );
                // Marcar el like correctamente
                // Estado del like es data.like
                // data.like regresa 1 si ya dio like
                // data.like regresa 0 si quito el like
            }
        }
        catch(error)
        {
            console.error('Error al llamar a la API:', error);
        }
    }

    return (
        <div className='PostContainer'>
            <div className='PostWrapper'>
                <div className='row'>
                    <div className='col-1'>
                        {imageURL2 && <img src={imageURL2} className='UserImgPost' alt="Imagen del usuario" />}
                    </div>
                    <div className='col-11'>
                        <div className='PostCommunityUser'>
                            <p className='CommunityP'>{post.comunidad?.nombre || post.community}</p>
                            <span>/</span>
                            <p className='UserP'>{post.usuario?.usuario || post.username}</p>
                        </div>
                    </div>
                </div>
                <div className='PostTitle'>
                    <h3><a href={`/post/${post.id_publicacion}`}>{ post.post_data?.titulo || post.titulo}</a></h3>
                </div>
                <div className='PostContent'>
                    <div className='PostText'>
                        <p>{post.post_data?.texto || post.texto}</p>
                    </div>
                    <div className='PostImage'>
                        {imageURL && <img src={imageURL} className='PostImg' alt="Imagen de la publicación" />}
                    </div>
                    <div className='PostLink'>
                        <span>Link:</span><a href={post.post_data?.link || post.link}>{ post.post_data?.link || post.link}</a>
                    </div>
                </div>
                <hr />
                <div className='Buttons'>
                    <div className="btn-group btn-spacing" role="group" aria-label="Basic example">
                        <button onClick={handleLike} type="button" className="btn"><i className="fa-solid fa-angles-up"></i></button>
                        <button type="button" className="btn" disabled>#</button>
                        <button type="button" className="btn"><i className="fa-solid fa-angles-down"></i></button>
                    </div>
                    <button className="btn-spacing"><a href={`/post/${post.id_publicacion}`}><i className="fa-solid fa-comments"></i> Comentarios</a></button>
                    <button className="btn-spacing"><i className="fa-solid fa-bookmark"></i> Guardar</button>
                </div>
            </div>
        </div>
    );
};

export default PostContainer;
