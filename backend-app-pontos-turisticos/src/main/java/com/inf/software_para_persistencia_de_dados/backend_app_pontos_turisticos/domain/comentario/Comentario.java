package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.comentario;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Document(collection = "comentarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comentario {
    @Id
    private String id;

    private String pontoId;
    private String usuarioId;
    private String texto;
    private LocalDateTime createdAt;
    private Map<String, String> metadata;
    private List<Resposta> respostas = new ArrayList<>();

    public Comentario(String pontoId, String usuarioId, String texto, Map<String, String> metadata) {
        this.pontoId = pontoId;
        this.usuarioId = usuarioId;
        this.texto = texto;
        this.createdAt = LocalDateTime.now();
        this.metadata = metadata;
        this.respostas = new ArrayList<>();
    }
}