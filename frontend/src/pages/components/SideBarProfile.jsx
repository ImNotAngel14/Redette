import React from 'react';
import './styles/SideBarProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SideBarProfile= () => {
  return (
    <div>
        <div className='SideBarContainer'>
            <div className='SideBarWrapper'>
                <h4>Descripción del perfil:</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac tempus augue, sed vulputate diam. Donec tempus iaculis lacus a vulputate.</p>
                <div className='DateUserContainer'>
                <strong>Se unió en:</strong> <span>01/01/2001</span>
                </div>
                <hr/>
                <button>Cerrar sesión</button>
            </div>
        </div>
    </div>
  );
}

export default SideBarProfile;