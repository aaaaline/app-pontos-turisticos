package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.user.User;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.Favorito;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.PontoTuristico;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.exceptions.ResourceNotFoundException;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.FavoritoRepository;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.PontoTuristicoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoritoService {

    private final FavoritoRepository favoritoRepository;
    private final PontoTuristicoRepository pontoTuristicoRepository;

    public FavoritoService(FavoritoRepository favoritoRepository, PontoTuristicoRepository pontoTuristicoRepository) {
        this.favoritoRepository = favoritoRepository;
        this.pontoTuristicoRepository = pontoTuristicoRepository;
    }

    public void toggleFavorito(User user, Long pontoId) {
        PontoTuristico ponto = pontoTuristicoRepository.findById(pontoId)
                .orElseThrow(() -> new ResourceNotFoundException("Ponto Turístico não encontrado"));

        Optional<Favorito> favoritoExistente = favoritoRepository.findByUserAndPontoTuristico(user, ponto);

        if (favoritoExistente.isPresent()) {
            favoritoRepository.delete(favoritoExistente.get());
        } else {
            Favorito novoFavorito = Favorito.builder()
                    .user(user)
                    .pontoTuristico(ponto)
                    .build();
            favoritoRepository.save(novoFavorito);
        }
    }

    public List<Favorito> listarFavoritosDoUsuario(User user) {
        return favoritoRepository.findByUser(user);
    }
}