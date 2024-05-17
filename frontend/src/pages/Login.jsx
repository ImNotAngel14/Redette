import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Register.css'
import FormContainer from './components/FormContainer';

const Register = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    if (isLoggedIn) {
        window.location.replace("/home");
    }
    // Valores de las credenciales.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Ejecutamos la autenticación del usuario conectandonos a la API.
    const handleSubmit = async (event) => 
    {

        // Por precaución evitamos que se ejecute el submit predeterminado y primero obtengamos la respuesta.
        event.preventDefault();

        // Llamar a la API de Node.js
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            // Actuamos en base a la respuesta de la API
            const data = await response.json();
            const wrong_auth_msg = document.getElementById('id_wrong_auth_msg');
            if(data.auth)
            {
                // Ocultamos el mensaje de credenciales inválidas.
                wrong_auth_msg.setAttribute('hidden', 'true');
                setLoggedIn(true);
            }
            else
            {
                // Mostrar mensaje de error en credenciales.
                wrong_auth_msg.removeAttribute('hidden');
            }
        } catch (error) {
            console.error('Error al llamar a la API:', error);
        }
    };

    return (
        <div className='R_body'>
            <div className='header'>
                <h2>Redette</h2>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className='col-4'>
                        <FormContainer>
                            <h3>Inicia Sesión</h3>
                            <p id="id_wrong_auth_msg" style={{color:'red'}} hidden >Credenciales inválidas.</p>
                            <div className='formWrapper'>
                                <form>
                                    <input id="id_username" type='text' name='username' placeholder='Usuario' value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off"/>
                                    <input id="id_password" type='password' name='password' placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off"/>
                                    <input id="id_submit" type='submit' value='Entrar' onClick={handleSubmit} />
                                </form>
                                <p>¿Aún no tienes una cuenta?</p> <Link to="/register">Regístrate aquí</Link>             
                            </div>
                        </FormContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register