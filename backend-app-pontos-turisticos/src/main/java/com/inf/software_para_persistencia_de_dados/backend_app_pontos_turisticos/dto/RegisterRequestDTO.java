package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto;

import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.domain.user.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequestDTO (
        @NotBlank String name,
        @NotBlank @Email String email,
        @NotBlank @Size(min = 6) String password,
        UserRole role
) {
}