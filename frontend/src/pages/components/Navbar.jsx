import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Navbar.css';
import UserImage from "./img/userimage.jpeg"

const NavBar = () => {

  return (
    <div>
    <Navbar expand="lg" className="Navbar">
      <Container fluid>
        <h3 className='navbarBrand' href="#home">Redette</h3>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <div className="d-flex justify-content-center w-100">
            <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Buscar Comunidades" aria-label="Search"/>
                <button className="btn" type="submit"><i className="fa-solid fa-magnifying-glass fa-xl"></i></button>
            </form>
        </div>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-end">
            <li className="nav-item">
            <a className="nav-link" href="/home"><i className="fa-solid fa-house fa-2xl"></i></a>
            </li>
            <li className="nav-item">
            <a href='/pfposts'><img className='UserImage' src={UserImage} alt=''/></a>
            </li>
        </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default NavBar;