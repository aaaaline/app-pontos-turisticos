package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto;

public class HospedagemDTO {

    private Long id;
    private String nome;
    private String endereco;
    private Double precoPorNoite;

    // NOVO: ponto turístico vinculada a esta hospedagem
    private Long pontoTuristicoId;

    public HospedagemDTO() {}

    public HospedagemDTO(Long id, String nome, String endereco, Double precoPorNoite, Long pontoTuristicoId) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.precoPorNoite = precoPorNoite;
        this.pontoTuristicoId = pontoTuristicoId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }

    public Double getPrecoPorNoite() { return precoPorNoite; }
    public void setPrecoPorNoite(Double precoPorNoite) { this.precoPorNoite = precoPorNoite; }

    public Long getPontoTuristicoId() { return pontoTuristicoId; }
    public void setPontoTuristicoId(Long pontoTuristicoId) { this.pontoTuristicoId = pontoTuristicoId; }
}
