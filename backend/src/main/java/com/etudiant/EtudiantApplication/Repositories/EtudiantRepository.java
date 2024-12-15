package com.etudiant.EtudiantApplication.Repositories;

import com.etudiant.EtudiantApplication.Model.Etudiant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EtudiantRepository extends CrudRepository<Etudiant, Long>
        , PagingAndSortingRepository<Etudiant, Long> {

}
