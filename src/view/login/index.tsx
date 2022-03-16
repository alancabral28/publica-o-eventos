import React, {useState} from 'react';
import '../login/login.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from '../../config/firebase';
import app from '../../config/firebase';
import {Link, Navigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

  

function Login(){

 
  
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [msgTipo, setMsgTipo] = useState('');

  const dispatch = useDispatch();

  function logar () {

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
    setMsgTipo('sucesso')
    setTimeout(() => {
      dispatch({type:'LOG_IN', usuarioEmail:email});
    },2000);
    })
    .catch(() => {
      setMsgTipo('erro')
    });
  }


  return(
    <div className="login-content d-flex align-items-center">

      {
        useSelector((state:any) => state.usuarioLogado) > 0 ? <Navigate to='/' /> : null
      }

      <form className="mx-auto">
        <div className="text-center mb-4">
        <i className="fa-regular fa-face-smile text-white fa-5x"></i>
          <h1 className="h3 mx-auto fw-normal text-white font-weigt-bold">Login</h1>
        </div>
        <div className="form-floating">
          <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control floatingInput my-2 imput-form" placeholder="name@example.com" />
          <label className="floatingInput">Email</label>
        </div>
        <div className="form-floating">
          <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control floatingPassword my-2 imput-form" placeholder="Password" />
          <label className="floatingPassword">Senha</label>
        </div>
        <button onClick={logar} className="w-100 btn btn-lg btn-primary btn-login" type="button">Logar</button>
        <div className="msg-login text-white text-center my-5">
            {msgTipo === 'sucesso' && <span><strong>WOW! </strong>Você esta conectado! &#128526;</span>}
          <br></br>
            {msgTipo === 'erro' && <span><strong>OPS! </strong>Verifique se a senha ou usuário estão corretos! &#128546;</span>}
        </div>
        <div className="options-login mt-5 text-center">
          <Link to='/usuariorecuperarsenha' className="mx-2">Recuperar Senha</Link>
          <span className="text-white">&#9733;</span>
          <Link to='/novousuario' className="mx-2">Quero Cadastrar</Link>
        </div>
      </form>
    </div>
  )
}

export default Login;