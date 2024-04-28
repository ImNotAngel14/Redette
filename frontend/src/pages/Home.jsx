import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Home.css'
import NavBar from './components/Navbar'
import SideBar from './components/SideBar'
import PostContainer from './components/PostContainer';
import PostInputContainer from './components/PostInputContainer';


const Home = () => {
    return (
        <div className='h_body'>
            <NavBar>
            </NavBar>

            <div className='container-fluid ContentPage'>
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

                    <SideBar>
                    </SideBar>

                    </div>
                </div>
            </div>

        </div>

    )


}

export default Home