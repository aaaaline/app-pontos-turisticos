import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  Heart,
  Edit,
  Trash2,
  Home,
  Upload,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AvaliacaoForm from "../components/pontos/AvaliacaoForm";
import ComentariosList from "../components/pontos/ComentariosList";
import HospedagensList from "../components/pontos/HospedagensList";
import GaleriaFotos from "../components/pontos/GaleriaFotos";
import PontoFormModal from "../components/pontos/PontoFormModal";

const PontoDetalhesPage = ({ onAuthClick }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user } = useAuth();

  const [ponto] = useState({
    id: 1,
    nome: "Parque Vaca Brava",
    descricao:
      "Um dos principais parques de Goiânia, ideal para caminhadas e atividades ao ar livre. O parque conta com área verde, pista de caminhada, ciclovia, playground e muito mais.",
    cidade: "Goiânia",
    estado: "GO",
    pais: "Brasil",
    latitude: -16.7108822,
    longitude: -49.2647891,
    endereco: "Av. T-2, Setor Bueno",
    comoChegar:
      "Localizado no Setor Bueno, próximo ao Shopping Flamboyant. Acesso fácil pela Av. T-2.",
    mediaNotas: 4.5,
    totalAvaliacoes: 120,
    criadoPor: 1,
    fotos: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
        titulo: "Vista principal",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
        titulo: "Área verde",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
        titulo: "Pista de caminhada",
      },
    ],
  });

  const [isFavorite, setIsFavorite] = useState(false);
  const [showAvaliacaoForm, setShowAvaliacaoForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditSuccess = (pontoAtualizado) => {
    // TODO: Atualizar ponto na API e no estado
    console.log('Ponto atualizado:', pontoAtualizado);
  };

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este ponto turístico?")) {
      // TODO: Fazer requisição DELETE para API
      console.log('Excluindo ponto:', id);
      alert("Ponto turístico excluído com sucesso!");
      navigate("/");
    }
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      onAuthClick();
      return;
    }
    setIsFavorite(!isFavorite);
  };

  const handleAvaliar = () => {
    if (!isAuthenticated) {
      onAuthClick();
      return;
    }
    setShowAvaliacaoForm(!showAvaliacaoForm);
  };

  const canEdit = isAuthenticated && (isAdmin || user?.id === ponto.criadoPor);

  return (
    <div style={styles.container}>
      <div style={styles.heroSection}>
        <div className="container">
          <h1 style={styles.title}>{ponto.nome}</h1>
          <div style={styles.location}>
            <MapPin size={20} />
            <span>
              {ponto.cidade}, {ponto.estado} - {ponto.pais}
            </span>
          </div>
        </div>
      </div>

      <div className="container" style={styles.content}>
        <div style={styles.actions}>
          <div style={styles.rating}>
            <div style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  fill={
                    star <= Math.round(ponto.mediaNotas) ? "#FFA500" : "none"
                  }
                  color={
                    star <= Math.round(ponto.mediaNotas) ? "#FFA500" : "#E9ECEF"
                  }
                />
              ))}
            </div>
            <span style={styles.ratingText}>
              {ponto.mediaNotas.toFixed(1)} ({ponto.totalAvaliacoes} avaliações)
            </span>
          </div>

          <div style={styles.actionButtons}>
            <button
              onClick={handleToggleFavorite}
              className="btn btn-outline"
              style={styles.actionBtn}
            >
              <Heart
                size={20}
                fill={isFavorite ? "#FF0000" : "none"}
                color={isFavorite ? "#FF0000" : "currentColor"}
              />
              {isFavorite ? "Favoritado" : "Favoritar"}
            </button>

            <button onClick={handleAvaliar} className="btn btn-accent">
              <Star size={20} />
              Avaliar
            </button>

            {canEdit && (
              <>
                <button onClick={handleEdit} className="btn btn-primary">
                  <Edit size={20} />
                  Editar
                </button>

                {isAdmin && (
                  <button
                    onClick={handleDelete}
                    className="btn"
                    style={styles.deleteBtn}
                  >
                    <Trash2 size={20} />
                    Excluir
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {showAvaliacaoForm && (
          <div style={styles.avaliacaoFormContainer}>
            <AvaliacaoForm
              pontoId={ponto.id}
              onClose={() => setShowAvaliacaoForm(false)}
            />
          </div>
        )}

        <div style={styles.grid}>
          <div style={styles.mainColumn}>
            <section className="card" style={styles.section}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>
                  Fotos ({ponto.fotos.length})
                </h2>
                {isAuthenticated && (
                  <button className="btn btn-outline" style={styles.uploadBtn}>
                    <Upload size={18} />
                    Adicionar Foto
                  </button>
                )}
              </div>
              <GaleriaFotos fotos={ponto.fotos} />
            </section>

            <section className="card" style={styles.section}>
              <h2 style={styles.sectionTitle}>Sobre este local</h2>
              <p style={styles.description}>{ponto.descricao}</p>
            </section>

            <section className="card" style={styles.section}>
              <h2 style={styles.sectionTitle}>Como Chegar</h2>
              <div style={styles.comoChegar}>
                <p style={styles.description}>{ponto.comoChegar}</p>
                <button
                  className="btn btn-outline"
                  style={{ marginTop: "1rem" }}
                >
                  <MapPin size={18} />
                  Ver no Mapa
                </button>
              </div>
            </section>

            <section className="card" style={styles.section}>
              <h2 style={styles.sectionTitle}>
                <MessageSquare size={24} />
                Comentários
              </h2>
              <ComentariosList pontoId={ponto.id} onAuthClick={onAuthClick} />
            </section>
          </div>

          <div style={styles.sidebar}>
            <div className="card" style={styles.infoCard}>
              <h3 style={styles.cardTitle}>Informações</h3>
              <div style={styles.infoItem}>
                <Home size={18} color="#6c757d" />
                <div>
                  <strong>Endereço</strong>
                  <p>{ponto.endereco}</p>
                </div>
              </div>
            </div>

            <div className="card" style={styles.section}>
              <h3 style={styles.cardTitle}>
                <Home size={20} />
                Hospedagens Próximas
              </h3>
              <HospedagensList pontoId={ponto.id} />
            </div>
          </div>
        </div>
      </div>

      <PontoFormModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleEditSuccess}
        pontoEdit={ponto}
      />
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "var(--bg-white)",
  },
  heroSection: {
    backgroundColor: "var(--bg-light-blue)",
    padding: "3rem 0 2rem",
    borderBottom: "1px solid var(--border-color)",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    margin: "0 0 1rem 0",
    color: "var(--text-primary)",
  },
  location: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "1.1rem",
    color: "var(--text-secondary)",
  },
  content: {
    paddingTop: "2rem",
    paddingBottom: "3rem",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "2rem",
    padding: "1.5rem",
    backgroundColor: "var(--bg-secondary)",
    borderRadius: "8px",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  stars: {
    display: "flex",
    gap: "0.25rem",
  },
  ratingText: {
    fontSize: "1rem",
    color: "var(--text-secondary)",
    fontWeight: "500",
  },
  actionButtons: {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
  },
  actionBtn: {
    whiteSpace: "nowrap",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
  },
  avaliacaoFormContainer: {
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 350px",
    gap: "2rem",
  },
  mainColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  section: {
    padding: "1.5rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "var(--text-primary)",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  description: {
    color: "var(--text-secondary)",
    lineHeight: "1.7",
    fontSize: "1rem",
    margin: 0,
  },
  comoChegar: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  uploadBtn: {
    whiteSpace: "nowrap",
  },
  infoCard: {
    padding: "1.5rem",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  infoItem: {
    display: "flex",
    gap: "1rem",
    padding: "1rem 0",
    borderBottom: "1px solid var(--border-color)",
  },
};

export default PontoDetalhesPage;
