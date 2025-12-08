package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.dto;

public class PontoTuristicoDTO {

    private Long id;
    private String nome;
    private String descricao;
    private String cidade;
    private String estado;
    private String pais;
    private String endereco;
    private Double latitude;
    private Double longitude;
    private String comoChegarTexto;

    public PontoTuristicoDTO() {}

    // getters e setters para todos os campos
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getCidade() { return cidade; }
    public void setCidade(String cidade) { this.cidade = cidade; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getPais() { return pais; }
    public void setPais(String pais) { this.pais = pais; }

    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getComoChegarTexto() { return comoChegarTexto; }
    public void setComoChegarTexto(String comoChegarTexto) { this.comoChegarTexto = comoChegarTexto; }
}
