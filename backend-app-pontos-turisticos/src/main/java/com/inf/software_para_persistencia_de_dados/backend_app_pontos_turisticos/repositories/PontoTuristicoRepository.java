package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.PontoTuristico;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PontoTuristicoRepository extends JpaRepository<PontoTuristico, Long> {

    @Query("SELECT p FROM PontoTuristico p WHERE " +
            "(:nome IS NULL OR LOWER(p.nome) LIKE :nome) AND " +
            "(:cidade IS NULL OR LOWER(p.cidade) LIKE :cidade) AND " +
            "(:estado IS NULL OR LOWER(p.estado) LIKE :estado) AND " +
            "(:tipo IS NULL OR LOWER(p.tipo) LIKE :tipo)")
    Page<PontoTuristico> buscarComFiltros(
            @Param("nome") String nome,
            @Param("cidade") String cidade,
            @Param("estado") String estado,
            @Param("tipo") String tipo,
            Pageable pageable
    );
}