import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './styles/SideBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SideBar = () => {
    const [showPostModal, setShowPostModal] = useState(false);
    const [showCommunityModal, setShowCommunityModal] = useState(false);

    const handleClosePostModal = () => {
        setShowPostModal(false);
        setPostRegError(false);
        }
    const handleCloseCommunityModal = () => {
        setTags([]);// Reiniciar el array de etiquetas
        setSelectedCommImage(''); // Reiniciar la imagen seleccionada
        setCommImageBase64(''); // Reiniciar la imagen en base64
        setShowCommunityModal(false);
        setCommRegError(false);
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

    // POST
    const [selectedFileName, setSelectedFileName] = useState('');
    const [selectedFileBase64, setSelectedFileBase64] = useState('');
    const [title, setSelectedTitle] = useState('');
    const [body, setSelectedText] = useState('');
    const [link, setSelectedLink] = useState('');
    const [community, setSelectedCommunity] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [communityError, setCommunityError] = useState(false);

    const [PostRegError, setPostRegError] = useState(false); // Estado para el error de publicacion
    // POST

    // COMUNIDAD {
    const [name, setSelectedName] = useState('');
    const [description, setSelectedDesc] = useState('');
    const [nameError, setNameError] = useState(false);
    const [descError, setDescError] = useState(false);

    const [selectedCommImage, setSelectedCommImage] = useState('');
    const [commImageBase64, setCommImageBase64] = useState('');
    const [commImageError, setCommImageError] = useState(false);

    const [CommRegError, setCommRegError] = useState(false); // Estado para el error de registro
    // } COMUNIDAD

    const handleSubmitPost = async (event) => {
        event.preventDefault();

        if (!title) {
            setTitleError(true);
        } else {
            setTitleError(false);
        }

        if (!community) {
            setCommunityError(true);
        } else {
            setCommunityError(false);
        }

        // Si todos los campos obligatorios están completos, puedes enviar el formulario
        if (title && community) {
            let image = selectedFileBase64.substring(22);
            //usuario harcodeado
            let author = 1;


            // Aquí puedes agregar la lógica para enviar el formulario
            // Obtener los valores de los campos del formulario
            const formData = {
                author,
                community,
                title,
                body,
                link,
                image
            };
            console.log("Datos del formulario de nueva publicacion:", formData);
            // peticion backend
            try {
                const response = await fetch('http://localhost:3000/post', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({                         
                        community,
                        title,
                        body,
                        link,
                        image,
                        author
                    })
                });

                // Actuamos en base a la respuesta de la API
                const data = await response.json();
                if (data.success) {
                    // Mostrar mensaje de éxito de creación de comunidad
                    handleShowPostSuccess(); // Mostrar el modal de éxito
                    handleClosePostModal(); // Cerrar el modal de creación de post
                    setPostRegError(false); // Resetear el error
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
        var creator = 1;

            // Obtener los valores de los campos del formulario
            const formData = {
                name,
                description,
                image,
                // tags
                creator
            };
            console.log("Datos del formulario de nueva comunidad:", formData);
            // peticion backend
            try {
                const response = await fetch('http://localhost:3000/community', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, description, image, creator})
                });

                // Actuamos en base a la respuesta de la API
                const data = await response.json();
                if(data.success)
                {
                    // Mostrar mensaje de exito de creacion de comunidad
                    // ...
                    handleShowCommSuccess(); // Mostrar el modal de éxito
                    handleCloseCommunityModal(); // Cerrar el modal de creación de comunidad
                    setCommRegError(false); // Resetear el error
                }
                else
                {
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
    const [showPostSuccess, setShowPostSuccessModal] = useState(false);
    const handleCloseCommSuccess = () => setShowCommSuccessModal(false);
    const handleClosePostSuccess = () => setShowPostSuccessModal(false);
    const handleShowCommSuccess = () => setShowCommSuccessModal(true);
    const handleShowPostSuccess = () => setShowPostSuccessModal(true);

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
                        <button onClick={handleShowPostModal}> <i className="fa-solid fa-plus fa-lg"></i> Nueva Publicación </button>
                        <button onClick={handleShowCommunityModal}><i className="fa-solid fa-person-circle-plus"></i> Crear Comunidad</button>
                        <a href='/pfcomm'><i className="fa-solid fa-people-roof"></i> Tus comunidades</a>
                        <a href='/pfsaved'><i className="fa-regular fa-bookmark"></i> Guardados</a>
                        <hr />
                        <button onClick={handleLogOff}>Cerrar sesión</button>
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
                <label className="CommunityLabel" htmlFor="CommunityList">Publicar en:</label>
                <select id="CommunityList" className={`${communityError ? 'error' : ''}`} value={community} onChange={(e) => setSelectedCommunity(parseInt(e.target.value))}>
                    <option disabled value="">Selecciona una comunidad</option>
                    <option value={ 1 }>Comunidad 1</option>
                    <option value={ 2 }>Comunidad 2</option>
                    <option value={ 3 }>Comunidad 3</option>
                </select>
                {communityError && <p className="error-text" style={{ color: 'red' }}>**Campo obligatorio</p>}
                <textarea className={`form-control ${titleError ? 'error' : ''}`} value={title} onChange={(e) => setSelectedTitle(e.target.value)} rows="1" placeholder='Título'></textarea>
                {titleError && <p className="error-text" style={{ color: 'red' }}>**Campo obligatorio</p>}
                <textarea className="form-control" rows="3" placeholder='Texto' value={body} onChange={(e) => setSelectedText(e.target.value)}></textarea>
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
                        <input type='url' className='input_url' id='post_url' value={link} onChange={(e) => setSelectedLink(e.target.value)} placeholder='Adjuntar link' />
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
                <button className="buttonPostAccept"> <a href='/comm'> Ver Comunidad</a> </button>
                </Modal.Body>

            </Modal>

            <Modal show={showPostSuccess} onHide={handleClosePostSuccess}>
                <Modal.Header closeButton>
                    <Modal.Title>Post publicado exitosamente</Modal.Title>
                </Modal.Header>
            </Modal>
        </div>
    );
};

export default SideBar;
