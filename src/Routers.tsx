import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


/*PÁGINAS*/
import Login from './view/login/';
import NovoUsuario from './view/usuario-novo';


function Routers() {
  return (
    <Router>
        <Route path='/novousuario' element={NovoUsuario} />
        <Route path='/' element={Login} />
    </Router> 
  );
}

export default Routers;