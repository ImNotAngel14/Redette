import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Register.css';
import FormContainer from './components/FormContainer';
import '@fortawesome/fontawesome-free/css/all.css';
import Login from './Login';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registrationError, setRegistrationError] = useState('');


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        
        event.preventDefault();

        const usernameRegex = /^[a-zA-Z0-9]+$/;
    
        if (!email) {
            setEmailError('Campo obligatorio');
        }else {
            setEmailError('');
        }
        if (!username) {
            setUsernameError('Campo obligatorio');
        } else if (!usernameRegex.test(username)) {
            setUsernameError('El nombre de usuario solo puede contener letras y números');
        }else {
            setUsernameError('');
        }

        if (!password) {
            setPasswordError('Campo obligatorio');
        } else if (password.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres');
        }else {
            setPasswordError('');
        }

        if (!confirmPassword) {
            setConfirmPasswordError('Campo obligatorio');
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Las contraseñas no coinciden');
        } else {
            setConfirmPasswordError('');
        }
        
        if (email && username && password && confirmPassword && usernameRegex.test(username) && password.length >= 8 && password === confirmPassword) {
            
            const formData = {
                email,
                username,
                password,
                profileImage
            };
            console.log("Datos del formulario:", formData);

            let pImage = profileImage.substring(22);
            // peticion backend
            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, username, password, pImage })
                });

                // Actuamos en base a la respuesta de la API
                const data = await response.json();
                if(data.success)
                {
                    setRegistrationSuccess(true);
                    setRegistrationError('');
                    window.location.replace("/login");
                }
                else
                {

                    // Mostrar mensaje de error del registro
                    // ...
                    setRegistrationError('Registro fallido, credenciales invalidas');
                    
                }
            } catch (error) {
                console.error('Error al llamar a la API:', error);
                setRegistrationError('Error en el servidor, intente nuevamente más tarde.');
            }
            // peticion backend
            
            
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
                            <h3>Crea una cuenta</h3>
                            {registrationSuccess ? (
                                <p className="successMessage">¡Registro exitoso!</p>
                            ) : (
                            <div className='formWrapper'>
                                <form onSubmit={handleSubmit}>
                                    <input type='email' placeholder='Correo' value={email} name='email' onChange={(e) => setEmail(e.target.value)} />
                                    {emailError && <p className="errorText" style={{ color: 'red' }}>{emailError}</p>}
                                    <input type='text' placeholder='Nombre de Usuario' value={username} name='username' onChange={(e) => setUsername(e.target.value)} />
                                    {usernameError && <p className="errorText" style={{ color: 'red' }}>{usernameError}</p>}
                                    <input type='password' placeholder='Contraseña' value={password} name='password' onChange={(e) => setPassword(e.target.value)} />
                                    {passwordError && <p className="errorText" style={{ color: 'red' }}>{passwordError}</p>}
                                    <input type='password' placeholder='Confirmar contraseña' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    {confirmPasswordError && <p className="errorText" style={{ color: 'red' }}>{confirmPasswordError}</p>}
                                    <input type='file' id='file' onChange={handleImageChange} name='profileImage' />
                                    <label htmlFor='file'>
                                        <i className="fa-regular fa-image fa-lg"></i>
                                        <span>Foto de perfil</span>
                                    </label>
                                    {profileImage && (
                                        <div>
                                            <img src={profileImage} alt="Foto de perfil" style={{ width: '200px', height: '160px' }} />
                                            <br/>
                                            <br/>
                                        </div>
                                    )}
                                    <input type='submit' value='Registrate' />
                                </form>
                                {registrationError && <p className="errorText" style={{ color: 'red' }}>{registrationError}</p>}
                                <p>¿Ya tienes una cuenta?</p> <Link to="/login">Inicia sesión</Link>
                            </div>
                             )}
                        </FormContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
