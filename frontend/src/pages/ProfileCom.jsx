import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/ProfileCom.css'
import NavBar from './components/Navbar.jsx'
import ProfileHeader from "./components/ProfileHeader.jsx"
// import PostContainer from './components/PostContainer.jsx';
// import PostInputContainer from './components/PostInputContainer.jsx';
import SideBarProfile from "./components/SideBarProfile.jsx"
import CommunityImage from "./components/img/Com.png"


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
                        <div className='row'>
                            <div className='CommunityContainer'>
                                <div className='CommunityWrapper'>
                                    <div className='row'>
                                        <div className='col-9'>
                                            <div className='CommunityHeader'>
                                                <p>Usuario Creador</p> 
                                                <h3>Nombre de la Comunidad</h3> 
                                            </div>
                                        </div>
                                        <div className='col-3 d-flex justify-content-end'>
                                            <img src={CommunityImage} alt='' className='CommunityImg'/>
                                        </div>
                                    </div>
                                    <div className='CommunityDesc'>
                                            <p className='DescLabel'>Descripción:</p>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam veritatis consectetur omnis illum placeat repellendus fuga reiciendis perferendis consequuntur a praesentium, voluptate, velit doloremque ab dolorem in vero qui. Aliquam.</p>
                                    </div>
                                    <div className='CommunityUnionDate'>
                                        <p>Fecha de unión:</p><p className='UnionDate'>01/01/2001</p>
                                    </div>
                                    <hr/>
                                    <div className='Buttons d-flex justify-content-end'>
                                        <button className="btn-spacing"> <i class="fa-solid fa-right-from-bracket"></i> Abandonar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
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