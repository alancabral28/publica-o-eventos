import React from 'react';
import '../navbar/navbar.css';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

function Navbar() {

    const dispatch=useDispatch();
    return(
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <i className="fa-regular fa-face-smile text-white fa-2x"></i>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa-solid fa-bars text-white"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" aria-current="page" to="/">Home</Link></li>

                        {
                            useSelector((state:any) => state.usuarioLogado) > 0 ?
                            <>
                               
                                <li className="nav-item"><Link className="nav-link" aria-current="page" to="eventocadastro">Publicar Evento</Link></li>
                                <li className="nav-item"><Link className="nav-link" aria-current="page" to="">Meus Eventos</Link></li>
                                <li className="nav-item"><Link className="nav-link" aria-current="page" onClick={() => dispatch({ type: 'LOG_OUT' })} to={''}>Sair</Link></li>   
                            </>
                            :
                            <>
                                <li className="nav-item"><Link className="nav-link" aria-current="page" to="/novousuario">Cadastrar</Link></li>
                                <li className="nav-item"><Link className="nav-link" aria-current="page" to="/Login">Login</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;