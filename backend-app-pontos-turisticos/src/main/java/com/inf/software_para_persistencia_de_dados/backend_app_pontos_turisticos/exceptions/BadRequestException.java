package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.exceptions;

public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}
