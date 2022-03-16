import React, {useState} from 'react';
import '../home/home.css';
import {Link} from 'react-router-dom';
import Navbar from '../../components/navbar';
import {useSelector} from 'react-redux';
function Home(){
    return(
        <>
        <Navbar/>
        <h1>{useSelector((state:any) => state.usuarioEmail)}</h1>
        <h1>Logado:{useSelector((state:any) => state.usuarioLogado)}</h1>
        </>
    )
}

export default Home;