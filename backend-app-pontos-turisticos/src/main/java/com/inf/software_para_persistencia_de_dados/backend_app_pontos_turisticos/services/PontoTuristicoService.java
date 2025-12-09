package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.PontoTuristicoDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.PontoTuristico;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.PontoTuristicoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PontoTuristicoService {

    private final PontoTuristicoRepository repo;

    public PontoTuristicoService(PontoTuristicoRepository repo) {
        this.repo = repo;
    }

    // MUDAR: PontoTuristicoDTO → PontoTuristico (retorno)
    public PontoTuristico create(PontoTuristicoDTO dto) {
        PontoTuristico entity = new PontoTuristico();
        entity.setNome(dto.getNome());
        entity.setDescricao(dto.getDescricao());
        entity.setCidade(dto.getCidade());
        entity.setEstado(dto.getEstado());
        entity.setPais(dto.getPais());
        entity.setEndereco(dto.getEndereco());
        entity.setLatitude(dto.getLatitude());
        entity.setLongitude(dto.getLongitude());
        entity.setComoChegarTexto(dto.getComoChegarTexto());
        return repo.save(entity);
    }

    public List<PontoTuristico> findAll() {
        return repo.findAll();
    }

    public PontoTuristico findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Ponto turístico não encontrado"));
    }

    // MUDAR: PontoTuristicoDTO → PontoTuristico (retorno)
    public PontoTuristico update(Long id, PontoTuristicoDTO dto) {
        PontoTuristico existing = findById(id);
        existing.setNome(dto.getNome());
        existing.setDescricao(dto.getDescricao());
        existing.setCidade(dto.getCidade());
        existing.setEstado(dto.getEstado());
        existing.setPais(dto.getPais());
        existing.setEndereco(dto.getEndereco());
        existing.setLatitude(dto.getLatitude());
        existing.setLongitude(dto.getLongitude());
        existing.setComoChegarTexto(dto.getComoChegarTexto());
        return repo.save(existing);
    }

    public void delete(Long id) {
        PontoTuristico entity = findById(id);
        repo.delete(entity);
    }
}