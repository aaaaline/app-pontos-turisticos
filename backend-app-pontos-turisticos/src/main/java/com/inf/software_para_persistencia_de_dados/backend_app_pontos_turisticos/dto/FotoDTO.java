package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dtos;

public class FotoDTO {

    private Long id;
    private String url;
    private String descricao;

    public FotoDTO() {}

    public FotoDTO(Long id, String url, String descricao) {
        this.id = id;
        this.url = url;
        this.descricao = descricao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
