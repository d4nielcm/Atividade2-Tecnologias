import api from '../../api';
import React, { useEffect, useRef, useState } from 'react';
import { textFilter } from 'react-bootstrap-table2-filter';
import Table from '../../components/Table';
import history from '../../services/history';

function Listagem() {
  const [aluno, setAluno] = useState([]);
  const columns = [
    {
      dataField: 'nome',
      text: 'Nome',
      filter: textFilter()
    },
    {
      dataField: 'curso',
      text: 'Curso',
    },
    {
      dataField: 'bolsista',
      text: 'Bolsista',
    },
    {
      dataField: 'matricula',
      text: 'Matricula',
      filter: textFilter()
    },
  ];
  useEffect(()=>{
    async function getAluno() {
      await api.get('/aluno').then((res)=>{
        setAluno(res);
      })
    }
    getAluno();
  }, [])
  
  function handleRedirectToEditPage(item) {
    history.push(`/formulario`);
    console.log(item);
  }

  function handleExcluirProfessional(item) {
    api
      .put(`aluno/delete/${item.id}`)
      .then(() => {
        api.get('/aluno').then((res) => {
          setAluno(res);
        })
      })
      .catch(() => { })
  }
  return (
    <>
      <div>
        <h1 className="titulo-questao">Listagem</h1>
      </div>
      <div className="content">
        <div className="container">
          <Table
            keyField="id"
            data={aluno.data}
            columns={columns}
            extrasColumns={[
              {
                text: 'Editar',
                className: 'btn btn-sm btn-outline-info',
                onClick: handleRedirectToEditPage,
                buttonText: 'Editar',
                keyConditionButtonText: null,
              },
              {
                text: 'Deletar',
                className: 'btn btn-sm btn-outline-danger',
                onClick: handleExcluirProfessional,
                buttonText: 'Deletar',
              }
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default Listagem;
