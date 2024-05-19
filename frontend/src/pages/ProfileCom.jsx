import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/ProfileCom.css'
import NavBar from './components/Navbar.jsx'
import ProfileHeader from "./components/ProfileHeader.jsx"
// import PostContainer from './components/PostContainer.jsx';
// import PostInputContainer from './components/PostInputContainer.jsx';
import SideBarProfile from "./components/SideBarProfile.jsx"
import CommunityProfile from "./components/CommunityProfile.jsx"


const ProfileCom = () => {
    return (
        <div>
            <NavBar>
            </NavBar>

            <div className='container-fluid ContentPage'>
                <ProfileHeader>                   
                </ProfileHeader>

                <div className='row'>
                    <div className='col-lg-8 col-md-8'>

                        <CommunityProfile>                   
                        </CommunityProfile>
                    </div>
                    <div className="col-lg-1  d-lg-block d-none" >
                    {/* Espacio entre las columnas visible solo en pantallas LG o más grandes */}
                    </div>
                    <div className='col-lg-3 col-md-4 order-last'>

                    <SideBarProfile>
                    </SideBarProfile>

                    </div>
                </div>
            </div>

        </div>

    )


}

export default ProfileCom