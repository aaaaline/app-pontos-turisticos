import { MapPin, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const PontoCard = ({ ponto }) => {
  const mediaNotas = ponto.mediaNotas || 0;
  const totalAvaliacoes = ponto.totalAvaliacoes || 0;

  return (
    <Link to={`/ponto/${ponto.id}`} style={styles.cardLink}>
      <div className="card" style={styles.card}>
        <div style={styles.content}>
          <div style={styles.header}>
            <h3 style={styles.title}>{ponto.nome}</h3>
            <button style={styles.favoriteBtn} onClick={(e) => e.preventDefault()}>
              <Heart size={20} />
            </button>
          </div>

          <div style={styles.location}>
            <MapPin size={16} color="#6c757d" />
            <span>
              {ponto.cidade}, {ponto.estado}
            </span>
          </div>

          <p style={styles.description}>
            {ponto.descricao?.substring(0, 120)}
            {ponto.descricao?.length > 120 ? "..." : ""}
          </p>

          {totalAvaliacoes > 0 && (
            <div style={styles.rating}>
              <div style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    fill={star <= mediaNotas ? "#FFA500" : "none"}
                    color={star <= mediaNotas ? "#FFA500" : "#E9ECEF"}
                  />
                ))}
              </div>
              <span style={styles.ratingText}>
                {mediaNotas.toFixed(1)} ({totalAvaliacoes}{" "}
                {totalAvaliacoes === 1 ? "avaliação" : "avaliações"})
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

const styles = {
  cardLink: {
    textDecoration: "none",
    color: "inherit",
  },
  card: {
    overflow: "hidden",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  content: {
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    flex: 1,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "0.5rem",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0,
    flex: 1,
  },
  favoriteBtn: {
    background: "none",
    border: "1px solid var(--border-color)",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    flexShrink: 0,
  },
  location: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "var(--text-secondary)",
    fontSize: "0.9rem",
  },
  description: {
    color: "var(--text-secondary)",
    fontSize: "0.95rem",
    lineHeight: "1.5",
    margin: 0,
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "auto",
    paddingTop: "0.5rem",
    borderTop: "1px solid var(--border-color)",
  },
  stars: {
    display: "flex",
    gap: "0.25rem",
  },
  ratingText: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
  },
};

export default PontoCard;
