package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "favorito", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"usuario_id", "ponto_turistico_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Favorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "ponto_turistico_id", nullable = false)
    private PontoTuristico pontoTuristico;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}