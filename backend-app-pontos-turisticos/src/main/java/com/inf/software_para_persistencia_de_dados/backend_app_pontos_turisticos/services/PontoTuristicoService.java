package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.PontoTuristico;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.exceptions.ResourceNotFoundException;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.PontoTuristicoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PontoTuristicoService {

    private final PontoTuristicoRepository repository;

    public PontoTuristicoService(PontoTuristicoRepository repository) {
        this.repository = repository;
    }

    public PontoTuristico create(PontoTuristico ponto) {
        return repository.save(ponto);
    }

    public List<PontoTuristico> findAll() {
        return repository.findAll();
    }

    public PontoTuristico findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ponto turístico não encontrado com ID: " + id));
    }

    public PontoTuristico update(Long id, PontoTuristico pontoAtualizado) {
        PontoTuristico p = findById(id);
        p.setNome(pontoAtualizado.getNome());
        p.setDescricao(pontoAtualizado.getDescricao());
        p.setLocalizacao(pontoAtualizado.getLocalizacao());
        return repository.save(p);
    }

    public void delete(Long id) {
        PontoTuristico p = findById(id);
        repository.delete(p);
    }
}
