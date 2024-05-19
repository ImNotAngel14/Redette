import React, { useEffect, useState } from 'react';
import './styles/SideBarCmt.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SideBarCmt= () => {

  const [community, setCommunity] = useState(null);
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
                  console.log('SidebarCmt cargado');
                  console.log('Datos de la publicación:', data.community_data);
                  // Decodificar base64
                  // const base64Image = btoa(
                  //     new Uint8Array(data.community_data.fotoComunidad.data)
                  //         .reduce((data, byte) => data + String.fromCharCode(byte), '')
                  // );
                  // // Generar URL de la imagen
                  // const imageURL = `data:image/png;base64,${base64Image}`;
                  // setImageURL(imageURL);
                  // console.log(imageURL);

              } else {
                  console.error('Error al cargar SidebarCmt:', data.message);
              }
          } catch (error) {
              console.error('Error al llamar a la API:', error);
          }
      };
      console.log('SidebarCmt desmontado');
      fetchCommunity();
  }, []);
  return (
    <div>
        {community && (

        <div className='Cmt_SideBarContainer'>
            <div className='Cmt_SideBarWrapper'>
                <h4>Descripción de la Comunidad:</h4>
                <p>{community.descripcion}</p>
                <div className='Cmt_DateUserContainer'>
                {/* <strong>Creada en:</strong> <span>01/01/2001</span> */}
                </div>
                <hr/>
                <button>Unirse</button>
            </div>
        </div>
        )}
    </div>
  );
}

export default SideBarCmt;