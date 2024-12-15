import React, { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';

const Etudiants = () => {
  const navigate = useNavigate();
  const [Obj, setObj] = useState({
    content: [],
    pageIndex: 0,
    pageSize: 0,
    totalPages: 0,
    totalElements: 0
  });
  const [notes, setNotes] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/etudiants?page=${pageIndex}&size=5`)
    .then(response => response.json())
    .then(async data => {
      setObj(data);
      const arrayNote = await Promise.all(data.content.map(async (etudiant) => {
        const response = await fetch(`http://localhost:8080/etudiants/${etudiant.id}/notes?size=1000`);
        const notesData = await response.json();
        
        if (notesData.content.length === 0) return 11;
        
        const sum = notesData.content.reduce((acc, note) => acc + note.valeurDeNote, 0);
        return sum / notesData.content.length;
      }));
      
      setNotes(arrayNote);
    })
    
  }, [pageIndex]);

  return (
    <div>
      <h1>Etudiants</h1>
      <Link to="/ajouter-etudiant">
        <button>Ajouter</button>
      </Link>

      <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Date de creation</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {Obj.content && Obj.content.map((etudiant, index) => (
              <tr key={etudiant.id}>
                <td>{etudiant.id}</td>
                <td>{etudiant.nom}</td>
                <td>{dayjs(etudiant.dateDeCreation).format('HH:mm - DD/MM/YYYY')}</td>
                <td style={notes[index]> 10
                  ? {backgroundColor: 'lightgreen'}
                  : {backgroundColor: 'rgb(238, 144, 144)'}
                  }><Link to={`/etudiants/${etudiant.id}/notes`}>ici</Link>
                </td>
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

    </div>
  )
}

export default Etudiants