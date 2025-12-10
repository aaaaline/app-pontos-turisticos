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
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [showPontoModal, setShowPontoModal] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [filters, setFilters] = useState({
    nome: '',
    cidade: '',
    estado: '',
    tipo: '',
    avaliacaoMinima: 0
  });

  const pontosPerPage = 12;

  useEffect(() => {
    loadPontos();
  }, [currentPage, filters]);

  const loadPontos = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const params = {
        page: currentPage,
        size: pontosPerPage,
        sort: 'nome,asc',
        ...(filters.nome && { nome: filters.nome }),
        ...(filters.cidade && { cidade: filters.cidade }),
        ...(filters.estado && { estado: filters.estado }),
        ...(filters.tipo && { tipo: filters.tipo })
      };

      const response = await pontosAPI.getAll(params);
      
      const data = response.data;
      const pontosData = data.content || [];
      
      const pontosComAvaliacoes = await Promise.all(
        pontosData.map(async (ponto) => {
          try {
            const mediaResponse = await avaliacoesAPI.getMedia(ponto.id);
            return {
              ...ponto,
              mediaNotas: mediaResponse.data || 0,
              totalAvaliacoes: 0,
            };
          } catch (err) {
            return {
              ...ponto,
              mediaNotas: 0,
              totalAvaliacoes: 0,
            };
          }
        })
      );
      
      let pontosFiltrados = pontosComAvaliacoes;
      if (filters.avaliacaoMinima > 0) {
        pontosFiltrados = pontosComAvaliacoes.filter(
          p => p.mediaNotas >= filters.avaliacaoMinima
        );
      }
      
      setPontos(pontosFiltrados);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
    } catch (err) {
      console.error("Erro ao carregar pontos:", err);
      setError("Erro ao carregar pontos turísticos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, nome: searchTerm }));
    setCurrentPage(0);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(0);
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
      await pontosAPI.create({
        nome: novoPonto.nome,
        descricao: novoPonto.descricao,
        cidade: novoPonto.cidade,
        estado: novoPonto.estado,
        pais: novoPonto.pais,
        latitude: novoPonto.latitude ? parseFloat(novoPonto.latitude) : null,
        longitude: novoPonto.longitude ? parseFloat(novoPonto.longitude) : null,
        endereco: novoPonto.endereco,
        comoChegarTexto: novoPonto.comoChegar,
        tipo: novoPonto.tipo
      });
      
      await loadPontos();
    } catch (err) {
      console.error("Erro ao criar ponto:", err);
      alert("Erro ao criar ponto turístico.");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={styles.container}>
      <div className="container" style={styles.mainContent}>
        <div style={styles.actionBar}>
          <h2 style={styles.sectionTitle}>
            Pontos Turísticos
            {totalElements > 0 && (
              <span style={styles.totalCount}>({totalElements})</span>
            )}
          </h2>

          <button onClick={handleAddPonto} className="btn btn-accent">
            <Plus size={20} />
            Adicionar Ponto
          </button>
        </div>

        <SearchBar 
          onSearch={handleSearch} 
          onFilterChange={handleFilterChange} 
        />

        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}

        {isLoading ? (
          <div style={styles.loadingState}>
            <p>Carregando pontos turísticos...</p>
          </div>
        ) : pontos.length > 0 ? (
          <>
            <div className="grid grid-3">
              {pontos.map((ponto) => (
                <PontoCard key={ponto.id} ponto={ponto} />
              ))}
            </div>

            {totalPages > 1 && (
              <div style={styles.pagination}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="btn btn-outline"
                  style={styles.paginationBtn}
                >
                  Anterior
                </button>

                <div style={styles.pageNumbers}>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index)}
                      className={`btn ${index === currentPage ? 'btn-primary' : 'btn-outline'}`}
                      style={styles.pageNumberBtn}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
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
            {(filters.nome || filters.cidade || filters.estado || filters.avaliacaoMinima > 0) && (
              <button 
                onClick={() => {
                  setFilters({
                    nome: '',
                    cidade: '',
                    estado: '',
                    tipo: '',
                    avaliacaoMinima: 0
                  });
                  setCurrentPage(0);
                }}
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
              >
                Limpar Filtros
              </button>
            )}
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
  totalCount: {
    fontSize: "1rem",
    color: "var(--text-secondary)",
    fontWeight: "400"
  },
  errorMessage: {
    backgroundColor: '#fee',
    color: '#c33',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    textAlign: 'center'
  },
  loadingState: {
    textAlign: 'center',
    padding: '4rem 1rem',
    color: 'var(--text-secondary)',
    fontSize: '1.1rem'
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    marginTop: "3rem",
    flexWrap: 'wrap'
  },
  paginationBtn: {
    minWidth: "100px",
  },
  pageNumbers: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  pageNumberBtn: {
    minWidth: '40px',
    padding: '0.5rem'
  },
  emptyState: {
    textAlign: "center",
    padding: "4rem 1rem",
    color: "var(--text-secondary)",
    fontSize: "1.1rem",
  },
};

export default Home;
