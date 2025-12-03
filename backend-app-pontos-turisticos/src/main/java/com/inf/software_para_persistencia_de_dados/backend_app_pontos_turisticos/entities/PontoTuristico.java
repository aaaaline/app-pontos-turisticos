package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "ponto_turistico")
public class PontoTuristico {

    @Id
    @Column(length = 36)
    private String id;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "text", nullable = false)
    private String descricao;

    private String cidade;
    private String estado;
    private String pais;
    private String endereco;

    private Double latitude;
    private Double longitude;

    @Column(columnDefinition = "text")
    private String comoChegarTexto;

    // relacionamentos: exemplo com hospedagens (se já tem classe Hospedagem)
    @OneToMany(mappedBy = "pontoTuristico", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Hospedagem> hospedagens = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public PontoTuristico() {
        this.id = UUID.randomUUID().toString();
    }

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // getters e setters (gerar no IDE)
    // ... (coloque todos os getters e setters para cada campo)

    // Exemplos:
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

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

    public List<Hospedagem> getHospedagens() { return hospedagens; }
    public void setHospedagens(List<Hospedagem> hospedagens) { this.hospedagens = hospedagens; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
