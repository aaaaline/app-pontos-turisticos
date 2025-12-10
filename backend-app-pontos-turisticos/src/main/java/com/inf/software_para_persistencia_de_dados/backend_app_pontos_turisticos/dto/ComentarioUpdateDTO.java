package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ComentarioUpdateDTO(
        @NotBlank(message = "O texto não pode estar vazio")
        @Size(max = 500, message = "O comentário deve ter no máximo 500 caracteres")
        String texto
) {}