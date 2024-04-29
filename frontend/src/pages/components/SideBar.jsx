import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles/SideBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SideBar = () => {
    const [showPostModal, setShowPostModal] = useState(false);
    const [showCommunityModal, setShowCommunityModal] = useState(false);
    const handleClosePostModal = () => setShowPostModal(false);
    const handleCloseCommunityModal = () => setShowCommunityModal(false);
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
    const handleShowCommunityModal = () => {
        setShowCommunityModal(true);
        setSelectedName('');
        setSelectedDesc('');
        setNameError(false);
        setDescError(false);
    };
    const [selectedFileName, setSelectedFileName] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectedCommunity, setSelectedCommunity] = useState('');
    const [themeError, setThemeError] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [communityError, setCommunityError] = useState(false);

    const [selectedName, setSelectedName] = useState('');
    const [selectedDesc, setSelectedDesc] = useState('');
    const [nameError, setNameError] = useState(false);
    const [descError, setDescError] = useState(false);

    const handleSubmitPost = (e) => {
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

    const handleSubmitCommunity = (e) => {
        e.preventDefault();

        if (!selectedName.trim()) {
            setNameError(true);
        } else {
            setNameError(false);
        }
        
        if (!selectedDesc.trim()) {
            setDescError(true);
        } else {
            setDescError(false);
        }        

        // Si todos los campos obligatorios están completos, puedes enviar el formulario
        if (selectedName && selectedDesc) {
            // Aquí puedes agregar la lógica para enviar el formulario
            handleCloseCommunityModal();
        }
    };

    // Función para extraer hashtags del texto ingresado
    const extractHashtags = (text) => {
        const hashtags = text.match(/#[^\s#]+/g);
        return hashtags || [];
    };
    
    return (
        <div>
            <div className='SB_formContainer'>
                <div className='SideBarContainer'>
                    <div className='SideBarWrapper'>
                        <a href='/pfposts'><i className="fa-solid fa-circle-user"></i> Perfil</a>
                        <button onClick={handleShowPostModal}> <i className="fa-solid fa-plus fa-lg"></i> Nueva Publicación </button>
                        <button onClick={handleShowCommunityModal}><i className="fa-solid fa-person-circle-plus"></i> Crear Comunidad</button>
                        <a href='/pfcomm'><i className="fa-solid fa-people-roof"></i> Tus comunidades</a>
                        <a href='/pfsaved'><i className="fa-regular fa-bookmark"></i> Guardados</a>
                        <hr />
                        <button>Cerrar sesión</button>
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

            <Modal show={showCommunityModal} onHide={handleCloseCommunityModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Comunidad</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmitCommunity}>
                    <Modal.Body>
                    <div className="form-group">
                        <textarea className={`form-control ${nameError ? 'error' : ''}`} value={selectedName} onChange={(e) => setSelectedName(e.target.value)} rows="1" placeholder='Nombre'></textarea>
                        {nameError && <p className="error-text" style={{ color: 'red' }}>**Campo obligatorio</p>}
                        <textarea className={`form-control ${descError ? 'error' : ''}`} value={selectedDesc} onChange={(e) => setSelectedDesc(e.target.value)} rows="5" placeholder='Descripción'></textarea>
                        {descError && <p className="error-text" style={{ color: 'red' }}>**Campo obligatorio</p>}
                        <textarea className="form-control" rows="3" placeholder='Temas de interés'></textarea>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <input type='submit' className='buttonPostAccept' value='Crear' />
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};

export default SideBar;
