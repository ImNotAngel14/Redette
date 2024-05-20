import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles/CommunityHeader.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommunityImage from "./img/Com.png"

const CommunityHeader = ({ community, imageURL}) => {
    const [showModsModal, setShowModsModal] = useState(false);
    const handleCloseModsModal = () => setShowModsModal(false);
    const handleShowModsModal = () => {setShowModsModal(true);};
    
  return (
    <div>
        {/* {community && ( */}
        <div className='row CommunityHeader'>
            <div className='col-3'>
                <div className='UserImageContainer d-flex justify-content-center'>
                    {imageURL && <img src={imageURL}  alt="Imagen de la comunidad" />}
                    {/* <img src={`data:image/png;base64,${community.fotoComunidad.data}`} alt="Imagen de la comunidad" /> */}
                    {/* <img src={CommunityImage} alt=''/> */}
                </div>
            </div>
            <div className='col-9 CommunityInfoHeader'>
                <div className='UserInfoContainer'>
                    <h1>{community.community_data.nombre}</h1>  
                </div>
                <div className='CommunityUsersNumber'>
                    <h4>Cantidad de miembros:</h4><h4 className='UsersNumber'>{community.members}</h4>
                </div>
                <div className='CreatorCommInfo'>
                <span>Creador de la Comunidad:</span>
                <span className='CreatorCommName'>{community.creatorUsername}</span>
                </div>
            </div>
            <div className='btnModsWrapper'>
                {/* <div className='CreatorCommInfo'>
                <span>Creador de la Comunidad:</span>
                <span className='CreatorCommName'>Usuario</span>
                </div> */}
                {/* <button onClick={handleShowModsModal} className='btnMods'>Ver moderadores</button> */}
            </div>
        </div>      
        {/* )} */}
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