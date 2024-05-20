import React, { useState } from 'react';
import './styles/CommentInputContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from 'react-bootstrap/Toast';

const CommentInputContainer= ( {id_post}) => {
    
    const [text, setTextComment] = useState('');
    const [textcommentError, setTextCommentError] = useState('');
    const [CommentError, setCommentError] = useState('');

    const [showToast, setShowToast] = useState(false);

    setTimeout(() => setShowToast(false), 3000);

    const handleSubmitComment = async (event) => {
        event.preventDefault();

        if (!text) {
            setTextCommentError(true);
        } else {
            setTextCommentError(false);
        }

        if (text) {
            try {
                const user = parseInt(localStorage.getItem("loggedUser"));
                const response = await fetch('http://localhost:3000/comment', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({                         
                        text: text,
                        user: user,
                        post: id_post
                    })
                });

                // Actuamos en base a la respuesta de la API
                const data = await response.json();
                if (data.success) {
                    setShowToast(true);
                    setCommentError(false); // Resetear el error
                    window.location.reload();
                } else {
                    setCommentError(true);
                    setShowToast(false);
                    console.error('Error en el comentario:', data.message);
                }
            } catch (error) {
                setCommentError(true);
                setShowToast(false);
                console.error('Error al llamar a la API:', error);
            }
        }
    }

  return (
    <div>
        {/* <div aria-live="polite" aria-atomic="true" position="bottom-start" style={{position: 'relative'}}> */}
            <Toast show={showToast} className='Toast'>
            <Toast.Body>Comentario publicado correctamente</Toast.Body>
            </Toast>
        {/* </div> */}
        <div className='PostInputContainer'>
            <div className='PostInputWrapper'>
                <form onSubmit={handleSubmitComment}>
                    {CommentError && <p className="error-text" style={{ color: 'red' }}>Error al subir comentario</p>}
                    <div className='InputContainer'>
                        <div>
                            <i className="fa-regular fa-pen-to-square fa-xl"></i>
                        </div>
                        <textarea className={`form-control ${textcommentError ? 'error' : ''}`} value={text} onChange={(e) => setTextComment(e.target.value)} rows="1" placeholder='Escribe un comentario...'></textarea>
                    </div>
                    {textcommentError && <p className="error-text" style={{ color: 'red' }}>**Campo obligatorio</p>}
                    <hr/>
                    <div className='AddtoPostContainer'>
                        {/* <div className='FileInputContainer'>
                            <input type='file' id='post_file' className='d-none'/>
                            <label htmlFor='post_file'><i className="fa-regular fa-image fa-lg"></i><span>Adjuntar Multimedia</span></label>
                        </div>
                        <div className='UrlInputContainer'>
                                <label htmlFor='post_url'><i className="fa-solid fa-link"></i></label>
                                <input type='url' className='input_url' id='post_url' placeholder='Adjuntar link'/>
                        </div> */}
                        <div className='CommentButton'>
                                <input type='submit'placeholder='Comentar' className='buttonPostAccept'/>
                        </div>
                    </div>
                </form>
            </div>
        </div>



    </div>
  );
}

export default CommentInputContainer;