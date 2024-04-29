import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles/PostInputContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostInputContainer = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const handleClosePostModal = () => setShowPostModal(false);
  const handleShowPostModal = () => {
    setShowPostModal(true);
    setSelectedFileName('');
    setSelectedTheme('');
    setSelectedTitle('');
    setSelectedCommunity('');
    setThemeError(false);
    setTitleError(false);
    setCommunityError(false);
  };

  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [themeError, setThemeError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [communityError, setCommunityError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar campos obligatorios
    if (!selectedTheme) {
      setThemeError(true);
    } else {
      setThemeError(false);
    }

    if (!selectedTitle) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (!selectedCommunity) {
      setCommunityError(true);
    } else {
      setCommunityError(false);
    }

    // Si todos los campos obligatorios están completos, puedes enviar el formulario
    if (selectedTheme && selectedTitle && selectedCommunity) {
      // Aquí puedes agregar la lógica para enviar el formulario
      handleClosePostModal();
    }
  };

  return (
    <div>
      <div className='PostInputContainer'>
        <div className='PostInputWrapper'>
          <h3>Nuevo Post</h3>
          <div className='InputContainer'>
            <i className="fa-regular fa-pen-to-square fa-xl"></i>
            <input type='text' placeholder='Comparte algo con el mundo...' readOnly onClick={handleShowPostModal} />
          </div>
          <hr />
          <div className='ButtonsContainer'>
            <button onClick={handleShowPostModal} className='buttonPost'><i className="fa-regular fa-image fa-lg"></i><span>Adjuntar Multimedia</span></button>
            <button onClick={handleShowPostModal} className='buttonPost'><i className="fa-solid fa-link"></i><span>Adjuntar Link</span></button>
          </div>
        </div>
      </div>
      <Modal show={showPostModal} onHide={handleClosePostModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Post</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group">
              <textarea className={`form-control txta-tema ${themeError ? 'error' : ''}`} rows="1" placeholder='Tema' value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}></textarea>
              {themeError && <p className="error-text" style={{ color: 'red' }}>**Campo obligatorio</p>}
              <label className="CommunityLabel" htmlFor="CommunityList">Publicar en:</label>
              <select id="CommunityList" className={`${communityError ? 'error' : ''}`} value={selectedCommunity} onChange={(e) => setSelectedCommunity(e.target.value)}>
                <option value="">Selecciona una comunidad</option>
                <option value="Comunidad 1">Comunidad 1</option>
                <option value="Comunidad 2">Comunidad 2</option>
                <option value="Comunidad 3">Comunidad 3</option>
              </select>
              {communityError && <p className="error-text" style={{ color: 'red' }}>**Campo obligatorio</p>}
              <textarea className={`form-control ${titleError ? 'error' : ''}`} value={selectedTitle} onChange={(e) => setSelectedTitle(e.target.value)} rows="1" placeholder='Título'></textarea>
              {titleError && <p className="error-text" style={{ color: 'red' }}>**Campo obligatorio</p>}
              <textarea className="form-control" rows="3" placeholder='Texto (opcional)'></textarea>
              <div className='AddtoPostContainer'>
                <div className='FileInputContainer'>
                  <input
                    type='file'
                    id='post_file'
                    style={{ display: 'none' }}
                    onChange={(e) => setSelectedFileName(e.target.files[0]?.name || '')}
                  />
                  <label htmlFor='post_file'>
                    <i className="fa-regular fa-image fa-lg"></i>
                    <span>Adjuntar Multimedia</span><br />
                  </label>
                  <p>{selectedFileName}</p>
                </div>
                <div className='UrlInputContainer'>
                  <label htmlFor='post_url'><i className="fa-solid fa-link"></i></label>
                  <input type='url' className='input_url' id='post_url' placeholder='Adjuntar link' />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <input type='submit' className='buttonPostAccept' value='Publicar' />
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default PostInputContainer;
