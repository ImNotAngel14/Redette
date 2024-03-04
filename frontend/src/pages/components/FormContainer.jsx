import React from 'react';
import './styles/FormContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const FormContainer = ({ children }) => {
    return (
            <div className='formContainer'>
                {children}
            </div>
    );
};

export default FormContainer;
