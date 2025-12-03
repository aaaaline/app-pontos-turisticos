package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.Hospedagem;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.HospedagemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospedagemService {

    private final HospedagemRepository repository;

    public HospedagemService(HospedagemRepository repository) {
        this.repository = repository;
    }

    public List<Hospedagem> findAll() {
        return repository.findAll();
    }

    public Hospedagem findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hospedagem não encontrada!"));
    }

    public Hospedagem save(Hospedagem hospedagem) {
        return repository.save(hospedagem);
    }

    public Hospedagem update(Long id, Hospedagem hospedagemAtualizada) {
        Hospedagem existente = findById(id);

        existente.setNome(hospedagemAtualizada.getNome());
        existente.setDescricao(hospedagemAtualizada.getDescricao());
        existente.setLocalizacao(hospedagemAtualizada.getLocalizacao());
        existente.setFotos(hospedagemAtualizada.getFotos());

        return repository.save(existente);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
