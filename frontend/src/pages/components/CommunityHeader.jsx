import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles/CommunityHeader.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommunityImage from "./img/Com.png"

const CommunityHeader = () => {
    const [showModsModal, setShowModsModal] = useState(false);
    const handleCloseModsModal = () => setShowModsModal(false);
    const handleShowModsModal = () => {setShowModsModal(true);};

    const [community, setCommunity] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    useEffect(() => {
        console.log('CommunityHeader montado');
        const fetchCommunity = async () => {
            try {
                const response = await fetch(`http://localhost:3000/community/1`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (data.success) {
                    // Actualiza el estado con los datos obtenidos
                    setCommunity(data.community_data);
                    console.log('ComunidadHeader cargado');
                    console.log('Datos de la publicación:', data.community_data);
                    // Decodificar base64
                    const base64Image = btoa(
                        new Uint8Array(data.community_data.fotoComunidad.data)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    // Generar URL de la imagen
                    const imageURL = `data:image/png;base64,${base64Image}`;
                    setImageURL(imageURL);
                    console.log(imageURL);

                } else {
                    console.error('Error al cargar ComunidadHeader:', data.message);
                }
            } catch (error) {
                console.error('Error al llamar a la API:', error);
            }
        };
        console.log('CommunityHeader desmontado');
        fetchCommunity();
    }, []);

  return (
    <div>
        {community && (
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
                    <h1>{community.nombre}</h1>  
                </div>
                <div className='CommunityUsersNumber'>
                    <h4>Cantidad de miembros:</h4><h4 className='UsersNumber'>#</h4>
                </div>
                <div className='CreatorCommInfo'>
                <span>Creador de la Comunidad:</span>
                <span className='CreatorCommName'>{community.FKUsuario}</span>
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
        )}
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