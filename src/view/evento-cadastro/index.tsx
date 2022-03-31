import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import '../evento-cadastro/evento-cadastro.css';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getStorage, ref, updateMetadata, uploadBytes, uploadString} from "firebase/storage";
import { getDatabase } from 'firebase/database';
import 'firebase/firestore';
import app from '../../config/firebase';



function EventoCadastro(): JSX.Element {

    const [msgTipo, setMsgTipo] = useState('');
    const [foto, setFoto] = useState('');
    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('');
    const [detalhes, setDetalhes] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');    
    const [fotoAtual, setFotoAtual] = useState();    
    const [fotoNova, setFotoNova] = useState();    
    const [usuarioEmail, setUsuarioEmail] = useState();
    
    

    
    const storage = getStorage(app);
    const db = getFirestore(app);
    const storageRef = ref(storage);

  
    /* Função cadastrar evento */

    function cadastrar() {
        setMsgTipo('');
        const imagesRef = ref(storage, 'imagens/${foto.name}');
        uploadString(storageRef, foto).then(() => {
            try {
                const docRef =  addDoc(collection(db, "eventos"), {
                    titulo: titulo,
                    tipo: tipo,
                    detalhes: detalhes,
                    data: data,
                    hora: hora,
                    usuario:usuarioEmail,
                    visualizacoes: 0,
                    foto:foto,
                    publico:1,
                    criacao:new Date ()

                }).then (() => {
                    setMsgTipo('sucesso');
                })

              } catch (erro) {
                setMsgTipo('erro');
            }
        })
    }

    return (
        <>
        <Navbar />
        <div className="col-12" mt-5>
            <div className="row">
                <h3 className="mt-5 text-center font-weight-bold">Novo Evento</h3>
            </div>

            <form>
                <div className="form-group mb-4">
                    <label>Título:</label>
                    <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control" />
                </div>

                <div className="form-group mb-4">
                    <label>Tipo de Evento:</label>
                    <select onChange={(e) => setTipo(e.target.value)} className="form-control">
                        <option disabled selected>-- Selecione um tipo --</option>
                        <option>Festa</option>
                        <option>Teatro</option>
                        <option>Show</option>
                        <option>Evento</option>
                    </select>
                </div>
                <div className="form-group mb-4">
                    <label>Descrição do Evento:</label>
                    <textarea onChange={(e) => setDetalhes(e.target.value)} className="form-control" rows="3"/>
                </div>

                <div className="form-group row mb-4">
                    <div className="col-6">
                        <label>Data:</label>
                        <input onChange={(e) => setData(e.target.value)} type="date" className="form-control"/>
                    </div>
                    <div className="col-6">
                        <label>Hora:</label>
                        <input  onChange={(e) => setHora(e.target.value)}type="time" className="form-control"/>
                    </div>
                </div>

                <div className="form-group">
                    <label>Upload da Foto:</label>
                    <input onChange={(e) => setFoto(e.target.files[0])} type="file" className="form-control" />
                </div>
                <div className="row">
                    <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Publicar Evento</button>
                </div>
            </form>
            <div className="msg-login text-center mt-2">
            {msgTipo === 'sucesso' && <span><strong>WOW!</strong>Evento Publicado! &#128526;</span>}
          <br></br>
            {msgTipo === 'erro' && <span><strong>OPS! </strong>Não foi possível publicar o evento! &#128546;</span>}
        </div>
        </div>
        </>
    )
}

export default EventoCadastro;