import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/CommunityProfile.css';
import CommunityImage from "./img/Com.png"
import Toast from 'react-bootstrap/Toast';


const CommunityProfile = () => {

    const [community, setCommunity] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [showToast, setShowToast] = useState(false);

    setTimeout(() => setShowToast(false), 3000);



    const HandleJoinCommunity = async (event) => {
        event.preventDefault();

            // console.log("Datos del formulario de nueva comunidad:", formData);
            // peticion backend
            try {
                const response = await fetch('http://localhost:3000/joinCommunity', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: 1, // ID del usuario que se está uniendo
                        community: 1 // ID de la comunidad a la que se está uniendo
                    })
                });
    
                const data = await response.json();
                if (data.success) {
                    console.log('Usuario unido a la comunidad con éxito');
                    setShowToast(true);
                    // Aquí puedes actualizar el estado o mostrar un mensaje de éxito
                } else {
                    console.error('Error al unirse a la comunidad:', data.message);
                }
            } catch (error) {
                console.error('Error al llamar a la API:', error);
            }    

    };
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

            <div className='row'>

            {community && (

                <div className='U_CommunityContainer'>
                    <div className='U_CommunityWrapper'>
                        <div className='row'>
                            <div className='col-9'>
                                <div className='U_CommunityHeader'>
                                    <p>{community.FKUsuario}</p> 
                                    <a href='/comm'><h3>{community.nombre}</h3> </a>
                                </div>
                            </div>
                            <div className='col-3 d-flex justify-content-end'>
                                {imageURL && <img src={imageURL} className='CommunityImg' alt="Imagen de la comunidad" />}
                            </div>
                        </div>
                        <div className='CommunityDesc'>
                                <p className='DescLabel'>Descripción:</p>
                                <p>{community.descripcion}</p>
                        </div>
                        <hr/>
                        <div className='Buttons d-flex justify-content-end'>
                            <button className="btn-spacing" onClick={HandleJoinCommunity}> <i className="fa-solid fa-plus"></i> Unirse</button>
                            <button className="btn-spacing"> <i className="fa-solid fa-right-from-bracket"></i> Abandonar</button>
                        </div>
                    </div>
                    <Toast show={showToast} className='Toast'>
                    <Toast.Body>Unido a la comunidad {community.nombre}</Toast.Body>
                    </Toast>
                </div>


            )}

            </div>

        </div>

    )


}

export default CommunityProfile