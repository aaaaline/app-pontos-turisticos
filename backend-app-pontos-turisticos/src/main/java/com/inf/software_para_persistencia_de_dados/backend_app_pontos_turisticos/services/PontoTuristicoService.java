package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.PontoTuristicoDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.PontoTuristico;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.PontoTuristicoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PontoTuristicoService {

    private final PontoTuristicoRepository repo;

    public PontoTuristicoService(PontoTuristicoRepository repo) {
        this.repo = repo;
    }

    @Cacheable(value = "pontosTuristicos", key = "#id")
    public PontoTuristico findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Ponto turístico não encontrado"));
    }

    @CacheEvict(value = "pontosTuristicos", key = "#id")
    public PontoTuristico update(Long id, PontoTuristicoDTO dto) {
        PontoTuristico existing = findById(id);
        updateEntityFromDto(existing, dto);
        return repo.save(existing);
    }

    @CacheEvict(value = "pontosTuristicos", key = "#id")
    public void delete(Long id) {
        PontoTuristico entity = findById(id);
        repo.delete(entity);
    }

    public PontoTuristico create(PontoTuristicoDTO dto) {
        PontoTuristico entity = new PontoTuristico();
        updateEntityFromDto(entity, dto);
        return repo.save(entity);
    }

    public Page<PontoTuristico> findAll(String nome, String cidade, String estado, String tipo, Pageable pageable) {
        String nomePattern = nome == null ? null : "%" + nome.toLowerCase() + "%";
        String cidadePattern = cidade == null ? null : "%" + cidade.toLowerCase() + "%";
        String estadoPattern = estado == null ? null : "%" + estado.toLowerCase() + "%";
        String tipoPattern = tipo == null ? null : "%" + tipo.toLowerCase() + "%";

        return repo.buscarComFiltros(nomePattern, cidadePattern, estadoPattern, tipoPattern, pageable);
    }

    public List<PontoTuristico> findAllList() {
        return repo.findAll();
    }

    private void updateEntityFromDto(PontoTuristico entity, PontoTuristicoDTO dto) {
        entity.setNome(dto.getNome());
        entity.setDescricao(dto.getDescricao());
        entity.setCidade(dto.getCidade());
        entity.setEstado(dto.getEstado());
        entity.setPais(dto.getPais());
        entity.setEndereco(dto.getEndereco());
        entity.setLatitude(dto.getLatitude());
        entity.setLongitude(dto.getLongitude());
        entity.setComoChegarTexto(dto.getComoChegarTexto());
        entity.setTipo(dto.getTipo());
    }
}