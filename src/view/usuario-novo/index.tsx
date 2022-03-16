import React, {useState} from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from '../../config/firebase';
import app from '../../config/firebase';
import {Link} from 'react-router-dom';
import Navbar from '../../components/navbar';

import './usuario-novo.css';




function NovoUsuario(){

    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [msgTipo, setMsgTipo]= useState<any | null>(null);
    const [msg, setMsg]= useState<any | null>(null);
    const [carregando, setCarregando] = useState(0);

    function cadastrar(){
        setCarregando(1);

        setMsgTipo(null);

        if(!email || !password){
            setMsgTipo('erro')
            setMsg('Você precisa informar o email e senha para fazer o cadastro!')
            return;
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            setCarregando(0);
            setMsgTipo('sucesso') 
         })          
         .catch((error) => {
            setCarregando(0);
            setMsgTipo('erro')
            switch(error.message) 
            {
            case 'Password should be at least 6 characters':
                setMsg('A senha deve ter pelo menos 6 caracteres!');  
                break;
            case 'The email address is already in use by another account.':
                setMsg('Este email já está sendo utilizado por outro usuário!'); 
                break; 
            case 'The email address is badly formatted.':
                setMsg('O formato do seu email é inválido!'); 
                break;
             default:
                setMsg('Não foi possível cadastrar. Tente novamente mais tarde!');
                break; 
            }
        })

    }

    return(
        <>
        <Navbar/>
        <div className="form-cadastro">
            <form className="text-center form-login mx-auto mt-5">
                <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>

                <input  onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email"/>
                <input  onChange={(e) => setPassword(e.target.value)} type="password" className="form-control my-2" placeholder="Senha"/>

                
                {
                carregando ? <div className="spinner-border text-danger" role="status"><span className="sr-only">Loading...</span></div>
                :<button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Cadastrar</button>
                }
                <div className="msg-login text-center my-5">
            {msgTipo === 'sucesso'&& <span><strong>WOW! </strong>Usuário cadastrado com sucesso! &#128526;</span>}
          <br></br>
            {msgTipo === 'erro' && <span><strong>OPS! </strong> {msg} &#128546;</span>}
        </div>
            </form>
        </div>
    </>
    )
}

export default NovoUsuario;