package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.controllers;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.PontoTuristicoDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.PontoTuristico;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services.ExportacaoImportacaoService;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services.PontoTuristicoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/pontos-turisticos")
public class PontoTuristicoController {

    private final PontoTuristicoService service;
    private final ExportacaoImportacaoService exportService;

    public PontoTuristicoController(PontoTuristicoService service, ExportacaoImportacaoService exportService) {
        this.service = service;
        this.exportService = exportService;
    }

    // --- Create ---
    @PostMapping
    public ResponseEntity<PontoTuristico> criar(@RequestBody PontoTuristicoDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping
    public ResponseEntity<Page<PontoTuristico>> listar(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String cidade,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String tipo,
            @PageableDefault(page = 0, size = 10, sort = "nome", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return ResponseEntity.ok(service.findAll(nome, cidade, estado, tipo, pageable));
    }

    // --- Find By ID ---
    @GetMapping("/{id}")
    public ResponseEntity<PontoTuristico> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    // --- Update ---
    @PutMapping("/{id}")
    public ResponseEntity<PontoTuristico> atualizar(
            @PathVariable Long id,
            @RequestBody PontoTuristicoDTO dto
    ) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    // --- Delete ---
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    // --- Import/Export (Mantidos) ---
    @GetMapping("/export/json")
    public ResponseEntity<String> exportarJSON() throws Exception {
        return ResponseEntity.ok(exportService.exportarJSON());
    }

    @GetMapping("/export/xml")
    public ResponseEntity<String> exportarXML() throws Exception {
        return ResponseEntity.ok(exportService.exportarXML());
    }

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