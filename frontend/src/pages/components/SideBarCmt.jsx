import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/SideBarCmt.css';
import Toast from 'react-bootstrap/Toast';

const SideBarCmt = ({ community, userId }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [showJoinToast, setShowJoinToast] = useState(false);
  const [showLeaveToast, setShowLeaveToast] = useState(false);

  const handleJoinCommunity = async () => {
    try {
      const response = await fetch('http://localhost:3000/member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: userId,
          community: community.community_data.id_comunidad
        })
      });

      console.log('Usuario'+userId);
      console.log('community'+community.community_data.id_comunidad);

      const data = await response.json();
      if (data.success) {
        console.log('Usuario unido a la comunidad con éxito');
        setIsJoined(true);
        setShowJoinToast(true);
      } else {
        console.error('Error al unirse a la comunidad:', data.message);
      }
    } catch (error) {
      console.error('Error al llamar a la API:', error);
    }
  };



  return (
    <div>
      {community && (
        <div className='Cmt_SideBarContainer'>
          <div className='Cmt_SideBarWrapper'>
            <h4>Descripción de la Comunidad:</h4>
            <p>{community.community_data.descripcion}</p>
            {/* <hr />
            {isJoined ? (
              <button onClick={handleLeaveCommunity}>Abandonar</button>
            ) : (
              <button onClick={handleJoinCommunity}>Unirse</button>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBarCmt;