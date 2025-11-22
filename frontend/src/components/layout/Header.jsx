import { Link } from "react-router-dom";
import { MapPin, User, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Header = ({ onAuthClick }) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo}>
          <MapPin size={32} color="#007BFF" />
          <h1 style={styles.logoText}>TurisMap</h1>
        </Link>

        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>
            Explorar
          </Link>

          {isAuthenticated ? (
            <div style={styles.userMenu}>
              <span style={styles.userName}>
                <User size={18} />
                {user.nome}
              </span>
              <button
                onClick={logout}
                className="btn btn-outline"
                style={styles.logoutBtn}
              >
                <LogOut size={18} />
                Sair
              </button>
            </div>
          ) : (
            <button onClick={onAuthClick} className="btn btn-primary">
              <User size={18} />
              Entrar
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "var(--bg-white)",
    borderBottom: "1px solid var(--border-color)",
    padding: "1rem 0",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "var(--shadow-sm)",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    textDecoration: "none",
  },
  logoText: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    color: "var(--primary-color)",
    margin: 0,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  navLink: {
    fontSize: "1rem",
    fontWeight: "500",
    color: "var(--text-primary)",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
  userMenu: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "var(--text-primary)",
    fontWeight: "500",
  },
  logoutBtn: {
    padding: "0.5rem 1rem",
  },
};

export default Header;
