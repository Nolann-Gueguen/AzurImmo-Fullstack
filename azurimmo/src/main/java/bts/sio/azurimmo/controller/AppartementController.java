package bts.sio.azurimmo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bts.sio.azurimmo.model.Appartement;
import bts.sio.azurimmo.model.dto.AppartementDTO;
import bts.sio.azurimmo.service.AppartementService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/appartements")
@Tag(name = "Appartements", description = "Gestion des appartements")
public class AppartementController {

    @Autowired
    private AppartementService appartementService;

    
    @PostMapping("/")
    @Operation(summary = "Créer un nouvel appartement", description = "Enregistre un appartement à partir des informations fournies.")
    public ResponseEntity<AppartementDTO> createAppartement(@RequestBody AppartementDTO dto) {
        AppartementDTO savedDTO = appartementService.saveAppartementDTO(dto);
        return ResponseEntity.status(201).body(savedDTO);
    }

    
    @GetMapping("/")
    @Operation(summary = "Récupère tous les appartements")
    public List<Appartement> getAppartements() {
        return appartementService.getAppartements();
    }

    
    @GetMapping("/{id}")
    @Operation(summary = "Récupère un appartement par son ID")
    public Appartement getAppartementById(@PathVariable Long id) {
        return appartementService.getAppartementById(id);
    }

    
    @GetMapping("/ville/{ville}")
    @Operation(summary = "Récupère les appartements d'une ville spécifique")
    public List<Appartement> findByVille(@PathVariable String ville) {
        return appartementService.findByVille(ville);
    }

   
    @GetMapping("/batiment/{batimentId}")
    @Operation(summary = "Récupère les appartements d'un bâtiment")
    public List<Appartement> getAppartementsParBatiment(@PathVariable long batimentId) {
        return appartementService.getAppartementsParBatiment(batimentId);
    }

    
    @GetMapping("/surface/{surface}")
    @Operation(summary = "Récupère les appartements par surface minimale")
    public List<Appartement> getSurfaceGreaterThan(@PathVariable float surface) {
        return appartementService.getSurfaceGreaterThan(surface);
    }
}
