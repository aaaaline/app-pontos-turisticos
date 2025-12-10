package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.Foto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FotoRepository extends MongoRepository<Foto, String> {
    long countByPontoTuristicoId(Long pontoTuristicoId);

    List<Foto> findByPontoTuristicoId(Long pontoTuristicoId);
}