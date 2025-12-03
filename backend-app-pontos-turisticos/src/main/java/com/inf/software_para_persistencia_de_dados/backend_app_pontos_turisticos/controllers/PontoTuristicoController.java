package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.controllers;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dtos.PontoTuristicoDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services.PontoTuristicoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pontos")
public class PontoTuristicoController {

    private final PontoTuristicoService service;

    public PontoTuristicoController(PontoTuristicoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<PontoTuristicoDTO> create(@RequestBody PontoTuristicoDTO dto) {
        PontoTuristicoDTO saved = service.create(dto);
        return ResponseEntity.status(201).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<PontoTuristicoDTO>> list() {
        return ResponseEntity.ok(service.findAllDto());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PontoTuristicoDTO> get(@PathVariable String id) {
        PontoTuristicoDTO dto = service.findByIdDto(id);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PontoTuristicoDTO> update(@PathVariable String id, @RequestBody PontoTuristicoDTO dto) {
        PontoTuristicoDTO updated = service.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
