package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.Hospedagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospedagemRepository extends JpaRepository<Hospedagem, Long> {
}
