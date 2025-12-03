package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.PontoTuristico;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.PontoTuristicoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PontoTuristicoService {

    private final PontoTuristicoRepository repository;

    public PontoTuristicoService(PontoTuristicoRepository repository) {
        this.repository = repository;
    }

    public List<PontoTuristico> findAll() {
        return repository.findAll();
    }

    public PontoTuristico findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ponto Turístico não encontrado!"));
    }

    public PontoTuristico save(PontoTuristico ponto) {
        return repository.save(ponto);
    }

    public PontoTuristico update(Long id, PontoTuristico pontoAtualizado) {
        PontoTuristico existente = findById(id);

        existente.setNome(pontoAtualizado.getNome());
        existente.setDescricao(pontoAtualizado.getDescricao());
        existente.setLocalizacao(pontoAtualizado.getLocalizacao());
        existente.setFotos(pontoAtualizado.getFotos());
        existente.setHospedagens(pontoAtualizado.getHospedagens());

        return repository.save(existente);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
