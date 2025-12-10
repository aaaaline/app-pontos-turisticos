package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.controllers;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.HospedagemDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.Hospedagem;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services.HospedagemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hospedagens")
public class HospedagemController {

    private final HospedagemService service;

    public HospedagemController(HospedagemService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Hospedagem> criar(@RequestBody HospedagemDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<HospedagemDTO>> listar() {
        List<HospedagemDTO> dtos = service.findAll().stream()
                .map(h -> new HospedagemDTO(
                        h.getId(),
                        h.getNome(),
                        h.getEndereco(),
                        h.getPrecoMedio() != null ? h.getPrecoMedio().doubleValue() : null,
                        h.getPontoTuristico() != null ? h.getPontoTuristico().getId() : null
                ))
                .toList();

        return ResponseEntity.ok(dtos);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Hospedagem> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hospedagem> atualizar(
            @PathVariable Long id,
            @RequestBody HospedagemDTO dto
    ) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
