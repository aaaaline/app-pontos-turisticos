package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "hospedagem")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hospedagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String tipo;
    private BigDecimal precoMedio;
    private String site;
    private String endereco;
    private String telefone;

    @ManyToOne
    @JoinColumn(name = "ponto_turistico_id")
    @JsonIgnore
    private PontoTuristico pontoTuristico;
}