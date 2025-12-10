import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import SearchBar from "../components/common/SearchBar";
import PontoCard from "../components/pontos/PontoCard";
import PontoFormModal from "../components/pontos/PontoFormModal";
import { useAuth } from "../context/AuthContext";
import { pontosAPI, avaliacoesAPI } from "../services/api";

const Home = ({ onAuthClick }) => {
  const { isAuthenticated } = useAuth();
  const [pontos, setPontos] = useState([]);
  const [filteredPontos, setFilteredPontos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPontoModal, setShowPontoModal] = useState(false);
  const [error, setError] = useState("");
  const pontosPerPage = 12;

  useEffect(() => {
    loadPontos();
  }, []);

  const loadPontos = async () => {
  try {
    setError("");
    const response = await pontosAPI.getAll();
    const page = response.data || {};
    const pontosData = Array.isArray(page.content) ? page.content : [];

    const pontosComAvaliacoes = await Promise.all(
      pontosData.map(async (ponto) => {
        try {
          const mediaResponse = await avaliacoesAPI.getMedia(ponto.id);
          return {
            ...ponto,
            mediaNotas: mediaResponse.data ?? 0,
            totalAvaliacoes: 0,
          };
        } catch {
          return {
            ...ponto,
            mediaNotas: 0,
            totalAvaliacoes: 0,

          };
        }
      })
    );

    setPontos(pontosComAvaliacoes);
    setFilteredPontos(pontosComAvaliacoes);
  } catch (err) {
    console.error("Erro ao carregar pontos:", err);
    setError("Erro ao carregar pontos turísticos. Tente novamente.");
  }
};


  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredPontos(pontos);
      return;
    }

    const filtered = pontos.filter(
      (ponto) =>
        ponto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ponto.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ponto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPontos(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...pontos];

    if (filters.cidade) {
      filtered = filtered.filter((p) =>
        p.cidade.toLowerCase().includes(filters.cidade.toLowerCase())
      );
    }

    if (filters.estado) {
      filtered = filtered.filter((p) =>
        p.estado.toLowerCase().includes(filters.estado.toLowerCase())
      );
    }

    if (filters.avaliacaoMinima > 0) {
      filtered = filtered.filter(
        (p) => p.mediaNotas >= filters.avaliacaoMinima
      );
    }

    setFilteredPontos(filtered);
    setCurrentPage(1);
  };

  const handleAddPonto = () => {
    if (!isAuthenticated) {
      onAuthClick();
    } else {
      setShowPontoModal(true);
    }
  };

  const handlePontoSuccess = async (novoPonto) => {
    try {
      const response = await pontosAPI.create({
        nome: novoPonto.nome,
        descricao: novoPonto.descricao,
        cidade: novoPonto.cidade,
        estado: novoPonto.estado,
        pais: novoPonto.pais,
        latitude: novoPonto.latitude ? parseFloat(novoPonto.latitude) : null,
        longitude: novoPonto.longitude ? parseFloat(novoPonto.longitude) : null,
        endereco: novoPonto.endereco,
        comoChegarTexto: novoPonto.comoChegar
      });
      
      await loadPontos();
    } catch (err) {
      console.error("Erro ao criar ponto:", err);
      alert("Erro ao criar ponto turístico.");
    }
  };

  const indexOfLastPonto = currentPage * pontosPerPage;
  const indexOfFirstPonto = indexOfLastPonto - pontosPerPage;
  const currentPontos = filteredPontos.slice(
    indexOfFirstPonto,
    indexOfLastPonto
  );
  const totalPages = Math.ceil(filteredPontos.length / pontosPerPage);

  return (
    <div style={styles.container}>
      <div className="container" style={styles.mainContent}>
        <div style={styles.actionBar}>
          <h2 style={styles.sectionTitle}>Pontos Turísticos</h2>

          <button onClick={handleAddPonto} className="btn btn-accent">
            <Plus size={20} />
            Adicionar Ponto
          </button>
        </div>

        <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />

        {currentPontos.length > 0 ? (
          <>
            <div className="grid grid-3">
              {currentPontos.map((ponto) => (
                <PontoCard key={ponto.id} ponto={ponto} />
              ))}
            </div>

            {totalPages > 1 && (
              <div style={styles.pagination}>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="btn btn-outline"
                  style={styles.paginationBtn}
                >
                  Anterior
                </button>

                <span style={styles.pageInfo}>
                  Página {currentPage} de {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="btn btn-outline"
                  style={styles.paginationBtn}
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={styles.emptyState}>
            <p>Nenhum ponto turístico encontrado.</p>
          </div>
        )}
      </div>

      <PontoFormModal
        isOpen={showPontoModal}
        onClose={() => setShowPontoModal(false)}
        onSuccess={handlePontoSuccess}
      />
    </div>
  );
};

const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
  },
  mainContent: {
    paddingTop: "3rem",
    paddingBottom: "3rem",
  },
  actionBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  sectionTitle: {
    fontSize: "1.75rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    marginTop: "3rem",
  },
  paginationBtn: {
    minWidth: "100px",
  },
  pageInfo: {
    color: "var(--text-secondary)",
    fontSize: "0.95rem",
  },
  emptyState: {
    textAlign: "center",
    padding: "4rem 1rem",
    color: "var(--text-secondary)",
    fontSize: "1.1rem",
  },
};

export default Home;
