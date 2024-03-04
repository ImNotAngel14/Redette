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
            <div className='formContainer'>
                <div className='SideBarContainer'>
                    <div className='SideBarWrapper'>
                        <button> <a><i class="fa-solid fa-circle-user"></i> Perfil</a> </button>
                        <button onClick={handleShowPostModal}> <i class="fa-solid fa-plus fa-lg"></i> Nueva Publicación </button>
                        <button> <a><i class="fa-solid fa-person-circle-plus"></i> Crear Comunidad</a> </button>
                        <button> <a><i class="fa-solid fa-people-roof"></i> Tus comunidades</a> </button>
                        <button> <a><i class="fa-regular fa-bookmark"></i> Guardados</a> </button>
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
                    <div class="form-group">
                        <textarea class="form-control" id="TittlePostInput" rows="1" placeholder='Título'></textarea>
                        <textarea class="form-control" id="TextPostInput" rows="3" placeholder='Texto (opcional)'></textarea>
                        <div className='AddtoPostContainer'>
                            <div className='FileInputContainer'>
                                <input type='file' id='post_file'/>
                                <label htmlFor='post_file'><i className="fa-regular fa-image fa-lg"></i><span>Adjuntar Multimedia</span></label>
                            </div>
                            <div className='UrlInputContainer'>
                                <label htmlFor='post_url'><i class="fa-solid fa-link"></i></label>
                                <input type='url' class='input_url' id='post_url' placeholder='Adjuntar link'/>
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
