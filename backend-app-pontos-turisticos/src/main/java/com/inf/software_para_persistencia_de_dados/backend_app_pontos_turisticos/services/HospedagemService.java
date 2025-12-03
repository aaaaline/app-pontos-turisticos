package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.Hospedagem;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.PontoTuristico;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.exceptions.ResourceNotFoundException;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.HospedagemRepository;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.PontoTuristicoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospedagemService {

    private final HospedagemRepository hospedagemRepository;
    private final PontoTuristicoRepository pontoTuristicoRepository;

    public HospedagemService(HospedagemRepository hospedagemRepository, PontoTuristicoRepository pontoTuristicoRepository) {
        this.hospedagemRepository = hospedagemRepository;
        this.pontoTuristicoRepository = pontoTuristicoRepository;
    }

    public Hospedagem create(Hospedagem hospedagem) {
        PontoTuristico ponto = pontoTuristicoRepository.findById(hospedagem.getIdPontoTuristico())
                .orElseThrow(() -> new ResourceNotFoundException("Ponto turístico não encontrado"));

        hospedagem.setPontoTuristico(ponto);
        return hospedagemRepository.save(hospedagem);
    }

    public List<Hospedagem> findAll() {
        return hospedagemRepository.findAll();
    }

    public Hospedagem findById(Long id) {
        return hospedagemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hospedagem não encontrada ID: " + id));
    }

    public Hospedagem update(Long id, Hospedagem hospedagemAtualizada) {
        Hospedagem h = findById(id);
        h.setNome(hospedagemAtualizada.getNome());
        h.setPreco(hospedagemAtualizada.getPreco());
        h.setDescricao(hospedagemAtualizada.getDescricao());
        return hospedagemRepository.save(h);
    }

    public void delete(Long id) {
        Hospedagem h = findById(id);
        hospedagemRepository.delete(h);
    }
}
