import React from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Register.css'
import FormContainer from './components/FormContainer';
import '@fortawesome/fontawesome-free/css/all.css';
import Login from './Login'

const Register = () => {
    return (
        <div className='R_body'>
            <div className='header'>
                <h2>Redette</h2>
            </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className='col-4'>
                            <FormContainer>
                                <h3>Crea una cuenta</h3>
                                <div className='formWrapper'>
                                    <form>
                                        <input type='email' placeholder='Correo'/>
                                        <input type='text' placeholder='Nombre de Usuario'/>
                                        <input type='password' placeholder='Contraseña'/>
                                        <input type='password' placeholder='Confirmar contraseña'/>
                                        <input type='file' id='file'/>
                                        <label htmlFor='file'><i className="fa-regular fa-image fa-lg"></i><span>Foto de perfil</span></label>
                                        <input type='submit' value='Registrate' />
                                    </form>
                                    <p>¿Ya tienes una cuenta?</p> <Link to="/login">Inicia sesión</Link>
                                </div>
                            </FormContainer>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Register