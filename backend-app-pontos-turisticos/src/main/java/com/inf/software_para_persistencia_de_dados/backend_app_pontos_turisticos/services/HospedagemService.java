package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.HospedagemDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.Hospedagem;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.PontoTuristico;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.exceptions.ResourceNotFoundException;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.HospedagemRepository;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.PontoTuristicoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class HospedagemService {

    private final HospedagemRepository hospedagemRepository;
    private final PontoTuristicoRepository pontoTuristicoRepository;

    public HospedagemService(HospedagemRepository hospedagemRepository,
                             PontoTuristicoRepository pontoTuristicoRepository) {
        this.hospedagemRepository = hospedagemRepository;
        this.pontoTuristicoRepository = pontoTuristicoRepository;
    }

    public Hospedagem create(HospedagemDTO dto) {

        Hospedagem hospedagem = new Hospedagem();
        hospedagem.setNome(dto.getNome());
        hospedagem.setEndereco(dto.getEndereco());

        if (dto.getPrecoPorNoite() != null) {
            hospedagem.setPrecoMedio(BigDecimal.valueOf(dto.getPrecoPorNoite()));
        }

        // ASSOCIAÇÃO CORRETA
        if (dto.getPontoTuristicoId() != null) {
            PontoTuristico pt = pontoTuristicoRepository.findById(dto.getPontoTuristicoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Ponto turístico não encontrado"));
            hospedagem.setPontoTuristico(pt);
        }

        return hospedagemRepository.save(hospedagem);
    }

    public List<Hospedagem> findAll() {
        return hospedagemRepository.findAll();
    }

    public Hospedagem findById(Long id) {
        return hospedagemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hospedagem não encontrada ID: " + id));
    }

    public Hospedagem update(Long id, HospedagemDTO dto) {
        Hospedagem h = findById(id);

        h.setNome(dto.getNome());
        h.setEndereco(dto.getEndereco());

        if (dto.getPrecoPorNoite() != null) {
            h.setPrecoMedio(BigDecimal.valueOf(dto.getPrecoPorNoite()));
        }

        // ASSOCIAÇÃO ATUALIZADA
        if (dto.getPontoTuristicoId() != null) {
            PontoTuristico pt = pontoTuristicoRepository.findById(dto.getPontoTuristicoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Ponto turístico não encontrado"));
            h.setPontoTuristico(pt);
        }

        return hospedagemRepository.save(h);
    }

    public void delete(Long id) {
        Hospedagem h = findById(id);
        hospedagemRepository.delete(h);
    }
}
