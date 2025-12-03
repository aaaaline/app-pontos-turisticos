package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "ponto_turistico")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PontoTuristico {

    @Id
    @GeneratedValue
    private UUID id;

    private String nome;

    @Column(length = 2000)
    private String descricao;

    private String cidade;

    private String estado;

    private String pais;

    private String endereco;

    private Double latitude;

    private Double longitude;

    @Column(length = 2000)
    private String comoChegarTexto;

    @CreationTimestamp
    private LocalDateTime createdAt;

    // Relacionamento com Foto
    @OneToMany(mappedBy = "pontoTuristico", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Foto> fotos;

    // Relacionamento com Hospedagem
    @OneToMany(mappedBy = "pontoTuristico", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Hospedagem> hospedagens;
}
