package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.controllers;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.user.User;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.Favorito;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services.FavoritoService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favoritos")
public class FavoritoController {

    private final FavoritoService service;

    public FavoritoController(FavoritoService service) {
        this.service = service;
    }

    @PostMapping("/{pontoId}")
    public ResponseEntity<Void> marcarComoFavorito(
            @PathVariable Long pontoId,
            @AuthenticationPrincipal User user
    ) {
        service.toggleFavorito(user, pontoId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Favorito>> meusFavoritos(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(service.listarFavoritosDoUsuario(user));
    }
}