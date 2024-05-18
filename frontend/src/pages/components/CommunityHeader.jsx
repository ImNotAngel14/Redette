import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles/CommunityHeader.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommunityImage from "./img/Com.png"

const CommunityHeader = () => {
    const [showModsModal, setShowModsModal] = useState(false);
    const handleCloseModsModal = () => setShowModsModal(false);
    const handleShowModsModal = () => {setShowModsModal(true);};
  return (
    <div>
        <div className='row CommunityHeader'>
            <div className='col-3'>
                <div className='UserImageContainer d-flex justify-content-center'>
                    <img src={CommunityImage} alt=''/>
                </div>
            </div>
            <div className='col-9 CommunityInfoHeader'>
                <div className='UserInfoContainer'>
                    <h1>Comunidad</h1>  
                </div>
                <div className='CommunityUsersNumber'>
                    <h4>Cantidad de miembros:</h4><h4 className='UsersNumber'>#</h4>
                </div>
            </div>
            <div className='btnModsWrapper'>
                <button onClick={handleShowModsModal} className='btnMods'>Ver moderadores</button>
            </div>
        </div>      
        <Modal show={showModsModal} onHide={handleCloseModsModal}>
            <Modal.Header closeButton>
                <Modal.Title>Creador y Moderadores</Modal.Title>
            </Modal.Header>
            <Modal.Body className='ModsModalBody'>
                <div className='CreatorCommInfo'>
                    <h5>Creador de la Comunidad:</h5>
                    <span>Usuario</span>
                </div>
                <div className='ModsCommInfo'>
                    <h5>Moderadores de la Comunidad:</h5>
                    <ul>
                        <li>Usuario 1</li>
                        <li>Usuario 2</li>
                        <li>Usuario 3</li>
                    </ul>
                </div>
            </Modal.Body>

        </Modal>  
    </div>
    
  );
}

export default CommunityHeader;