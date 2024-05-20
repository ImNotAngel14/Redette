import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/CommunityProfile.css';
import Toast from 'react-bootstrap/Toast';

const CommunityProfile = ({ community }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleJoinCommunity = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: 1, // ID del usuario que se está uniendo
          community: community.id_comunidad // ID de la comunidad a la que se está uniendo
        })
      });
      console.log(community.id_comunidad);

      const data = await response.json();
      if (data.success) {
        console.log('Usuario unido a la comunidad con éxito');
        setShowToast(true);
        setToastMessage('Unido a la comunidad ' + community.nombre);
      } else if (data.message === "¡Actualmente pertenece a la comunidad seleccionada!.") {
        console.log('El usuario ya pertenece a esta comunidad');
        setShowToast(true);
        setToastMessage('¡Actualmente pertenece a la comunidad seleccionada!');
      } else {
        console.error('Error al unirse a la comunidad:', data.message);
      }
    } catch (error) {
      console.error('Error al llamar a la API:', error);
    }
  };

  const handleLeaveCommunity = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/member', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: 1, // ID del usuario que se está eliminando
          community: community.id_comunidad // ID de la comunidad de la que se está eliminando
        })
      });

      const data = await response.json();
      if (data.success) {
        console.log('Usuario abandonó la comunidad con éxito');
        setShowToast(true);
        setToastMessage('Abandonaste la comunidad ' + community.nombre);
      } else if (data.message === "¡No puede salir de una comunidad en la que no se encuentra!.") {
        console.log('El usuario no pertenece a esta comunidad');
        setShowToast(true);
        setToastMessage('¡No puede salir de una comunidad en la que no se encuentra!');
      } else {
        console.error('Error al abandonar la comunidad:', data.message);
      }
    } catch (error) {
      console.error('Error al llamar a la API:', error);
    }
  };

  setTimeout(() => setShowToast(false), 3000);

  return (
    <div className='U_CommunityContainer'>
      <div className='U_CommunityWrapper'>
        <div className='row'>
          <div className='col-9'>
            <div className='U_CommunityHeader'>
              <a href={`/comm/${community.id_comunidad}`}><h3>{community.nombre}</h3></a>
            </div>
          </div>
          <div className='col-3 d-flex justify-content-end'>
            {community.fotoComunidad && <img src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(community.fotoComunidad.data)))}`} className='CommunityImg' alt="Imagen de la comunidad" />}
          </div>
        </div>
        <div className='CommunityDesc'>
          <p className='DescLabel'>Descripción:</p>
          <p>{community.descripcion}</p>
        </div>
        <hr/>
        <div className='Buttons d-flex justify-content-end'>
          <button className="btn-spacing" onClick={handleJoinCommunity}><i className="fa-solid fa-plus"></i> Unirse</button>
          <button className="btn-spacing" onClick={handleLeaveCommunity}><i className="fa-solid fa-right-from-bracket"></i> Abandonar</button>
        </div>
      </div>
      <Toast show={showToast} className='Toast'>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default CommunityProfile;
