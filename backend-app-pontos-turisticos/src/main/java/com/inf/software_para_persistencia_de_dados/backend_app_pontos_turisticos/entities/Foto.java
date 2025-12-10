package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "fotos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Foto {

    @Id
    private String id;

    private String url;
    private String nomeArquivo;
    private String descricao;
    private Long tamanhoBytes;

    @ManyToOne
    @JoinColumn(name = "ponto_turistico_id")
    @JsonIgnore
    private PontoTuristico pontoTuristico;
}