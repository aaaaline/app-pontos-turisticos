package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "foto")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Foto {

    @Id
    @GeneratedValue
    private UUID id;

    private String url;

    private String nomeArquivo;

    private Long tamanhoBytes;

    @ManyToOne
    @JoinColumn(name = "ponto_turistico_id")
    private PontoTuristico pontoTuristico;
}
