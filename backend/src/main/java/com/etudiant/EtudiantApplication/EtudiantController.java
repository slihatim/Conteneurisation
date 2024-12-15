package com.etudiant.EtudiantApplication;

import com.etudiant.EtudiantApplication.Model.Etudiant;
import com.etudiant.EtudiantApplication.Model.Note;
import com.etudiant.EtudiantApplication.Repositories.EtudiantRepository;
import com.etudiant.EtudiantApplication.Repositories.NoteRepository;
import com.etudiant.EtudiantApplication.utils.PageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/etudiants")
@CrossOrigin(origins = "http://localhost:5173")
class EtudiantController {
    private final EtudiantRepository etudiantRepository;
    private final NoteRepository noteRepository;

    @Autowired
    public EtudiantController(EtudiantRepository etudiantRepository, NoteRepository noteRepository) {
        this.etudiantRepository = etudiantRepository;
        this.noteRepository = noteRepository;
    }

    @GetMapping("/{requestedId}")
    private ResponseEntity<Etudiant> findById(@PathVariable Long requestedId) {
        Optional<Etudiant> etudiantOptional = etudiantRepository.findById(requestedId);
        if (etudiantOptional.isPresent()) {
            return ResponseEntity.ok(etudiantOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // UriComponentsBuilder is injected automatically by Spring's IoC Container.
    @PostMapping
    private ResponseEntity<Void> createEtudiant(@RequestBody Etudiant etudiant, UriComponentsBuilder ucb) {
        Etudiant toSaveEtudiant = new Etudiant(null, etudiant.getNom(), new Date());
        Etudiant savedEtudiant = etudiantRepository.save(toSaveEtudiant);

        URI locationOfNewEtudiant = ucb.path("etudiants/{id}").buildAndExpand(savedEtudiant.getId()).toUri();

        return ResponseEntity
                //Alternative .created("/etudiants/" + savedEtudiant.id().toString())
                .created(locationOfNewEtudiant).build();
    }

    @GetMapping
    private ResponseEntity<PageResponse<Etudiant>> findAll(Pageable pageable){
        Page<Etudiant> page = etudiantRepository.findAll(
                PageRequest.of(
                        pageable.getPageNumber(),
                        pageable.getPageSize(),
                        pageable.getSortOr(Sort.by(Sort.Direction.ASC, "id"))
                )
        );
        PageResponse<Etudiant> response = new PageResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalPages(),
                page.getTotalElements()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{etudiantId}/notes")
    private ResponseEntity<PageResponse<Note>> findNotesByEtudiant(@PathVariable Long etudiantId, Pageable pageable){
        Page<Note> page = noteRepository.findByIdEtudiant(
                etudiantId,
                PageRequest.of(
                        pageable.getPageNumber(),
                        pageable.getPageSize(),
                        pageable.getSortOr(Sort.by(Sort.Direction.ASC, "id"))
                )
        );

        PageResponse<Note> response = new PageResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalPages(),
                page.getTotalElements()
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{etudiantId}/notes")
    private ResponseEntity<Void> createNote(@RequestBody Note note, @PathVariable Long etudiantId, UriComponentsBuilder ucb) {
        Note toSaveNote = new Note(null, note.getNomDuCours(), note.getValeurDeNote(), etudiantId);
        Note savedNote = noteRepository.save(toSaveNote);

        URI locationOfNewNote = ucb.path("etudiants/{id}/notes/{idNote}").buildAndExpand(etudiantId, savedNote.getId()).toUri();

        return ResponseEntity
                //Alternative .created("/etudiants/" + savedEtudiant.id().toString())
                .created(locationOfNewNote).build();
    }
}