import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'

const Notes = () => {
  const navigate = useNavigate();
  const [Obj, setObj] = useState({
    content: [],
    pageIndex: 0,
    pageSize: 0,
    totalPages: 0,
    totalElements: 0
  });
  const [pageIndex, setPageIndex] = useState(0);
  const {id} = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/etudiants/${id}/notes?page=${pageIndex}&size=5`)
    .then(response => response.json())
    .then(data => setObj(data))

  }, [pageIndex]);

  return (
    <div>
      <h1>Notes de l'étudiant {id}</h1>
      <Link to={`/etudiants/${id}/ajouter-note`}>
        <button>Ajouter</button>
      </Link>
      
      

      <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom du cours</th>
              <th>Valeur de note</th>
            </tr>
          </thead>
          <tbody>
            {Obj.content && Obj.content.map(note => (
              <tr key={note.id}>
                <td>{note.id}</td>
                <td >{note.nomDuCours}</td>
                <td style={
                  note.valeurDeNote > 10
                  ? {backgroundColor: 'lightgreen'}
                  : {backgroundColor: 'rgb(238, 144, 144)'}
                }>{note.valeurDeNote}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='footer'>
          <div style={{fontSize: '0.95rem'}}>
            Total : {Obj.totalElements}
          </div>
          <div>
            <button disabled={pageIndex === 0} className='plus-minus' onClick={() => setPageIndex(pageIndex - 1)}>-</button>

            <span style={{margin: '0 5px'}}>{pageIndex+1} / {Obj.totalPages || 1}</span>

            <button disabled={pageIndex >= Obj.totalPages - 1} className='plus-minus' onClick={() => setPageIndex(pageIndex + 1)}>+</button>
          </div>

        </div>
        <Link style={{marginLeft: '10px'}} to={`/`}>
          retour a la page des etudians
        </Link>

    </div>
  )
}

export default Notes