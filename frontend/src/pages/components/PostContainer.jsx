import React, { useState, useEffect } from 'react';
import './styles/PostContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostContainer = ({ post, imageURL, imageURL2 }) => {
    const [likeCount, setLikeCount] = useState(post.likeCount);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const user = parseInt(localStorage.getItem("loggedUser"));
        const checkLikeStatus = async () => {
            try {
                const response = await fetch(`http://localhost:3000/like/post_id=${post.id_publicacion}&user_id=${user}`);
                const data = await response.json();
                if (data.like === 1) {
                    setLiked(true);
                }
            } catch (error) {
                console.error('Error checking like status:', error);
            }
        };
        checkLikeStatus();
    }, [post.id_publicacion]);

    const handleLike = async () => {
        const user = parseInt(localStorage.getItem("loggedUser"));
        try {
            const response = await fetch('http://localhost:3000/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user,
                    post_id: post.id_publicacion
                })
            });
            const data = await response.json();
            if (data.success) {
                if (data.like) {
                    setLikeCount(likeCount + 1);
                    setLiked(true);
                } else {
                    setLikeCount(likeCount - 1);
                    setLiked(false);
                }
            }
        } catch (error) {
            console.error('Error al llamar a la API:', error);
        }
    };

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
                    <h3><a href={`/post/${post.id_publicacion}`}>{post.post_data?.titulo || post.titulo}</a></h3>
                </div>
                <div className='PostContent'>
                    <div className='PostText'>
                        <p>{post.post_data?.texto || post.texto}</p>
                    </div>
                    <div className='PostImage'>
                        {imageURL && <img src={imageURL} className='PostImg' alt="Imagen de la publicación" />}
                    </div>
                    <div className='PostLink'>
                        <span>Link:</span><a href={post.post_data?.link || post.link}>{post.post_data?.link || post.link}</a>
                    </div>
                </div>
                <hr />
                <div className='Buttons'>
                    <div className="btn-group btn-spacing" role="group" aria-label="Basic example">
                        <button onClick={handleLike} type="button" className="btn likecount">
                            <i className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                        </button>
                        <button type="button" className="btn" disabled id="btn_likeCount">{likeCount}</button>
                    </div>
                    <button className="btn-spacing"><a href={`/post/${post.id_publicacion}`}><i className="fa-solid fa-comments"></i> Comentarios</a></button>
                </div>
            </div>
        </div>
    );
};

export default PostContainer;
