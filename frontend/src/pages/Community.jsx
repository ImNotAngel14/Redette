import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Community.css'
import NavBar from './components/Navbar.jsx'
import CommunityHeader from "./components/CommunityHeader.jsx"
import PostContainer from './components/PostContainer.jsx';
import PostInputContainer from './components/PostInputContainer.jsx';
import SideBarCmt from "./components/SideBarCmt.jsx"
// import UserImage from "./components/img/userimage.jpeg"

const Community = () => {
    return (
        <div>
            <NavBar>
            </NavBar>

            <div className='container-fluid ContentPage'>
                <CommunityHeader>                   
                </CommunityHeader>
                <div className='row'>
                    <div className='col-lg-8 col-md-8'>
                        <div className='row'>
                        <PostInputContainer>
                        </PostInputContainer>
                        </div>
                        <div className='row'>
                        <PostContainer>
                        </PostContainer>
                        </div>
                    </div>
                    <div className="col-lg-1  d-lg-block d-none" >
                    {/* Espacio entre las columnas visible solo en pantallas LG o más grandes */}
                    </div>
                    <div className='col-lg-3 col-md-4 order-last'>

                    <SideBarCmt>
                    </SideBarCmt>

                    </div>
                </div>
            </div>

        </div>

    )


}

export default Community;