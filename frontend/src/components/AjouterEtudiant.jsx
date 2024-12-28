import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AjouterEtudiant = () => {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  function handleAjouter() {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/etudiants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nom: name })
    })
    .then(response => response.text())
    .then(data => {
      // console.log(data);
      navigate('/');
    })
  }


  return (
    <div>
      <h1>Ajouter Etudiant</h1>
      <form action={import.meta.env.VITE_BACKEND_URL+'/etudiants'}
      method='POST'
      onSubmit={(event) => {
        event.preventDefault();
        handleAjouter();
      }}>
        <label htmlFor="nom">Nom</label>
        <br />
        <input 
          required
          placeholder='entrer le nom' 
          type="text" 
          name="nom" 
          id='nom'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        
        <button type="submit">Ajouter</button>
        
        <Link to="/">
          <button className='retour'>Retour</button>
        </Link>
      </form>
    </div>
  )
}

export default AjouterEtudiant