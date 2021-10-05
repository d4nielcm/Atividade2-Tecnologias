import api from '../../api';
import React, { useRef, useState } from 'react';
import { Col, Row, Container, Alert } from 'react-bootstrap';
import { differenceInYears } from 'date-fns';

function Formulario() {
  const nome = useRef(null);
  const matricula = useRef(null);
  const nascimento = useRef(null);
  const ingresso = useRef(null);
  const bolsista = useRef(null);
  const idade = useRef(null);
  const curso = useRef(null);
  const [sexo, setSexo] = useState('');
  const [disciplinas] = useState([]);
  const [cursoSelecionado, setCurso] = useState(null);
  const [erro, setErro] = useState(false);
  const [resultado, setResultado] = useState(false);

  let ad = [];

  return (
    <>
      <div>
        <h1 className="titulo-questao">Fomulário</h1>
      </div>
      <form onSubmit={
        (e) => {
          ad = [...new Set(disciplinas)];
          ad = ad.map((e, i) => {
            if (e.checked) return e.id;
            return null;
          });
          ad = ad.filter(n => n);
          e.preventDefault();
          if (
              !!cursoSelecionado && 
              nome.current.value && 
              sexo && 
              matricula.current.value && 
              nascimento.current.value &&
              ingresso.current.value) {
            api.post('/aluno', {
              curso: cursoSelecionado,
              sexo: sexo ? sexo : '',
              nome: nome.current.value ? nome.current.value : '',
              matricula: matricula.current.value ? matricula.current.value : '',
              ano_de_ingresso: ingresso.current.value ? ingresso.current.value : '',
              bolsista: bolsista.current.value ? bolsista.current.value : '',
              data_de_nascimento: nascimento.current.value ? nascimento.current.value : '',
              disciplinas_cursadas: ad
            }).then((result) => {
              setResultado(true);
              setErro(false);
            });
          } else {
            setErro(true);
          }
        }}>
        <Container>
          <Row>
            <Col className="col-md-6">
              <label htmlFor="nome" className="label-num">Nome</label>
              <input className="form-control" ref={nome} type="text" id="nome" name="nome" />
              </Col>
            <Col className="col-md-4">
              <label htmlFor="nascimento" className="label-num">Data de nascimento</label>
              <input className="form-control" onKeyUp={(e) => {
                  if(e.currentTarget.value.length === 10){
                    const hoje = new Date();                    
                    idade.current.value = differenceInYears(
                      new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()),
                      new Date(e.currentTarget.value.split('/')[2], e.currentTarget.value.split('/')[1], e.currentTarget.value.split('/')[0])
                    );
                  } else {
                    var v = e.currentTarget.value;
                    if (v.match(/^\d{2}$/) !== null) {
                      e.currentTarget.value = v + '/';
                    } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
                      e.currentTarget.value = v + '/';
                    }
                  }
                }}
                maxLength="10" placeholder="dd/mm/aaaa" ref={nascimento} type="text" id="nascimento" name="nascimento" />
            </Col>
            <Col className="col-md-2">
              <label htmlFor="idade" className="label-num">Idade</label>
              <input disabled={true} ref={idade} className="form-control" type="text" id="idade" name="idade" />
            </Col>
          </Row>
          <Row>
            <Col className="col-md-5">
              <label htmlFor="matricula" className="label-num">Matrícula</label>
              <input className="form-control" ref={matricula} type="text" id="matricula" name="matricula" onKeyUp={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/[^\d]/, '')
              }}/>
            </Col>
            <Col className="col-md-3">
              <label htmlFor="sexo" className="label-num">Sexo</label>
              <div className="divEspecialidade" onChange={(e) => {
                setSexo(e.target.id);
              }}
              style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "space-evenly"
              }}>
                <label htmlFor="masculino">
                  <input id="masculino"
                  type="radio"
                  name="especialidade" />
                  Masculino
                </label>
                <label htmlFor="feminino">
                  <input id="feminino"
                    type="radio"
                    name="especialidade" />
                  Feminino
                </label>
              </div>  
            </Col>
            <Col className="col-md-4">
              <label htmlFor="ingresso" className="label-num">Ano de ingresso</label>
              <input className="form-control" ref={ingresso} type="text" id="ingresso" name="ingresso" onKeyUp={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/[^\d]/, '')
              }} />
            </Col>
          </Row>
          <Row>
            <Col className="col-md-6">
              <label htmlFor="bolsista" className="label-num">Bolsista</label>
              <select aria-label="Bolsista" ref={bolsista} className="form-control" defaultValue="particular">
                <option value="prouni">PROUNI</option>
                <option value="fies">FIES</option>
                <option value="particular">Particular</option>
              </select>
            </Col>
            <Col className="col-md-6">
              <label htmlFor="curso" className="label-num">Curso</label>
              <select aria-label="Curso" ref={curso} className="form-control" defaultValue="outro" onChange={(e) => {
                setCurso(e.target.selectedOptions[0].innerHTML);
                setErro(false);
                disciplinas.length = 0;
              }}>
                <option value="direito">Direito</option>
                <option value="computacao">Computação</option>
                <option value="outro">Outro</option>
              </select>
            </Col>
          </Row>
          <Row>
            {(cursoSelecionado === "Direito" || cursoSelecionado === "Computação") && (<>
            <Col className="col-md-6" style={{
              marginTop: "20px",
              borderRadius: "15px",
              marginRight: '20px'
            }}>
              <label htmlFor="disciplinas[]" className="label-num">Disciplinas Cursadas</label>
              <div className="divAdicionais" onChange={(e) => {
                  disciplinas.push(e.target);
              }}>
                <Row style={{
                  flexDirection: "column"
                }}>
                {cursoSelecionado === "Direito" && (
                  <>
                    <div className='diciplina'>
                    <input id="direito_civil"
                      className="checkbox-btn"
                      type="checkbox"
                      name="disciplinas[]" />
                    <label htmlFor="direito_civil" className="checkbox-label">Direito Civil</label>
                    </div>
                    <div className='diciplina'>
                    <input id="direito_penal"
                      className="checkbox-btn"
                      type="checkbox"
                      name="disciplinas[]" />
                    <label htmlFor="direito_penal" className="checkbox-label">Direito Penal</label>
                    </div>
                  </>)
                }
                {cursoSelecionado === "Computação" && (
                  <>
                  <div className='diciplina'>
                    <input id="inteligencia_artificial"
                      className="checkbox-btn"
                      type="checkbox"
                      name="disciplinas[]" />
                    <label htmlFor="inteligencia_artificial" className="checkbox-label">Inteligência Artificial</label>
                    </div>
                    <div className='diciplina'>
                    <input id="banco_de_dados"
                      className="checkbox-btn"
                      type="checkbox"
                      name="disciplinas[]" />
                    <label htmlFor="banco_de_dados" className="checkbox-label">Banco de dados</label>
                    </div>                    
                  </>)
                }
                </Row>
              </div>
            </Col>
            </>)}
            <Col className="col-md-4" style={{
              display: "flex",
              alignItems: "flex-end",
              
            }}>
              <button type='submit' className="btn mt-2 btn-success">Enviar</button>
            </Col>
          </Row>
          <Container style={{ marginTop: '20px' }}>
            <Row>
              {erro &&
                <>
                  <Alert variant="danger">
                    <h1 className="erro">Preencha todos os campos</h1>
                  </Alert>
                </>
              }
              {resultado &&
                <>
                  <Alert variant="success">
                    <h1 className="resultado">Aluno cadastrado com sucesso</h1>
                  </Alert>
                </>
              }
            </Row>
          </Container>
        </Container>
      </form>
    </>
  );
}

export default Formulario;
