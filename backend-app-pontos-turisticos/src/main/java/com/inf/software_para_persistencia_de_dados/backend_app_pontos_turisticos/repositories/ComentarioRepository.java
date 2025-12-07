package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.comentario.Comentario;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ComentarioRepository extends MongoRepository<Comentario, String> {
    List<Comentario> findByPontoIdOrderByCreatedAtDesc(String pontoId);
}