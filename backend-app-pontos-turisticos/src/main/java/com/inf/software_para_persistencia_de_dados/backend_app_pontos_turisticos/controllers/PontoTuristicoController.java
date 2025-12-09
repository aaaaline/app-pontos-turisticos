package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.controllers;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.PontoTuristicoDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.PontoTuristico;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services.PontoTuristicoService;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services.ExportacaoImportacaoService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/pontos-turisticos")
public class PontoTuristicoController {

    private final PontoTuristicoService service;
    private final ExportacaoImportacaoService exportService;

    public PontoTuristicoController(
            PontoTuristicoService service,
            ExportacaoImportacaoService exportService
    ) {
        this.service = service;
        this.exportService = exportService;
    }

    // CRUD ------------------------------

    @PostMapping
    public ResponseEntity<PontoTuristico> criar(@RequestBody PontoTuristicoDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<PontoTuristicoDTO>> listar() {
        List<PontoTuristicoDTO> dtos = service.findAll().stream()
                .map(p -> {
                    PontoTuristicoDTO dto = new PontoTuristicoDTO();
                    dto.setId(p.getId());
                    dto.setNome(p.getNome());
                    dto.setDescricao(p.getDescricao());
                    dto.setCidade(p.getCidade());
                    dto.setEstado(p.getEstado());
                    dto.setPais(p.getPais());
                    dto.setEndereco(p.getEndereco());
                    dto.setLatitude(p.getLatitude());
                    dto.setLongitude(p.getLongitude());
                    dto.setComoChegarTexto(p.getComoChegarTexto());
                    return dto;
                })
                .toList();

        return ResponseEntity.ok(dtos);
    }
    @GetMapping("/{id}")
    public ResponseEntity<PontoTuristico> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PontoTuristico> atualizar(
            @PathVariable Long id,
            @RequestBody PontoTuristicoDTO dto
    ) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }


    // EXPORTAÇÃO ------------------------

    @GetMapping("/export/json")
    public ResponseEntity<String> exportarJSON() throws Exception {
        return ResponseEntity.ok(exportService.exportarJSON());
    }

    @GetMapping("/export/xml")
    public ResponseEntity<String> exportarXML() throws Exception {
        return ResponseEntity.ok(exportService.exportarXML());
    }


    // IMPORTAÇÃO ------------------------

    @PostMapping("/import/json")
    public ResponseEntity<String> importarJSON(@RequestParam("arquivo") MultipartFile arquivo) throws Exception {
        exportService.importarJSON(arquivo);
        return ResponseEntity.ok("Importação JSON realizada com sucesso!");
    }

    @PostMapping("/import/xml")
    public ResponseEntity<String> importarXML(@RequestParam("arquivo") MultipartFile arquivo) throws Exception {
        exportService.importarXML(arquivo);
        return ResponseEntity.ok("Importação XML realizada com sucesso!");
    }
}
