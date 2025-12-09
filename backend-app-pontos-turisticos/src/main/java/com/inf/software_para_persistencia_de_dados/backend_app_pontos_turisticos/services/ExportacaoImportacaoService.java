package com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.entities.PontoTuristico;
import com.inf.software_para_persistencia_de_dados.backend_app_pontos_turisticos.repositories.PontoTuristicoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ExportacaoImportacaoService {

    private final PontoTuristicoRepository repo;

    public ExportacaoImportacaoService(PontoTuristicoRepository repo) {
        this.repo = repo;
    }

    // ---------------- EXPORTAÇÃO JSON ----------------
    public String exportarJSON() throws Exception {
        List<PontoTuristico> lista = repo.findAll();

        ObjectMapper mapper = new ObjectMapper();
        return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(lista);
    }

    // ---------------- EXPORTAÇÃO XML ----------------
    public String exportarXML() throws Exception {
        List<PontoTuristico> lista = repo.findAll();

        XmlMapper mapper = new XmlMapper();
        return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(lista);
    }

    // ---------------- IMPORTAÇÃO JSON ----------------
    public void importarJSON(MultipartFile arquivo) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        List<PontoTuristico> pontos =
                mapper.readValue(arquivo.getInputStream(),
                        mapper.getTypeFactory().constructCollectionType(List.class, PontoTuristico.class));

        repo.saveAll(pontos);
    }

    // ---------------- IMPORTAÇÃO XML ----------------
    public void importarXML(MultipartFile arquivo) throws Exception {
        XmlMapper mapper = new XmlMapper();

        List<PontoTuristico> pontos =
                mapper.readValue(arquivo.getInputStream(),
                        mapper.getTypeFactory().constructCollectionType(List.class, PontoTuristico.class));

        repo.saveAll(pontos);
    }
}
