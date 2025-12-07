package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.controllers;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.avaliacao.Avaliacao;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.user.User;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.AvaliacaoRequestDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.AvaliacaoRepository;
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

    @PostMapping
    public ResponseEntity<Void> avaliar(
            @RequestBody @Valid AvaliacaoRequestDTO data,
            @AuthenticationPrincipal User user
    ) {
        Optional<Avaliacao> existente = avaliacaoRepository.findByPontoIdAndUserId(data.pontoTuristicoId(), user.getId());

        if (existente.isPresent()) {
            Avaliacao avaliacao = existente.get();
            avaliacao.setNota(data.nota());
            avaliacao.setComentario(data.comentario());
            avaliacaoRepository.save(avaliacao);
        } else {
            Avaliacao novaAvaliacao = new Avaliacao(
                    data.pontoTuristicoId(),
                    user,
                    data.nota(),
                    data.comentario()
            );
            avaliacaoRepository.save(novaAvaliacao);
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/media/{pontoId}")
    public ResponseEntity<Double> obterMedia(@PathVariable String pontoId) {
        Double media = avaliacaoRepository.obterMediaPorPonto(pontoId);
        return ResponseEntity.ok(media != null ? media : 0.0);
    }
}