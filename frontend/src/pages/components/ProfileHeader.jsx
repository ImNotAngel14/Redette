import React from 'react';
import './styles/ProfileHeader.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserImage from "./img/userimage.jpeg";

const ProfileHeader = ({ username, profileImage }) => {
    return (
        <div>
            <div className='row ProfileHeader'>
                <div className='col-3'>
                    <div className='UserImageContainer d-flex justify-content-center'>
                    {profileImage && <img src={profileImage} alt='Foto de perfil' />}
                    </div>
                </div>
                <div className='col-9 UserInfoHeader'>
                    <div className='UserInfoContainer'>
                        <h1>{username}</h1>  
                    </div>
                </div>
                <hr/>
                <div className='col-12 d-flex d-flex justify-content-evenly'>
                    <div className=' col-6 SpanContainer d-flex justify-content-center'>
                        <a href='/pfposts' className='PostsLink'>Publicaciones</a>
                    </div>
                    <div className='col-6 SpanContainer d-flex justify-content-center'>
                        <a href='/pfcomm' className='CommunityLink'>Comunidades</a>
                    </div>
                    {/* <div className='col-3 SpanContainer d-flex justify-content-center'>
                        <a href='/pfsaved' className='SavedLink'>Guardados</a>  
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;
