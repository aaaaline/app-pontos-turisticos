package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.Foto;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.FotoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FotoService {

    private final FotoRepository repository;

    public FotoService(FotoRepository repository) {
        this.repository = repository;
    }

    public List<Foto> findAll() {
        return repository.findAll();
    }

    public Foto findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Foto não encontrada!"));
    }

    public Foto save(Foto foto) {
        return repository.save(foto);
    }

    public Foto update(Long id, Foto fotoAtualizada) {
        Foto existente = findById(id);

        existente.setUrl(fotoAtualizada.getUrl());
        existente.setDescricao(fotoAtualizada.getDescricao());

        return repository.save(existente);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
