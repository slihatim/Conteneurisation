package com.etudiant.EtudiantApplication.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomDuCours;
    private Double valeurDeNote;
    private Long idEtudiant;

    public Note() {
    }

    public Note(Long id, String nomDuCours, Double valeurDeNote, Long idEtudiant) {
        this.id = id;
        this.nomDuCours = nomDuCours;
        this.valeurDeNote = valeurDeNote;
        this.idEtudiant = idEtudiant;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomDuCours() {
        return nomDuCours;
    }

    public void setNomDuCours(String nomDuCours) {
        this.nomDuCours = nomDuCours;
    }

    public Double getValeurDeNote() {
        return valeurDeNote;
    }

    public void setValeurDeNote(Double valeurDeNote) {
        this.valeurDeNote = valeurDeNote;
    }

    public Long getIdEtudiant() {
        return idEtudiant;
    }

    public void setIdEtudiant(Long idEtudiant) {
        this.idEtudiant = idEtudiant;
    }

    @Override
    public String toString() {
        return "Note{" +
                "id=" + id +
                ", nomDuCours='" + nomDuCours + '\'' +
                ", valeurDeNote=" + valeurDeNote +
                ", idEtudiant=" + idEtudiant +
                '}';
    }
}
