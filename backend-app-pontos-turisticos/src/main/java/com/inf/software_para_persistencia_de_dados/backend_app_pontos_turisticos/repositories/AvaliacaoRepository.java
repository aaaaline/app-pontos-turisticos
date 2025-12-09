package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.avaliacao.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, String> {

    Optional<Avaliacao> findByPontoTuristicoIdAndUserId(Long pontoId, String userId);

    @Query("SELECT AVG(a.nota) FROM Avaliacao a WHERE a.pontoTuristico.id = :pontoId")
    Double obterMediaPorPonto(@Param("pontoId") Long pontoId);
}