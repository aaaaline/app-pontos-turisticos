import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import SearchBar from "../components/common/SearchBar";
import PontoCard from "../components/pontos/PontoCard";
import PontoFormModal from "../components/pontos/PontoFormModal";
import { useAuth } from "../context/AuthContext";

const Home = ({ onAuthClick }) => {
  const { isAuthenticated } = useAuth();
  const [pontos, setPontos] = useState([]);
  const [filteredPontos, setFilteredPontos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPontoModal, setShowPontoModal] = useState(false);
  const pontosPerPage = 12;

  // Mock de pontos
  useEffect(() => {
    const mockPontos = [
      {
        id: 1,
        nome: "Parque Vaca Brava",
        descricao: "Um dos principais parques de Goiânia, ideal para caminhadas e atividades ao ar livre.",
        cidade: "Goiânia",
        estado: "GO",
        mediaNotas: 4.5,
        totalAvaliacoes: 120,
        imagemPrincipal: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzQMXjQvEwlLhWlfvglqS4iXYJrCe9S-mXyLSuT7YMJ5vE8-PxRCGIfJaJA-RRb_ey9PZYHmCKrkq0oKKMI4Uoti6n0G-s1AOFxJ_0eZM4osrfjfNI5mM8F6w3vICv-VAuzqy8=w270-h312-n-k-no",
      },
      {
        id: 2,
        nome: "Feira da Lua",
        descricao: "Tradicional feira de artesanato e gastronomia que acontece toda sexta-feira.",
        cidade: "Goiânia",
        estado: "GO",
        mediaNotas: 4.8,
        totalAvaliacoes: 89,
        imagemPrincipal: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/22/03/36/feira-da-lua.jpg?w=1200&h=700&s=1",
      },
      {
        id: 3,
        nome: "Bosque dos Buritis",
        descricao: "Área verde com lago, trilhas e espaço para piquenique no coração da cidade.",
        cidade: "Goiânia",
        estado: "GO",
        mediaNotas: 4.3,
        totalAvaliacoes: 67,
        imagemPrincipal: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxosCgbktNhIsRQcnbmUVXHPlZ0zUm67CECcvYpNmpRiJLe9MKLlisyL05zf4jnyLvd4AiPMDSRRvtUWJKoAx0j_FecYzEdPgmRMSTHhlSWe207HKgApkic5BpHDBh4FsR_oo8S=w270-h312-n-k-no",
      },
      {
        id: 4,
        nome: "Cidade de Goiás",
        descricao: "Centro histórico patrimônio da UNESCO, com construções coloniais preservadas.",
        cidade: "Goiás",
        estado: "GO",
        mediaNotas: 5.0,
        totalAvaliacoes: 145,
        imagemPrincipal: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRL0UJqlfEWm0wLTmoOBbNbBOnTyhu3RD4bNGJcDw6ZeQ6713ZdqNbEghIPUGM6iyY8aPClKHnexAOn9IrdArckrFUw&s=19",
      },
      {
        id: 5,
        nome: "Cachoeira do Abade",
        descricao: "Bela cachoeira com águas cristalinas, perfeita para banho e relaxamento.",
        cidade: "Pirenópolis",
        estado: "GO",
        mediaNotas: 4.7,
        totalAvaliacoes: 98,
        imagemPrincipal: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzIG7JhvwrQJQzjmuaZvlq6iOmCKm_mPVatCveaMwsyhPl_-m-122KWiujX6Hf6GkDTkniORtdWf4vmgh-pJjs5w9Omcmzr0KbS-mcVd4C4q2awT9H7uFDhlrGM9ZiXs8k1XhZnmQ=w270-h312-n-k-no",
      },
      {
        id: 6,
        nome: "Centro Histórico de Pirenópolis",
        descricao: "Charmosa cidade colonial com ruas de pedra, igrejas antigas e muita história.",
        cidade: "Pirenópolis",
        estado: "GO",
        mediaNotas: 4.9,
        totalAvaliacoes: 156,
        imagemPrincipal: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwfa-lLc7OkWTDw9dhvT-aBysYa8N7NQC0ZwR68fs6ReOQFEIicnjU8-qzJhW3i0xKLx3bLC-XD0eO7Vn0QrHzYC3PgYBw8leD3APIqrjMVFP0lCH1fkrZgx8JFdFNUzS9vn_9p=w675-h390-n-k-no",
      },
    ];
    setPontos(mockPontos);
    setFilteredPontos(mockPontos);
  }, []);

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

  const handlePontoSuccess = (novoPonto) => {
    // TODO: Integrar com a API
    const pontoComId = {
      ...novoPonto,
      id: Date.now(),
      mediaNotas: 0,
      totalAvaliacoes: 0,
      imagemPrincipal: "https://via.placeholder.com/400x300?text=Sem+Imagem"
    };
    
    setPontos([pontoComId, ...pontos]);
    setFilteredPontos([pontoComId, ...filteredPontos]);
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
