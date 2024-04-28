import React from 'react';
import './styles/CommentContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserImgComment from "./img/userimage.jpeg"

const CommentContainer = () => {
    return (
        <div className='CommentContainer'>
            <div className='CommentWrapper'>

                <div className='row'>
                    <div className='col-1'>
                        <img className='UserImgComment' src={UserImgComment} alt=''/>
                    </div>
                    <div className='col-11'>
                        <div className='CommentCommunityUser'>
                            <strong className='UserP'>Usuario</strong>
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
                            <button className="btn-spacing"> <a><i class="fa-solid fa-comments"></i> Responder</a> </button>
                            <button className="btn-spacing"> <i class="fa-solid fa-share"></i> Compartir </button>
                            <button className="btn-spacing"> <i class="fa-solid fa-bookmark"></i> Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentContainer;
