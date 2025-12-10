import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [error, setError] = useState("");
  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validações
    if (!formData.email || !formData.senha) {
      setError("Preencha os campos obrigatórios");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("E-mail inválido");
      return;
    }

    if (!isLogin) {
      if (!formData.nome) {
        setError("Nome é obrigatório");
        return;
      }
      if (formData.senha !== formData.confirmarSenha) {
        setError("As senhas não são iguais");
        return;
      }
    }

    const result = isLogin
      ? await login({ email: formData.email, senha: formData.senha })
      : await register(formData);

    if (result.success) {
      onClose();
      setFormData({ nome: "", email: "", senha: "", confirmarSenha: "" });
    } else {
      setError(result.error || "Ocorreu um erro");
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ nome: "", email: "", senha: "", confirmarSenha: "" });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2>{isLogin ? "Entrar" : "Criar Conta"}</h2>
          <button onClick={onClose} style={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Nome Completo *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="input"
                placeholder="Seu nome"
              />
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>E-mail *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="seu@email.com"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Senha *</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="input"
              placeholder="••••••••"
            />
          </div>

          {!isLogin && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Confirmar Senha *</label>
              <input
                type="password"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                className="input"
                placeholder="••••••••"
              />
            </div>
          )}

          {error && <div style={styles.error}>{error}</div>}

          <button
            type="submit"
            className="btn btn-accent"
            style={styles.submitBtn}
          >
            {isLogin ? "Entrar" : "Criar Conta"}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
            <button onClick={toggleMode} style={styles.toggleBtn}>
              {isLogin ? "Criar conta" : "Fazer login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--text-secondary)",
    padding: "0.25rem",
    display: "flex",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontWeight: "500",
    color: "var(--text-primary)",
    fontSize: "0.95rem",
  },
  error: {
    backgroundColor: "#fee",
    color: "#c33",
    padding: "0.75rem",
    borderRadius: "6px",
    fontSize: "0.9rem",
  },
  submitBtn: {
    marginTop: "0.5rem",
    width: "100%",
    justifyContent: "center",
  },
  footer: {
    marginTop: "1.5rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid var(--border-color)",
    textAlign: "center",
  },
  footerText: {
    color: "var(--text-secondary)",
    fontSize: "0.95rem",
  },
  toggleBtn: {
    background: "none",
    border: "none",
    color: "var(--primary-color)",
    fontWeight: "500",
    cursor: "pointer",
    marginLeft: "0.5rem",
    fontSize: "0.95rem",
  },
};

export default AuthModal;
