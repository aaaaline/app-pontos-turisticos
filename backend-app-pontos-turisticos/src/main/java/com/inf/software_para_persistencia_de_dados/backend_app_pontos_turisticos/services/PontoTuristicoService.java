package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dtos.PontoTuristicoDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.PontoTuristico;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.PontoTuristicoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
public class PontoTuristicoService {

    private final PontoTuristicoRepository repo;

    public PontoTuristicoService(PontoTuristicoRepository repo) {
        this.repo = repo;
    }

    // Conversões
    public PontoTuristico dtoToEntity(PontoTuristicoDTO dto) {
        PontoTuristico e = new PontoTuristico();
        if (dto.getId() != null) e.setId(dto.getId());
        e.setNome(dto.getNome());
        e.setDescricao(dto.getDescricao());
        e.setCidade(dto.getCidade());
        e.setEstado(dto.getEstado());
        e.setPais(dto.getPais());
        e.setEndereco(dto.getEndereco());
        e.setLatitude(dto.getLatitude());
        e.setLongitude(dto.getLongitude());
        e.setComoChegarTexto(dto.getComoChegarTexto());
        return e;
    }

    public PontoTuristicoDTO entityToDto(PontoTuristico e) {
        PontoTuristicoDTO dto = new PontoTuristicoDTO();
        dto.setId(e.getId());
        dto.setNome(e.getNome());
        dto.setDescricao(e.getDescricao());
        dto.setCidade(e.getCidade());
        dto.setEstado(e.getEstado());
        dto.setPais(e.getPais());
        dto.setEndereco(e.getEndereco());
        dto.setLatitude(e.getLatitude());
        dto.setLongitude(e.getLongitude());
        dto.setComoChegarTexto(e.getComoChegarTexto());
        return dto;
    }

    // CRUD usando DTO
    public PontoTuristicoDTO create(PontoTuristicoDTO dto) {
        PontoTuristico entity = dtoToEntity(dto);
        PontoTuristico saved = repo.save(entity);
        return entityToDto(saved);
    }

    public PontoTuristicoDTO update(String id, PontoTuristicoDTO dto) {
        Optional<PontoTuristico> opt = repo.findById(id);
        if (opt.isEmpty()) {
            throw new RuntimeException("Ponto não encontrado"); // ou sua NotFoundException
        }
        PontoTuristico existing = opt.get();
        // atualizar campos permitidos
        existing.setNome(dto.getNome());
        existing.setDescricao(dto.getDescricao());
        existing.setCidade(dto.getCidade());
        existing.setEstado(dto.getEstado());
        existing.setPais(dto.getPais());
        existing.setEndereco(dto.getEndereco());
        existing.setLatitude(dto.getLatitude());
        existing.setLongitude(dto.getLongitude());
        existing.setComoChegarTexto(dto.getComoChegarTexto());
        PontoTuristico saved = repo.save(existing);
        return entityToDto(saved);
    }

    public PontoTuristicoDTO findByIdDto(String id) {
        return repo.findById(id).map(this::entityToDto).orElse(null);
    }

    public List<PontoTuristicoDTO> findAllDto() {
        return repo.findAll().stream().map(this::entityToDto).collect(Collectors.toList());
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}
