import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const SearchBar = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    cidade: "",
    estado: "",
    avaliacaoMinima: 0,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSearch} style={styles.searchForm}>
        <div style={styles.searchInputContainer}>
          <Search size={20} color="#6c757d" style={styles.searchIcon} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar pontos turísticos..."
            className="input"
            style={styles.searchInput}
          />
        </div>

        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="btn btn-outline"
          style={styles.filterBtn}
        >
          <SlidersHorizontal size={20} />
          Filtros
        </button>

        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </form>

      {/* Opções de Filtros */}
      {showFilters && (
        <div style={styles.filtersPanel}>
          <div style={styles.filterGrid}>
            <div style={styles.filterGroup}>
              <label style={styles.label}>Cidade</label>
              <input
                type="text"
                value={filters.cidade}
                onChange={(e) => handleFilterChange("cidade", e.target.value)}
                placeholder="Ex: Goiânia"
                className="input"
              />
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Estado</label>
              <input
                type="text"
                value={filters.estado}
                onChange={(e) => handleFilterChange("estado", e.target.value)}
                placeholder="Ex: GO"
                className="input"
              />
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.label}>Avaliação Mínima</label>
              <select
                value={filters.avaliacaoMinima}
                onChange={(e) =>
                  handleFilterChange("avaliacaoMinima", Number(e.target.value))
                }
                className="input"
              >
                <option value={0}>Todas</option>
                <option value={3}>3+ estrelas</option>
                <option value={4}>4+ estrelas</option>
                <option value={5}>5 estrelas</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => {
              setFilters({ cidade: "", estado: "", avaliacaoMinima: 0 });
              if (onFilterChange) {
                onFilterChange({ cidade: "", estado: "", avaliacaoMinima: 0 });
              }
            }}
            style={styles.clearBtn}
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    marginBottom: "2rem",
  },
  searchForm: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    flexWrap: "wrap",
  },
  searchInputContainer: {
    position: "relative",
    flex: 1,
    minWidth: "250px",
  },
  searchIcon: {
    position: "absolute",
    left: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
  searchInput: {
    paddingLeft: "2.5rem",
    width: "100%",
  },
  filterBtn: {
    whiteSpace: "nowrap",
  },
  filtersPanel: {
    marginTop: "1rem",
    padding: "1.5rem",
    backgroundColor: "var(--bg-secondary)",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
  },
  filterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    marginBottom: "1rem",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontWeight: "500",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
  },
  clearBtn: {
    background: "none",
    border: "none",
    color: "var(--primary-color)",
    cursor: "pointer",
    fontWeight: "500",
    padding: "0.5rem",
    fontSize: "0.9rem",
  },
};

export default SearchBar;
