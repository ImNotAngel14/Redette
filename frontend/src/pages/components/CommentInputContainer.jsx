import React from 'react';
import './styles/CommentInputContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommentInputContainer= () => {
  return (
    <div>
        <div className='PostInputContainer'>
            <div className='PostInputWrapper'>
                <div className='InputContainer'>
                    <i className="fa-regular fa-pen-to-square fa-xl"></i>
                    <input type='text' placeholder='Escribe un comentario...'/>
                </div>
                <hr/>
                <div className='AddtoPostContainer'>
                    <div className='FileInputContainer'>
                        <input type='file' id='post_file' className='d-none'/>
                        <label htmlFor='post_file'><i className="fa-regular fa-image fa-lg"></i><span>Adjuntar Multimedia</span></label>
                    </div>
                    <div className='UrlInputContainer'>
                            <label htmlFor='post_url'><i className="fa-solid fa-link"></i></label>
                            <input type='url' className='input_url' id='post_url' placeholder='Adjuntar link'/>
                    </div>
                    <div className='CommentButton'>
                            <input type='submit'placeholder='Comentar' className='buttonPostAccept'/>
                    </div>
                </div>
            </div>
        </div>

    </div>
  );
}

export default CommentInputContainer;