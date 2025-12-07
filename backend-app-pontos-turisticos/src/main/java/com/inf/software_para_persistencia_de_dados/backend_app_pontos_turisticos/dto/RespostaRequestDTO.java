package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RespostaRequestDTO(
        @NotBlank @Size(max = 500) String texto
) {}