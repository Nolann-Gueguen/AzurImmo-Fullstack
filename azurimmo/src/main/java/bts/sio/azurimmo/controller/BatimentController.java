package bts.sio.azurimmo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bts.sio.azurimmo.model.dto.BatimentDTO;
import bts.sio.azurimmo.service.BatimentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/batiments")
@Tag(name = "Batiments", description = "Gestion des batiments")
public class BatimentController {

    @Autowired
    private BatimentService batimentService;
    
   
    @GetMapping("/{batimentId}")
    @Operation(summary = "Récupère un bâtiment par son ID")
    public Optional<BatimentDTO> getBatimentDTO(@PathVariable long batimentId) {
        return batimentService.getBatimentDTO(batimentId);
    }

    
    @GetMapping("/re/{batimentId}")
    @Operation(summary = "Récupère un bâtiment par son ID avec gestion des erreurs")
    public ResponseEntity<BatimentDTO> getBatimentReDTO(@PathVariable long batimentId) {
        return batimentService.getBatimentDTO(batimentId)
                              .map(ResponseEntity::ok)
                              .orElse(ResponseEntity.notFound().build());
    }
    
    
    @GetMapping("/")
    @Operation(summary = "Récupère tous les bâtiments")
    public List<BatimentDTO> getBatiments() {
        return batimentService.getBatimentsDTO(); 
    }
    
    
    @PostMapping("/")
    @Operation(summary = "Créer un nouveau bâtiment", description = "Enregistre un bâtiment à partir des informations fournies.")
    public ResponseEntity<BatimentDTO> createBatiment(@RequestBody BatimentDTO dto) {
        BatimentDTO savedDTO = batimentService.saveBatimentDTO(dto);
        return ResponseEntity.status(201).body(savedDTO);
    }
}
