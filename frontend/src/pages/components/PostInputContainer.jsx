import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles/PostInputContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostInputContainer = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const handleClosePostModal = () => {
    setShowPostModal(false);
    setPostRegError(false);
    }
  const handleShowPostModal = () => {
      setShowPostModal(true);
      setSelectedFileName('');
      setSelectedFileBase64('');
      setSelectedTitle('');
      setSelectedCommunity('');
      setSelectedLink('');
      setSelectedText('');
      setTitleError(false);
      setCommunityError(false);
  };

    // POST
    const [selectedFileName, setSelectedFileName] = useState('');
    const [selectedFileBase64, setSelectedFileBase64] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [selectedLink, setSelectedLink] = useState('');
    const [selectedCommunity, setSelectedCommunity] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [communityError, setCommunityError] = useState(false);

    const [PostRegError, setPostRegError] = useState(false); // Estado para el error de publicacion
    // POST

    const handleSubmitPost = async (event) => {
      event.preventDefault();

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
      if (selectedTitle) {
          // Aquí puedes agregar la lógica para enviar el formulario

          // peticion backend
          try {
            // Obtiene la URL actual
              const currentUrl = window.location.pathname;

              // Divide la URL en segmentos
              const urlSegments = currentUrl.split('/');

              // Supone que el ID del post es el último segmento
              const communityId = urlSegments[urlSegments.length - 1];
              const userId = localStorage.getItem('loggedUser');
              const response = await fetch('http://localhost:3000/post', {
                  method: 'POST',
                  headers: {
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({                         
                      community: parseInt(communityId),
                      title: selectedTitle,
                      body: selectedText,
                      link: selectedLink,
                      image: selectedFileBase64.substring(22),
                      author: parseInt(userId)
                  })
              });

              // Actuamos en base a la respuesta de la API
              const data = await response.json();
              if (data.success) {
                  handleShowPostSuccess(); // Mostrar el modal de éxito
                  handleClosePostModal(); // Cerrar el modal de creación de post
                  setPostRegError(false); // Resetear el error
                  window.location.reload(); // Recargar la página
              } else {
                  // Mostrar mensaje de error del registro
                  setPostRegError(true);
                  console.error('Error en la publicación:', data.message);
              }
          } catch (error) {
              setPostRegError(true);
              console.error('Error al llamar a la API:', error);
          }
      }
    };

    // imagen publicacion
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          setSelectedFileName(file.name);
          const reader = new FileReader();
          reader.onloadend = () => {
              setSelectedFileBase64(reader.result);
          };
          reader.readAsDataURL(file);
      }
    };

    const [showPostSuccess, setShowPostSuccessModal] = useState(false);
    const handleClosePostSuccess = () => setShowPostSuccessModal(false);
    const handleShowPostSuccess = () => setShowPostSuccessModal(true);

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
        <form onSubmit={handleSubmitPost}>
        <Modal.Body>
            <div className="form-group">
            {PostRegError && <p className="error-text" style={{ color: 'red' }}>Creación de Post fallido. Intente de nuevo</p>}
            {
            /*
            <label className="CommunityLabel" htmlFor="CommunityList">Publicar en:</label>
            <select id="CommunityList" className={`${communityError ? 'error' : ''}`} value={selectedCommunity} onChange={(e) => setSelectedCommunity(e.target.value)}>
                <option disabled value="">Selecciona una comunidad</option>
                <option value="Comunidad 1">Comunidad 1</option>
                <option value="Comunidad 2">Comunidad 2</option>
                <option value="Comunidad 3">Comunidad 3</option>
            </select>
            
            {communityError && <p className="error-text" style={{ color: 'red' }}>**Campo obligatorio</p>}
            */
            }
            <textarea className={`form-control ${titleError ? 'error' : ''}`} value={selectedTitle} onChange={(e) => setSelectedTitle(e.target.value)} rows="1" placeholder='Título'></textarea>
            {titleError && <p className="error-text" style={{ color: 'red' }}>**Campo obligatorio</p>}
            <textarea className="form-control" rows="3" placeholder='Texto' value={selectedText} onChange={(e) => setSelectedText(e.target.value)}></textarea>
            <div className='AddtoPostContainer'>
                <div className='FileInputContainer'>
                    <input
                        type='file'
                        accept="image/*"
                        id='post_file'
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor='post_file'>
                        <i className="fa-regular fa-image fa-lg"></i>
                        <span>Adjuntar Multimedia</span><br />
                    </label>
                    <p>{selectedFileName}</p>
                </div>
                <div className='UrlInputContainer'>
                    <label htmlFor='post_url'><i className="fa-solid fa-link"></i></label>
                    <input type='url' className='input_url' id='post_url' value={selectedLink} onChange={(e) => setSelectedLink(e.target.value)} placeholder='Adjuntar link' />
                </div>
            </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <input type='submit' className='buttonPostAccept' value='Publicar' />
        </Modal.Footer>
        </form>
      </Modal>

      <Modal show={showPostSuccess} onHide={handleClosePostSuccess}>
          <Modal.Header closeButton>
              <Modal.Title>Post publicado exitosamente</Modal.Title>
          </Modal.Header>
      </Modal>
    </div>
  );
}

export default PostInputContainer;
