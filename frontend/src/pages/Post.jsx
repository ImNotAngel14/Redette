import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Post.css'
import NavBar from './components/Navbar'
import SideBar from './components/SideBar'
import PostContainer from './components/PostContainer';
import CommentInputContainer from './components/CommentInputContainer';
import CommentContainer from './components/CommentContainer';

const Post = () => {
    return (
        <div>
            <NavBar>
            </NavBar>

            <div className='container-fluid ContentPage'>
                <div className='row'>
                    <div className='col-lg-8 col-md-8'>
                        <div className='row'>
                        <PostContainer>
                        </PostContainer>
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