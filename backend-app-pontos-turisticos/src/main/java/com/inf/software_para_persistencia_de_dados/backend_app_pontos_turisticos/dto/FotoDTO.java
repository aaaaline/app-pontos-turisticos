package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto;

public class FotoDTO {
    private String id;
    private String url;
    private String descricao;
    private Long pontoTuristicoId;

    public FotoDTO() {}

    public FotoDTO(String id, String url, String descricao) {
        this.id = id;
        this.url = url;
        this.descricao = descricao;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public Long getPontoTuristicoId() { return pontoTuristicoId; }
    public void setPontoTuristicoId(Long pontoTuristicoId) { this.pontoTuristicoId = pontoTuristicoId; }
}