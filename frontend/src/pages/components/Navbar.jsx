import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Navbar.css';
import UserImage from "./img/userimage.jpeg";

const NavBar = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(UserImage);

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

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements.search.value.trim();
    if (searchQuery) {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <div>
      <Navbar expand="lg" className="Navbar">
        <Container fluid>
          <h3 className='navbarBrand'><a href="/home">Redette</a></h3>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="d-flex justify-content-center w-100">
              <form className="d-flex" onSubmit={handleSearch}>
                <input name="search" className="form-control me-2" type="search" placeholder="Buscar Comunidades" aria-label="Search"/>
                <button className="btn" type="submit"><i className="fa-solid fa-magnifying-glass fa-xl"></i></button>
              </form>
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-end">
              <li className="nav-item">
                <a className="nav-link" href="/home"><i className="fa-solid fa-house fa-2xl"></i></a>
              </li>
              <li className="nav-item">
                <a href='/pfposts'><img className='UserImage' src={profileImage} alt='User Profile'/></a>
              </li>
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
