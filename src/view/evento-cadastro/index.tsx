import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import '../evento-cadastro/evento-cadastro.css';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar';
import { initializeApp } from "firebase/app";
import { getFirestore, collection} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getStorage, ref} from "firebase/storage";
import { getDatabase } from 'firebase/database';
import 'firebase/firestore';


function EventoCadastro(): JSX.Element {

    const [msgTipo, setMsgTipo] = useState('');
    const [foto, setFoto] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();    
    const [fotoAtual, setFotoAtual] = useState();    
    const [fotoNova, setFotoNova] = useState();    
    const [usuarioEmail, setUsuarioEmail] = useState();
    


    const storage = getStorage();
    const db = getFirestore();

    setUsuarioEmail(useSelector((state:any) => state.usuarioEmail));

    function cadastrar() {
        storage.ref('imagens/${foto.name}').put(foto).then(() => {
            db.collection('eventos').add({
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
            })
        }).catch((erro: any) => {
            setMsgTipo('Não foi possível cadastrar o evento!');
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
                    <input type="text" className="form-control" />
                </div>

                <div className="form-group mb-4">
                    <label>Tipo de Evento:</label>
                    <select className="form-control">
                        <option disabled selected>-- Selecione um tipo --</option>
                        <option>Festa</option>
                        <option>Teatro</option>
                        <option>Show</option>
                        <option>Evento</option>
                    </select>
                </div>
                <div className="form-group mb-4">
                    <label>Descrição do Evento:</label>
                    <textarea className="form-control" rows="3" />
                </div>

                <div className="form-group row mb-4">
                    <div className="col-6">
                        <label>Data:</label>
                        <input type="date" className="form-control"/>
                    </div>
                    <div className="col-6">
                        <label>Hora:</label>
                        <input type="time" className="form-control"/>
                    </div>
                </div>

                <div className="form-group">
                    <label>Upload da Foto:</label>
                    <input type="file" className="form-control" />
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


