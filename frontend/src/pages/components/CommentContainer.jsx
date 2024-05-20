import React from 'react';
import './styles/CommentContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserImgComment from "./img/userimage.jpeg"

const CommentContainer = ({ texto, fecha, usuario, fotoPerfil}) => {
    return (
        <div className='CommentContainer'>
            <div className='CommentWrapper'>

                <div className='row'>
                    <div className='col-1'>
                        <img className='UserImgComment' src={"data:image/png;base64,"+fotoPerfil} alt=''/>
                    </div>
                    <div className='col-11'>
                        <div className='CommentCommunityUser'>
                            <strong className='UserP'>{usuario}</strong>
                        </div>
                        <div className='PostContent'>
                            <div className='PostText'>
                                <p>{texto}</p>
                            </div>
                        </div>
                        <div className='PostContent'>
                            <div className='PostText'>
                                <p>{fecha}</p>
                            </div>
                        </div>
                        <hr/>
                        {
                        /*
                            <div className='Buttons'>
                                <div className="btn-group btn-spacing" role="group" aria-label="Basic example">
                                    <button type="button" className="btn"><i className="fa-solid fa-angles-up"></i></button>
                                    <button type="button" className="btn" disabled>#</button>
                                    <button type="button" className="btn"><i className="fa-solid fa-angles-down"></i></button>
                                </div>
                                { <button className="btn-spacing"> <a><i class="fa-solid fa-comments"></i> Responder</a> </button> }
                            </div>
                        */
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentContainer;
