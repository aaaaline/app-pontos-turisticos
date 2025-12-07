package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.comentario;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Resposta {
    private String usuarioId;
    private String texto;
    private LocalDateTime data;
}