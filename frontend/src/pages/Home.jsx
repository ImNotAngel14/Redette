import { useState } from 'react';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Home.css'
import NavBar from './components/Navbar'
import SideBar from './components/SideBar'
import PostContainer from './components/PostContainer';
import PostInputContainer from './components/PostInputContainer';
import Modal from 'react-bootstrap/Modal';

const Home = () => {
    const [showInterestsModal, setShowInterestsModal] = useState(true);
    const [selectedInterestError, setSelectedInterestError] = useState(false);
    const [InterestError, setInterestError] = useState(false);
    const handleCloseInterestsModal = () => setShowInterestsModal(false);

    const initialOptions = ['Videojuegos', 'Deportes', 'Series', 'Películas'];
    const [checkboxes, setCheckboxes] = useState(
      initialOptions.reduce((acc, option) => ({ ...acc, [option]: false }), {})
    );
  
    const handleCheckboxChange = (option) => {
      setCheckboxes(prevCheckboxes => ({
        ...prevCheckboxes,
        [option]: !prevCheckboxes[option],
      }));
    };  

    const handleInterestsFormSubmit = async (event) => {
        event.preventDefault();
        const selectedInterests = Object.keys(checkboxes).filter(option => checkboxes[option]);
        const anyInterestSelected = selectedInterests.length > 0;            
        // peticion backend

        if (anyInterestSelected) {
            handleCloseInterestsModal();
            setSelectedInterestError(false);

            try {
                const response = await fetch('http://localhost:3000/interests', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ interests: selectedInterests }),
                });

                const data = await response.json();
                if (data.success) {
                    handleCloseInterestsModal();
                    setInterestError(false);
                } else {
                    console.error('Error en el registro de intereses:', data.message);
                    setInterestError(true);
                }
            } catch (error) {
                console.error('Error al llamar a la API:', error);
                setInterestError(true);
            }
        } else {
            setSelectedInterestError(true);
        }   
        // peticion backend
    };

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

            <Modal show={showInterestsModal} onHide={handleCloseInterestsModal} backdrop="static">
                <form onSubmit={handleInterestsFormSubmit}>
                    <Modal.Header>
                        <Modal.Title>Selecciona tus intereses</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {InterestError && <p style={{ color: 'red' }}>Error al cargar los intereses</p>}
                        <div className='InterestsList'>
                            {initialOptions.map((option, index) => (
                                <div key={index}>
                                    <input
                                        type="checkbox"
                                        id={`interest${index}`}
                                        checked={checkboxes[option]}
                                        onChange={() => handleCheckboxChange(option)}
                                    />
                                    <label htmlFor={`interest${index}`}>
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {selectedInterestError && <p style={{ color: 'red' }}>Por favor, selecciona al menos un interés</p>}
                    </Modal.Body>
                    <Modal.Footer>
                        <input type="submit" className='buttonInterestAccept' value='Aceptar'/>
                    </Modal.Footer>
                </form>
            </Modal>

        </div>

    )


}

export default Home;
