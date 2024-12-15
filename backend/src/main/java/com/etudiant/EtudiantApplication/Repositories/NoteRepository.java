package com.etudiant.EtudiantApplication.Repositories;

import com.etudiant.EtudiantApplication.Model.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends CrudRepository<Note, Long>
        , PagingAndSortingRepository<Note, Long> {
    Page<Note> findByIdEtudiant(Long idEtudiant, PageRequest pageRequest);
}
