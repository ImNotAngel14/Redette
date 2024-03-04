import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Register.css'
import FormContainer from './components/FormContainer';



const Register = () => {

    // Valores de las credenciales.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Ejecutamos la autenticación del usuario conectandonos a la API.
    const handleSubmit = async (event) => {

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
            if(data.auth)
            {
                alert("Inicio de sesión exitoso.");

                // Aqui deberiamos redirigir la página al home.
                // ...
            }
            else
            {
                alert("Usuario o contraseña incorrectos.");
                
                // Mostrar mensaje de error en credenciales.
                // ...
            }
        } catch (error) {
            console.error('Error al llamar a la API:', error);
        }
    };
    return (
        <div>
            <div className='header'>
                <h2>Redette</h2>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className='col-12'>
                        <FormContainer>
                        <h3>Inicia Sesión</h3>
                        <div className='formWrapper'>
                            <form>
                            <input id="id_username" type='text' name='username' placeholder='Usuario' value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <input id="id_password" type='password' name='password' placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <input id="id_submit" type='submit' value='Entrar' onClick={handleSubmit}/>
                            </form>
                            <p>¿Aún no tienes una cuenta?</p> <a href='Register.jsx'>Registrate aquí</a>
                        </div>
                        </FormContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register