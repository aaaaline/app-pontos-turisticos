package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.avaliacao;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "avaliacao", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"ponto_id", "usuario_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "ponto_id", nullable = false)
    private String pontoId;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Integer nota;

    @Column(columnDefinition = "TEXT")
    private String comentario;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Avaliacao(String pontoId, User user, Integer nota, String comentario) {
        this.pontoId = pontoId;
        this.user = user;
        this.nota = nota;
        this.comentario = comentario;
    }
}