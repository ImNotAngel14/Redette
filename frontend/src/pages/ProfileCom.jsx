import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/ProfileCom.css';
import NavBar from './components/Navbar.jsx';
import ProfileHeader from "./components/ProfileHeader.jsx";
import SideBarProfile from "./components/SideBarProfile.jsx";
import CommunityProfile from "./components/CommunityProfile.jsx";

const ProfileCom = () => {
    const [userCommunities, setUserCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    // Obtener el ID del usuario desde localStorage
    const userId = parseInt(localStorage.getItem('loggedUser'));

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (data.success && data.user_data) {
                    setUsername(data.user_data.usuario); // Aquí obtienes el nombre del usuario
                    // Obtener y convertir la imagen de perfil a base64
                    if (data.user_data.fotoPerfil) {
                        const base64Image = btoa(
                            new Uint8Array(data.user_data.fotoPerfil.data)
                                .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        );
                        setProfileImage(`data:image/png;base64,${base64Image}`);
                    }
                }
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
            }
        };
        fetchUserData();
    }, [userId]);

    useEffect(() => {
        const fetchUserCommunities = async () => {
            try {
                var value = localStorage.getItem('loggedUser');
                const response = await fetch(`http://localhost:3000/member/${value}`, {
                    method: 'GET', // Aquí deberías pasar el ID del usuario
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (data.success && data.userCommunityList.length > 0) {
                    setUserCommunities(data.userCommunityList);
                } else {
                    setUserCommunities([]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error al llamar a la API:', error);
                setLoading(false);
            }
        };
        fetchUserCommunities();
    }, []);

    return (
        <div>
            <NavBar />
            <div className='container-fluid ContentPage'>
                <ProfileHeader username={username} profileImage={profileImage} />
                <div className='row'>
                    <div className='col-lg-8 col-md-8'>
                        {loading ? (
                            <p>Cargando comunidades...</p>
                        ) : userCommunities.length > 0 ? (
                            userCommunities.map((community) => (
                                <CommunityProfile
                                    key={community.id}
                                    community={community.comunidad}
                                />
                            ))
                        ) : (
                            <p style={{ marginLeft: '4.5rem', marginBottom: '1rem' }}>No estás en ninguna comunidad.</p>
                        )}
                    </div>
                    <div className="col-lg-1  d-lg-block d-none">
                        {/* Espacio entre las columnas visible solo en pantallas LG o más grandes */}
                    </div>
                    <div className='col-lg-3 col-md-4 order-last'>
                        <SideBarProfile />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCom;
