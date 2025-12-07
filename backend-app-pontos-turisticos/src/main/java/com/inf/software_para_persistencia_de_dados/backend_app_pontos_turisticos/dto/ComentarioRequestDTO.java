package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Map;

public record ComentarioRequestDTO(
        @NotBlank String pontoTuristicoId,
        @NotBlank @Size(max = 500) String texto,
        Map<String, String> metadata
) {}