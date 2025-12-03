package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.controllers;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.Foto;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services.FotoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fotos")
public class FotoController {

    private final FotoService fotoService;

    public FotoController(FotoService fotoService) {
        this.fotoService = fotoService;
    }

    @GetMapping
    public ResponseEntity<List<Foto>> listar() {
        return ResponseEntity.ok(fotoService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Foto> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(fotoService.buscar(id));
    }

    @PostMapping
    public ResponseEntity<Foto> criar(@RequestBody Foto foto) {
        return ResponseEntity.ok(fotoService.criar(foto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Foto> atualizar(@PathVariable Long id, @RequestBody Foto foto) {
        return ResponseEntity.ok(fotoService.atualizar(id, foto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        fotoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
