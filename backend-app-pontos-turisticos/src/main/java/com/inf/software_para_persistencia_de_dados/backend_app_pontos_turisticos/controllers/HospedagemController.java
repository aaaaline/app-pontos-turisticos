package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.controllers;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.Hospedagem;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services.HospedagemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hospedagens")
public class HospedagemController {

    private final HospedagemService hospedagemService;

    public HospedagemController(HospedagemService hospedagemService) {
        this.hospedagemService = hospedagemService;
    }

    @GetMapping
    public ResponseEntity<List<Hospedagem>> listar() {
        return ResponseEntity.ok(hospedagemService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hospedagem> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(hospedagemService.buscar(id));
    }

    @PostMapping
    public ResponseEntity<Hospedagem> criar(@RequestBody Hospedagem hospedagem) {
        return ResponseEntity.ok(hospedagemService.criar(hospedagem));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hospedagem> atualizar(@PathVariable Long id, @RequestBody Hospedagem hospedagem) {
        return ResponseEntity.ok(hospedagemService.atualizar(id, hospedagem));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        hospedagemService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
