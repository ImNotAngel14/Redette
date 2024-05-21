import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles/SideBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SideBar = () => {
    const [showCommunityModal, setShowCommunityModal] = useState(false);

    const handleCloseCommunityModal = () => {
        setTags([]); // Reiniciar el array de etiquetas
        setSelectedCommImage(''); // Reiniciar la imagen seleccionada
        setCommImageBase64(''); // Reiniciar la imagen en base64
        setShowCommunityModal(false);
        setCommRegError(false);
    }

    const handleShowCommunityModal = () => {
        setShowCommunityModal(true);
        setSelectedName('');
        setSelectedDesc('');
        setNameError(false);
        setDescError(false);
        setCommImageError(false);
    };

    const handleLogOff = () => {
        localStorage.removeItem('loggedUser');
        window.location.replace("/login");
    }

    // COMUNIDAD {
    const [name, setSelectedName] = useState('');
    const [description, setSelectedDesc] = useState('');
    const [nameError, setNameError] = useState(false);
    const [descError, setDescError] = useState(false);

    const [selectedCommImage, setSelectedCommImage] = useState('');
    const [commImageBase64, setCommImageBase64] = useState('');
    const [commImageError, setCommImageError] = useState(false);

    const [CommRegError, setCommRegError] = useState(false); // Estado para el error de registro
    const [createdCommunityId, setCreatedCommunityId] = useState(null);

    // } COMUNIDAD

    const handleSubmitCommunity = async (event) => {
        event.preventDefault();

        if (!name.trim()) {
            setNameError(true);
        } else {
            setNameError(false);
        }
        
        if (!description.trim()) {
            setDescError(true);
        } else {
            setDescError(false);
        }        

        if (!commImageBase64) {
            setCommImageError(true);
        } else {
            setCommImageError(false);
        }

        if (tags.length === 0) {
            setTagsError(true); // Establecer tagsError en true si no se han agregado etiquetas
            return;
        }

        // Si todos los campos obligatorios están completos, puedes enviar el formulario
        if (name && description && commImageBase64 && (tags.length > 0)) {
            // Imprimir los valores en la consola
            let image = commImageBase64.substring(22);
            const userId = parseInt(localStorage.getItem('loggedUser'));

            // Obtener los valores de los campos del formulario
            const formData = {
                name,
                description,
                image,
                creator: userId,
            };
            console.log("Datos del formulario de nueva comunidad:", formData);
            // peticion backend
            try {
                const response = await fetch('http://localhost:3000/community', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                // Actuamos en base a la respuesta de la API
                const data = await response.json();
                if (data.success) {
                    // Mostrar mensaje de exito de creacion de comunidad
                    // ...
                    setCreatedCommunityId(data.createdCommunityId); // Guardar el ID de la comunidad creada
                    console.log(data.createdCommunityId);
                    handleShowCommSuccess(); // Mostrar el modal de éxito
                    handleCloseCommunityModal(); // Cerrar el modal de creación de comunidad
                    setCommRegError(false); // Resetear el error
                } else {
                    // Mostrar mensaje de error del registro
                    setCommRegError(true);
                    console.error('Error en el registro de la comunidad:', data.message);
                }
            } catch (error) {
                setCommRegError(true);
                console.error('Error al llamar a la API:', error);
            }
            // peticion backend

        }

    };

    // imagen comunidad
    const handleCommImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedCommImage(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCommImageBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [showCommunitySuccess, setShowCommSuccessModal] = useState(false);
    const handleCloseCommSuccess = () => setShowCommSuccessModal(false);
    const handleShowCommSuccess = () => setShowCommSuccessModal(true);

    {/* Etiquetas temas */}
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [tagsError, setTagsError] = useState(false);

    const handleTagInputChange = (event) => {
        setTagInput(event.target.value);
    };
    const handleAddTag = () => {
        if (tagInput.trim() !== '') {
            //si la etiqueta ya existe en el arreglo
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
                // Si se agrega al menos una etiqueta
                setTagsError(false);
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddTag();
        }
    };
    {/* Etiquetas temas */}
    
    return (
        <div>
            <div className='SB_formContainer'>
                <div className='SideBarContainer'>
                    <div className='SideBarWrapper'>
                        <a href='/pfposts'><i className="fa-solid fa-circle-user"></i> Perfil</a>
                        {
                        
                        /*
                        <button onClick={handleShowPostModal}> <i className="fa-solid fa-plus fa-lg"></i> Nueva Publicación </button>
                        */
                        }
                        <button onClick={handleShowCommunityModal}><i className="fa-solid fa-person-circle-plus"></i> Crear Comunidad</button>
                        <a href='/pfcomm'><i className="fa-solid fa-people-roof"></i> Tus comunidades</a>
                        {/* <a href='/pfsaved'><i className="fa-regular fa-bookmark"></i> Guardados</a> */}
                        <hr />
                        <button onClick={handleLogOff}>Cerrar sesión <i className="fa-solid fa-right-from-bracket"></i></button>
                    </div>
                </div>
            </div>

            <Modal show={showCommunityModal} onHide={handleCloseCommunityModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Comunidad</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmitCommunity}>
                    <Modal.Body>
                    <div className="form-group">
                        {CommRegError && <p className="error-text" style={{ color: 'red' }}>Registro de Comunidad fallido. Intente de nuevo</p>}
                        <textarea className={`form-control ${nameError ? 'error' : ''}`} value={name} onChange={(e) => setSelectedName(e.target.value)} rows="1" placeholder='Nombre'></textarea>
                        {nameError && <p className="error-text" style={{ color: 'red' }}>**Campo obligatorio</p>}
                        <textarea className={`form-control ${descError ? 'error' : ''}`} value={description} onChange={(e) => setSelectedDesc(e.target.value)} rows="5" placeholder='Descripción'></textarea>
                        {descError && <p className="error-text" style={{ color: 'red' }}>**Campo obligatorio</p>}
                        <div className="form-group">
                            <label className="form-label">Imagen de la Comunidad:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleCommImageChange}
                                className={`form-control ${commImageError ? 'error' : ''}`}
                            />
                            {commImageError && <p className="error-text" style={{ color: 'red' }}>**Campo obligatorio</p>}
                            {selectedCommImage && <p>Archivo seleccionado: {selectedCommImage}</p>}
                        </div>
                        <div className="tag-container">
                            <p>Temas de interés:</p>
                            <div className="tags-list">
                                {tags.map((tag, index) => (
                                <div key={index} className="tag">
                                    {tag}
                                    <button type="button" className='tag-delete-btn' onClick={() => handleRemoveTag(index)}><i className="fa-solid fa-x"></i></button>
                                </div>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={tagInput}
                                onChange={handleTagInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Agregar tema"
                                className="tag-input"
                            />
                            <button type="button" className='tag-add-btn' onClick={handleAddTag}><i className="fa-solid fa-plus"></i></button>
                            {tagsError && <p style={{ color: 'red' }}>**Debes agregar al menos un tema</p>}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <input type='submit' className='buttonPostAccept' value='Crear' />
                </Modal.Footer>
            </form>
        </Modal>

        <Modal show={showCommunitySuccess} onHide={handleCloseCommSuccess}>
            <Modal.Header closeButton>
                <Modal.Title>Comunidad creada exitosamente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <button className="buttonPostAccept">
            <a href={`/comm/${createdCommunityId}`}>Ver Comunidad</a>
        </button>
                        {/* <button className="buttonPostAccept">
                            <a href={`/comm/1`}>Ver Comunidad</a>
                        </button> */}
            </Modal.Body>

        </Modal>

    </div>
);
};

export default SideBar;