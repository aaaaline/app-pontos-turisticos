package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.controllers;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.comentario.Comentario;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.comentario.Resposta;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.user.User;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.user.UserRole;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.ComentarioRequestDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.ComentarioUpdateDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto.RespostaRequestDTO;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.ComentarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comentarios")
public class ComentarioController {

    @Autowired
    private ComentarioRepository comentarioRepository;

    @PostMapping
    public ResponseEntity<Void> comentar(
            @RequestBody @Valid ComentarioRequestDTO data,
            @AuthenticationPrincipal User user
    ) {
        Comentario comentario = new Comentario(
                data.pontoTuristicoId(),
                user.getId(),
                data.texto(),
                data.metadata()
        );
        comentarioRepository.save(comentario);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{pontoId}")
    public ResponseEntity<List<Comentario>> listarComentarios(@PathVariable String pontoId) {
        List<Comentario> comentarios = comentarioRepository.findByPontoIdOrderByCreatedAtDesc(pontoId);
        return ResponseEntity.ok(comentarios);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarComentario(
            @PathVariable String id,
            @RequestBody @Valid ComentarioUpdateDTO data,
            @AuthenticationPrincipal User user
    ) {
        Optional<Comentario> comentarioOpt = comentarioRepository.findById(id);

        if (comentarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Comentario comentario = comentarioOpt.get();

        if (!comentario.getUsuarioId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }

        comentario.setTexto(data.texto());
        comentarioRepository.save(comentario);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarComentario(
            @PathVariable String id,
            @AuthenticationPrincipal User user
    ) {
        Optional<Comentario> comentarioOpt = comentarioRepository.findById(id);

        if (comentarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Comentario comentario = comentarioOpt.get();

        boolean isAdmin = user.getRole() == UserRole.ADMIN;

        boolean isDono = comentario.getUsuarioId().equals(user.getId());

        if (!isAdmin && !isDono) {
            return ResponseEntity.status(403).build();
        }

        comentarioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/responder")
    public ResponseEntity<Void> responderComentario(
            @PathVariable String id, // ID do comentário pai
            @RequestBody @Valid RespostaRequestDTO data,
            @AuthenticationPrincipal User user
    ) {
        Optional<Comentario> comentarioOpt = comentarioRepository.findById(id);

        if (comentarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Comentario comentario = comentarioOpt.get();

        Resposta novaResposta = new Resposta(
                user.getId(),
                data.texto(),
                LocalDateTime.now()
        );

        if (comentario.getRespostas() == null) {
            comentario.setRespostas(new ArrayList<>());
        }
        comentario.getRespostas().add(novaResposta);

        comentarioRepository.save(comentario);

        return ResponseEntity.ok().build();
    }
}