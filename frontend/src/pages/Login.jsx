import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Register.css'
import FormContainer from './components/FormContainer';



const Register = () => {
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
                            <input type='text' placeholder='Usuario'/>
                            <input type='password' placeholder='Contraseña'/>
                            <input type='submit' value='Entrar' />
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