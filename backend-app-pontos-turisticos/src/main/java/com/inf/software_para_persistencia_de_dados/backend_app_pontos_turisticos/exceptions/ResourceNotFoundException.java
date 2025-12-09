package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
