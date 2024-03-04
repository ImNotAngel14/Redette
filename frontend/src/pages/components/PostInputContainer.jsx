import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles/PostInputContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostInputContainer= () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const handleClosePostModal = () => setShowPostModal(false);
  const handleShowPostModal = () => setShowPostModal(true);
  return (
    <div>
        <div className='PostInputContainer'>
            <div className='PostInputWrapper'>
                <h3>Nuevo Post</h3>
                <div className='InputContainer'>
                    <i className="fa-regular fa-pen-to-square fa-xl"></i>
                    <input type='text' placeholder='Comparte algo con el mundo...' readOnly  onClick={handleShowPostModal}/>
                </div>
                <hr/>
                <div className='ButtonsContainer'>
                    <button onClick={handleShowPostModal} className='buttonPost'><i className="fa-regular fa-image fa-lg"></i><span>Adjuntar Multimedia</span></button>
                    <button onClick={handleShowPostModal} className='buttonPost'><i className="fa-solid fa-link" ></i><span>Adjuntar Link</span></button>
                    {/* <input type='url' id='post_url'/> */}
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
                    <textarea className="form-control" rows="1" placeholder='Tema'></textarea>
                    <label for="CommunityList">Comunidad</label>
                    <select id="CommunityList">
                        <option value="Community">Comunidad 1</option>
                        <option value="Community">Comunidad 2</option>
                        <option value="Community">Comunidad 3</option>
                    </select>
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
}

export default PostInputContainer;