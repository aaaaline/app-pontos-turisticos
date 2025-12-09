package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.FotoDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.Foto;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.PontoTuristico;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.exceptions.ResourceNotFoundException;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.FotoRepository;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.PontoTuristicoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FotoService {

    private final FotoRepository fotoRepository;
    private final PontoTuristicoRepository pontoTuristicoRepository;

    public FotoService(FotoRepository fotoRepository,
                       PontoTuristicoRepository pontoTuristicoRepository) {
        this.fotoRepository = fotoRepository;
        this.pontoTuristicoRepository = pontoTuristicoRepository;
    }

    public Foto create(FotoDTO dto) {
        Foto foto = new Foto();
        foto.setUrl(dto.getUrl());
        foto.setDescricao(dto.getDescricao());

        // associação com ponto turístico
        if (dto.getPontoTuristicoId() != null) {
            PontoTuristico ponto = pontoTuristicoRepository.findById(dto.getPontoTuristicoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Ponto turístico não encontrado"));
            foto.setPontoTuristico(ponto);
        }

        return fotoRepository.save(foto);
    }

    public List<Foto> findAll() {
        return fotoRepository.findAll();
    }

    public Foto findById(Long id) {
        return fotoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Foto não encontrada com ID: " + id));
    }

    public Foto update(Long id, FotoDTO dto) {
        Foto foto = findById(id);
        foto.setUrl(dto.getUrl());
        foto.setDescricao(dto.getDescricao());

        // atualizar associação
        if (dto.getPontoTuristicoId() != null) {
            PontoTuristico ponto = pontoTuristicoRepository.findById(dto.getPontoTuristicoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Ponto turístico não encontrado"));
            foto.setPontoTuristico(ponto);
        }

        return fotoRepository.save(foto);
    }

    public void delete(Long id) {
        Foto foto = findById(id);
        fotoRepository.delete(foto);
    }
}
