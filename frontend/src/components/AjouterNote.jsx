import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
const AjouterNote = () => {
  const [nomDuCours, setNomDuCours] = useState("");
  const [valeurDeNote, setValeurDeNote] = useState("");

  const navigate = useNavigate();
  const {id} = useParams();

  function handleAjouter() {
    fetch(`http://localhost:8080/etudiants/${id}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nomDuCours, valeurDeNote })
    })
    .then(response => response.text())
    .then(data => {
      // console.log(data);
      navigate(`/etudiants/${id}/notes`);
    })
  }


  return (
    <div>
      <h1>Ajouter Note</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        handleAjouter();
      }}>
        <label>Nom du cours
          <br />
          <input 
            required
            placeholder='entrer le nom' 
            type="text" 
            value={nomDuCours}
            onChange={(e) => setNomDuCours(e.target.value)}
          />
        </label>
        <br />
        <label>Valeur de note
          <br />
          <input 
            required
            placeholder='entrer la valeur' 
            type="text" 
            value={valeurDeNote}
            onChange={(e) => setValeurDeNote(e.target.value)}
          />
        </label>
        <br />

        <button type="submit">Ajouter</button>
        
        <Link to={`/etudiants/${id}/notes`}>
          <button className='retour'>Retour</button>
        </Link>
      </form>
    </div>
  )
}

export default AjouterNote