import { useState } from 'react';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Home.css'
import NavBar from './components/Navbar'
import SideBar from './components/SideBar'
import CommunityProfile from "./components/CommunityProfile.jsx"

const SearchCommunity = () => {
    return (
        <div className='h_body'>
            <NavBar>
            </NavBar>

            <div className='container-fluid ContentPage'>
                <div className='row'>
                    <div className='col-lg-8 col-md-8'>
                        <div className='row'>
                        <h3 style={{ marginLeft: '4.5rem', marginBottom: '1rem' }}>Resultados de Comunidades:</h3>
                        </div>
                        <div className='row'>
                        <CommunityProfile>                   
                        </CommunityProfile>
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

export default SearchCommunity;
