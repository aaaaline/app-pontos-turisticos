package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.controllers;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.PontoTuristico;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services.PontoTuristicoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pontos-turisticos")
public class PontoTuristicoController {

    private final PontoTuristicoService pontoService;

    public PontoTuristicoController(PontoTuristicoService pontoService) {
        this.pontoService = pontoService;
    }

    @GetMapping
    public ResponseEntity<List<PontoTuristico>> listar() {
        return ResponseEntity.ok(pontoService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PontoTuristico> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(pontoService.buscar(id));
    }

    @PostMapping
    public ResponseEntity<PontoTuristico> criar(@RequestBody PontoTuristico ponto) {
        return ResponseEntity.ok(pontoService.criar(ponto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PontoTuristico> atualizar(@PathVariable Long id, @RequestBody PontoTuristico ponto) {
        return ResponseEntity.ok(pontoService.atualizar(id, ponto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        pontoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
