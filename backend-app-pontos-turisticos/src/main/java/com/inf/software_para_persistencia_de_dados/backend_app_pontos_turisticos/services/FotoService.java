package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.FotoDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.Foto;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.exceptions.BadRequestException;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.exceptions.ResourceNotFoundException;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.FotoRepository;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.PontoTuristicoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class FotoService {
    private final Path diretorioUploads = Paths.get("uploads");

    private final FotoRepository fotoRepository;
    private final PontoTuristicoRepository pontoTuristicoRepository;

    public FotoService(FotoRepository fotoRepository, PontoTuristicoRepository pontoTuristicoRepository) {
        this.fotoRepository = fotoRepository;
        this.pontoTuristicoRepository = pontoTuristicoRepository;

        try {
            Files.createDirectories(diretorioUploads);
        } catch (IOException e) {
            throw new RuntimeException("Não foi possível criar diretório de uploads.");
        }
    }

    public Foto create(FotoDTO dto) {
        return null;
    }

    public Foto salvarFoto(MultipartFile arquivo, Long pontoId) throws IOException {
        if (!pontoTuristicoRepository.existsById(pontoId)) {
            throw new ResourceNotFoundException("Ponto turístico não encontrado ID: " + pontoId);
        }

        long qtdeFotos = fotoRepository.countByPontoTuristicoId(pontoId);
        if (qtdeFotos >= 10) {
            throw new BadRequestException("Limite máximo de 10 fotos por ponto turístico atingido.");
        }

        String nomeArquivoOriginal = arquivo.getOriginalFilename();
        String extensao = nomeArquivoOriginal != null && nomeArquivoOriginal.contains(".")
                ? nomeArquivoOriginal.substring(nomeArquivoOriginal.lastIndexOf("."))
                : "";
        String nomeArquivoUnico = UUID.randomUUID().toString() + extensao;

        Path caminhoCompleto = diretorioUploads.resolve(nomeArquivoUnico);
        Files.copy(arquivo.getInputStream(), caminhoCompleto);

        Foto foto = new Foto();
        foto.setNomeArquivo(nomeArquivoOriginal);
        foto.setUrl(caminhoCompleto.toAbsolutePath().toString());
        foto.setTamanhoBytes(arquivo.getSize());
        foto.setPontoTuristicoId(pontoId); // Armazena apenas o ID

        return fotoRepository.save(foto);
    }

    public List<Foto> findAll() {
        return fotoRepository.findAll();
    }

    public Foto findById(String id) {
        return fotoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Foto não encontrada com ID: " + id));
    }

    public Foto update(String id, FotoDTO dto) {
        Foto foto = findById(id);

        if (dto.getUrl() != null) foto.setUrl(dto.getUrl());
        if (dto.getDescricao() != null) foto.setDescricao(dto.getDescricao());

        if (dto.getPontoTuristicoId() != null) {
            if (!pontoTuristicoRepository.existsById(dto.getPontoTuristicoId())) {
                throw new ResourceNotFoundException("Ponto turístico não encontrado");
            }
            foto.setPontoTuristicoId(dto.getPontoTuristicoId());
        }

        return fotoRepository.save(foto);
    }

    public void delete(String id) {
        Foto foto = findById(id);
        try {
            Files.deleteIfExists(Paths.get(foto.getUrl()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        fotoRepository.delete(foto);
    }
}