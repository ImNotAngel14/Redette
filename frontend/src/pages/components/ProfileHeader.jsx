import React from 'react';
import './styles/ProfileHeader.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserImage from "./img/userimage.jpeg"

const ProfileHeader= () => {
  return (
    <div>
        <div className='row ProfileHeader'>
            <div className='col-3'>
                <div className='UserImageContainer d-flex justify-content-center'>
                    <img src={UserImage} alt=''/>
                </div>
            </div>
            <div className='col-9 UserInfoHeader'>
                <div className='UserInfoContainer'>
                    <h1>Usuario</h1>  
                </div>
            <div className='UserCommunityNumber'>
                <h4>Comunidades a las que perteneces:</h4><h4 className='CommunityNumber'>#</h4>
            </div>
            </div>
            <hr/>
            <div className='col-12 d-flex d-flex justify-content-evenly'>
                <div className=' col-3 SpanContainer d-flex justify-content-center'>
                    <a href='/pfposts' className='PostsLink'>Publicaciones</a>
                </div>
                <div className='col-3 SpanContainer d-flex justify-content-center'>
                    <a href='/pfcomm' className='CommunityLink'>Comunidades</a>
                </div>
                <div className='col-3 SpanContainer d-flex justify-content-center'>
                    <a href='/pfsaved' className='SavedLink'>Guardados</a>  
                </div>
            </div>
        </div>
    </div>
    
  );
}

export default ProfileHeader;