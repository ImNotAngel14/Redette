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

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const usernameRegex = /^[a-zA-Z0-9]+$/;
    
        if (!email) {
            setEmailError('Campo obligatorio');
        }
        if (!username) {
            setUsernameError('Campo obligatorio');
        } else if (!usernameRegex.test(username)) {
            setUsernameError('El nombre de usuario solo puede contener letras y números');
        }
        if (!password) {
            setPasswordError('Campo obligatorio');
        } else if (password.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres');
        }
        if (!confirmPassword) {
            setConfirmPasswordError('Campo obligatorio');
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Las contraseñas no coinciden');
        }
    
        if (email && username && password && confirmPassword && usernameRegex.test(username) && password.length >= 8 && password === confirmPassword) {
            setRegistrationSuccess(true);
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
                                    <input type='email' placeholder='Correo' value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {emailError && <p className="errorText" style={{ color: 'red' }}>{emailError}</p>}
                                    <input type='text' placeholder='Nombre de Usuario' value={username} onChange={(e) => setUsername(e.target.value)} />
                                    {usernameError && <p className="errorText" style={{ color: 'red' }}>{usernameError}</p>}
                                    <input type='password' placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
                                    {passwordError && <p className="errorText" style={{ color: 'red' }}>{passwordError}</p>}
                                    <input type='password' placeholder='Confirmar contraseña' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    {confirmPasswordError && <p className="errorText" style={{ color: 'red' }}>{confirmPasswordError}</p>}
                                    <input type='file' id='file' onChange={handleImageChange} />
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
