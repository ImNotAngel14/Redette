import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles/SideBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const SideBar = () => {
    const [showPostModal, setShowPostModal] = useState(false);
    const handleClosePostModal = () => setShowPostModal(false);
    const handleShowPostModal = () => setShowPostModal(true);
    return (
        <div>
            <div className='SB_formContainer'>
                <div className='SideBarContainer'>
                    <div className='SideBarWrapper'>
                        <a href='/pfposts'><i className="fa-solid fa-circle-user"></i> Perfil</a>
                        <button onClick={handleShowPostModal}> <i className="fa-solid fa-plus fa-lg"></i> Nueva Publicación </button>
                        <a href='/pfsaved'><i className="fa-solid fa-person-circle-plus"></i> Crear Comunidad</a>
                        <a href='/pfcomm'><i className="fa-solid fa-people-roof"></i> Tus comunidades</a>
                        <a href='/pfsaved'><i className="fa-regular fa-bookmark"></i> Guardados</a>
                        <hr/>
                        <button>Cerrar sesión</button>
                    </div>
                </div>
            </div>
            <Modal show={showPostModal} onHide={handleClosePostModal}>
                <Modal.Header closeButton>
                <Modal.Title>Crear Nuevo Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                    <div className="form-group">
                        <textarea className="form-control" id="TittlePostInput" rows="1" placeholder='Título'></textarea>
                        <textarea className="form-control" id="TextPostInput" rows="3" placeholder='Texto (opcional)'></textarea>
                        <div className='AddtoPostContainer'>
                            <div className='FileInputContainer'>
                                <input type='file' id='post_file'/>
                                <label htmlFor='post_file'><i className="fa-regular fa-image fa-lg"></i><span>Adjuntar Multimedia</span></label>
                            </div>
                            <div className='UrlInputContainer'>
                                <label htmlFor='post_url'><i className="fa-solid fa-link"></i></label>
                                <input type='url' className='input_url' id='post_url' placeholder='Adjuntar link'/>
                            </div>
                        </div>
                    </div>
                </form>
                </Modal.Body>
                <Modal.Footer>
                <button className='buttonPost' onClick={handleClosePostModal}>
                    Cerrar
                </button>
                <button className='buttonPostAccept' onClick={handleClosePostModal}>
                    Publicar
                </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SideBar;
