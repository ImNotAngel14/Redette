import React from 'react';
import './styles/SideBarProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SideBarProfile= () => {
  const handleLogOff = () => {
    localStorage.removeItem('loggedUser');
    window.location.replace("/login");
  }
  return (
    <div>
        <div className='SideBarContainer'>
            <div className='SideBarWrapper'>
              <button onClick={handleLogOff}>Cerrar sesión <i className="fa-solid fa-right-from-bracket"></i></button>
                {/* <hr/>
              <button>Eliminar cuenta</button> */}
            </div>
        </div>
    </div>
  );
}

export default SideBarProfile;