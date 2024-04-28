import React from 'react';
import './styles/SideBarCmt.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SideBarCmt= () => {
  return (
    <div>
        <div className='Cmt_SideBarContainer'>
            <div className='Cmt_SideBarWrapper'>
                <h4>Descripción de la Comunidad:</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac tempus augue, sed vulputate diam. Donec tempus iaculis lacus a vulputate.</p>
                <div className='Cmt_DateUserContainer'>
                <strong>Creada en:</strong> <span>01/01/2001</span>
                </div>
                <hr/>
                <button>Unirse</button>
            </div>
        </div>
    </div>
  );
}

export default SideBarCmt;