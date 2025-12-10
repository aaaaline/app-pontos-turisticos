package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.controllers;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.avaliacao.Avaliacao;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.user.User;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.PontoTuristico;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.AvaliacaoRequestDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.exceptions.ResourceNotFoundException;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.AvaliacaoRepository;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.PontoTuristicoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private PontoTuristicoRepository pontoTuristicoRepository;

    @PostMapping
    public ResponseEntity<Void> avaliar(
            @RequestBody @Valid AvaliacaoRequestDTO data,
            @AuthenticationPrincipal User user
    ) {
        Long pontoId = Long.parseLong(data.pontoTuristicoId());

        Optional<Avaliacao> existente = avaliacaoRepository.findByPontoTuristicoIdAndUserId(pontoId, user.getId());

        if (existente.isPresent()) {
            Avaliacao avaliacao = existente.get();
            avaliacao.setNota(data.nota());
            avaliacao.setComentario(data.comentario());
            avaliacaoRepository.save(avaliacao);
        } else {
            PontoTuristico ponto = pontoTuristicoRepository.findById(pontoId)
                    .orElseThrow(() -> new ResourceNotFoundException("Ponto Turístico não encontrado"));

            Avaliacao novaAvaliacao = new Avaliacao(
                    ponto,
                    user,
                    data.nota(),
                    data.comentario()
            );
            avaliacaoRepository.save(novaAvaliacao);
        }

        atualizarMediaPonto(pontoId);

        return ResponseEntity.ok().build();
    }

    private void atualizarMediaPonto(Long pontoId) {
        Double novaMedia = avaliacaoRepository.obterMediaPorPonto(pontoId);

        if (novaMedia == null) novaMedia = 0.0;

        PontoTuristico ponto = pontoTuristicoRepository.findById(pontoId)
                .orElseThrow(() -> new ResourceNotFoundException("Ponto não encontrado para atualização de média"));

        ponto.setMediaAvaliacao(novaMedia);
        pontoTuristicoRepository.save(ponto);
    }

    @GetMapping("/media/{pontoId}")
    public ResponseEntity<Double> obterMedia(@PathVariable Long pontoId) {
        Double media = avaliacaoRepository.obterMediaPorPonto(pontoId);
        return ResponseEntity.ok(media != null ? media : 0.0);
    }
}