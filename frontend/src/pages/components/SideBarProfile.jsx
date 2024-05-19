import React from 'react';
import './styles/SideBarProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SideBarProfile= () => {
  return (
    <div>
        <div className='SideBarContainer'>
            <div className='SideBarWrapper'>
              <button>Cerrar sesión</button>
                <hr/>
              <button>Eliminar cuenta</button>
            </div>
        </div>
    </div>
  );
}

export default SideBarProfile;