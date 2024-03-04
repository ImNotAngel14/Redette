import React from 'react';
import './styles/PostContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserImgPost from "./img/userimage.jpeg"


const PostContainer = () => {
    return (
        <div className='PostContainer'>
            <div className='PostWrapper'>
                <div className='PostTopic'>
                    <p>Tema del Post</p>
                </div>
                <hr/>
                <div className='row'>
                    <div className='col-1'>
                        <img className='UserImgPost' src={UserImgPost} alt=''/>
                    </div>
                    <div className='col-11'>
                        <div className='PostCommunityUser'>
                            <p className='CommunityP'>Comunidad</p> 
                            <span>/</span>
                            <p className='UserP'>Usuario</p>
                        </div>                        
                    </div>
                </div>
                <div className='PostTitle'>
                    <h3>Titulo del Post</h3> 
                </div>
                <div className='PostContent'>
                    <div className='PostText'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam veritatis consectetur omnis illum placeat repellendus fuga reiciendis perferendis consequuntur a praesentium, voluptate, velit doloremque ab dolorem in vero qui. Aliquam.</p>
                    </div>
                </div>
                <hr/>
                <div className='Buttons'>
                    <div className="btn-group btn-spacing" role="group" aria-label="Basic example">
                        <button type="button" className="btn"><i class="fa-solid fa-angles-up"></i></button>
                        <button type="button" className="btn" disabled>#</button>
                        <button type="button" className="btn"><i class="fa-solid fa-angles-down"></i></button>
                    </div>
                    <button className="btn-spacing"> <a><i class="fa-solid fa-comments"></i> Comentarios</a> </button>
                    <button className="btn-spacing"> <i class="fa-solid fa-share"></i> Compartir </button>
                    <button className="btn-spacing"> <i class="fa-solid fa-bookmark"></i> Guardar</button>
                </div>
            </div>
        </div>
    );
};

export default PostContainer;
