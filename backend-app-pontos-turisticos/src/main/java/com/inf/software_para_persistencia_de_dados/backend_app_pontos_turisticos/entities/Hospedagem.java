package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "hospedagem")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hospedagem {

    @Id
    @GeneratedValue
    private UUID id;

    private String nome;

    private String tipo; // hotel, pousada, hostel etc.

    private BigDecimal precoMedio;

    private String site;

    private String endereco;

    private String telefone;

    @ManyToOne
    @JoinColumn(name = "ponto_turistico_id")
    private PontoTuristico pontoTuristico;
}
