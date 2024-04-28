import React from 'react';
import './styles/CommunityHeader.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommunityImage from "./img/Com.png"

const CommunityHeader = () => {
  return (
    <div>
        <div className='row CommunityHeader'>
            <div className='col-3'>
                <div className='UserImageContainer d-flex justify-content-center'>
                    <img src={CommunityImage} alt=''/>
                </div>
            </div>
            <div className='col-9 CommunityInfoHeader'>
                <div className='UserInfoContainer'>
                    <h1>Comunidad</h1>  
                </div>
            <div className='CommunityUsersNumber'>
                <h4>Cantidad de miembros:</h4><h4 className='UsersNumber'>#</h4>
            </div>
            </div>
        </div>        
    </div>
    
  );
}

export default CommunityHeader;