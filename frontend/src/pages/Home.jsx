import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Home.css'

const Home = () => {
    return (
        <div>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        </div>
                    </div>
                </nav>

            <div className='container'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='row'>
                            <div className='PostInputContainer'>
                                <div className='InputContainer'>
                                    <i class="fa-regular fa-pen-to-square"></i>
                                    <input type='text' placeholder='Comparte algo con el mundo...'/>
                                </div>
                                <hr/>
                                <div className='AddtoPostContainer'>
                                    <div className='FileInputContainer'>
                                        <input type='file' id='post_file'/>
                                        <label htmlFor='post_file'><i className="fa-regular fa-image fa-lg"></i><span>Adjuntar Multimedia</span></label>
                                    </div>
                                    <div className='UrlInputContainer'>
                                        <input type='url' id='post_url'/>
                                        <label htmlFor='post_url'><i class="fa-solid fa-link"></i><span>Adjuntar Link</span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='PostContainer'>
                                <div className='PostWrapper'>
                                    <div className='PostTopic'>
                                        <p>Tema del Post</p>
                                    </div>
                                    <hr/>
                                    <div className='PostCommunityUser'>
                                        <p>Comunidad</p> 
                                        <i class="fa-solid fa-slash"></i>
                                        <p>Usuario</p>
                                    </div>
                                    <div className='PostTitle'>
                                        <h3>Titulo del Post</h3> 
                                    </div>
                                    <div className='PostContent'>
                                        <div className='PostText'>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam veritatis consectetur omnis illum placeat repellendus fuga reiciendis perferendis consequuntur a praesentium, voluptate, velit doloremque ab dolorem in vero qui. Aliquam.</p>
                                        </div>
                                    </div>
                                    <hr/>
                                    <button> <a><i class="fa-solid fa-comments"></i> Comentarios</a> </button>
                                    <button> <i class="fa-solid fa-share"></i> Compartir </button>
                                    <button> <i class="fa-solid fa-bookmark"></i> Guardar</button>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-ligth"><i class="fa-solid fa-angles-up"></i></button>
                                    <button type="button" className="btn btn-ligth" disabled>Votar</button>
                                    <button type="button" className="btn btn-ligth"><i class="fa-solid fa-angles-down"></i></button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='SideBarContainer'>
                            <button> <i class="fa-solid fa-plus fa-lg"></i> Nueva Publicación </button>
                            <button> <a><i class="fa-solid fa-person-circle-plus"></i> Crear Comunidad</a> </button>

                            <button> <a><i class="fa-solid fa-circle-user"></i> Perfil</a> </button>
                            <button> <a><i class="fa-solid fa-people-roof"></i> Tus comunidades</a> </button>
                            <button> <a><i class="fa-regular fa-bookmark"></i> Guardados</a> </button>
                            <hr/>
                            <button>Cerrar sesión</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )


}

export default Home