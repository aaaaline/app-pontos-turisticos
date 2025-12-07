package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto;

import jakarta.validation.constraints.*;

public record AvaliacaoRequestDTO(
        @NotBlank String pontoTuristicoId,
        @NotNull @Min(1) @Max(5) Integer nota,
        @Size(max = 500) String comentario
) {}