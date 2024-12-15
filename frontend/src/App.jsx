import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SharedLayout from './SharedLayout.jsx';
import './App.css'
import Etudiants from './components/Etudiants.jsx';
import AjouterEtudiant from './components/AjouterEtudiant.jsx';
import Notes from './components/Notes.jsx';
import AjouterNote from './components/AjouterNote.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Etudiants />}/>
            <Route path="ajouter-etudiant" element={<AjouterEtudiant />}/>
            <Route path="etudiants/:id/notes" element={<Notes />}/>
            <Route path="etudiants/:id/ajouter-note" element={<AjouterNote/>}/>
            <Route path="*" element={<div>404 Not found</div>}></Route>
          </Route>
        </Routes>    
    </BrowserRouter>
  )
}

export default App
