import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from '../src/store';
import { Provider } from 'react-redux';


/*PÁGINAS*/
import NovoUsuario from './view/usuario-novo/';
import Home from './view/home/';
import Login from './view/login';
import UsuarioRecuperarSenha from './view/usuario-recuperar-senha';
import EventoCadastro from './view/evento-cadastro';

function Routers() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/novousuario' element={<NovoUsuario/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/usuariorecuperarsenha' element={<UsuarioRecuperarSenha/>} />
          <Route path='/eventocadastro' element={<EventoCadastro/>} />
        </Routes>
      </BrowserRouter> 
    </Provider>
  );
}

export default Routers;