package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.controllers;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.FotoDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.Foto;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services.FotoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/fotos")
public class FotoController {

    private final FotoService service;

    public FotoController(FotoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Foto> criar(@RequestBody FotoDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<Foto>> listar() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Foto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Foto> atualizar(
            @PathVariable Long id,
            @RequestBody FotoDTO dto
    ) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ----------- UPLOAD DE FOTO REAL -----------
    @PostMapping("/upload/{pontoId}")
    public ResponseEntity<?> uploadFoto(
            @PathVariable Long pontoId,
            @RequestParam("arquivo") MultipartFile arquivo
    ) {
        try {
            // Chama o método que salva no disco e cria o registro no banco
            Foto fotoSalva = service.salvarFoto(arquivo, pontoId);
            return ResponseEntity.ok(fotoSalva);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao realizar upload: " + e.getMessage());
        }
    }
}