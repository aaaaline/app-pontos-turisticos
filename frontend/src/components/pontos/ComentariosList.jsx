import { useState } from 'react';
import { User, Trash2, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ComentariosList = ({ pontoId, onAuthClick }) => {
  const { isAuthenticated, isAdmin, user } = useAuth();
  
  // Mock de comentários
  const [comentarios, setComentarios] = useState([
    {
      id: 1,
      usuarioId: 2,
      usuarioNome: 'Maria Silva',
      texto: 'Lugar maravilhoso para passear com a família! Muito verde e bem cuidado.',
      data: '2024-11-20T10:30:00'
    },
    {
      id: 2,
      usuarioId: 3,
      usuarioNome: 'João Santos',
      texto: 'Ótimo para fazer exercícios. A pista de caminhada é excelente!',
      data: '2024-11-19T08:15:00'
    }
  ]);

  const [novoComentario, setNovoComentario] = useState('');
  const [error, setError] = useState('');

  const handleAddComentario = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      onAuthClick();
      return;
    }

    if (!novoComentario.trim()) {
      setError('O comentário não pode estar vazio');
      return;
    }

    if (novoComentario.length > 500) {
      setError('O comentário deve ter no máximo 500 caracteres');
      return;
    }

    try {
      // TODO: Fazer requisição para API
      const novoComentarioObj = {
        id: Date.now(),
        usuarioId: user.id,
        usuarioNome: user.nome,
        texto: novoComentario,
        data: new Date().toISOString()
      };

      setComentarios([novoComentarioObj, ...comentarios]);
      setNovoComentario('');
    } catch (err) {
      setError('Erro ao adicionar comentário');
    }
  };

  const handleDeleteComentario = async (comentarioId) => {
    if (!window.confirm('Tem certeza que deseja excluir este comentário?')) return;

    try {
      // TODO: Fazer requisição para API
      setComentarios(comentarios.filter(c => c.id !== comentarioId));
    } catch (err) {
      console.error('Erro ao excluir comentário:', err);
    }
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const agora = new Date();
    const diffMs = agora - data;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHoras = Math.floor(diffMs / 3600000);
    const diffDias = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins} min atrás`;
    if (diffHoras < 24) return `${diffHoras}h atrás`;
    if (diffDias < 7) return `${diffDias}d atrás`;
    
    return data.toLocaleDateString('pt-BR');
  };

  const podeExcluir = (comentarioUserId) => {
    return isAuthenticated && (isAdmin || user?.id === comentarioUserId);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleAddComentario} style={styles.novoComentarioForm}>
        <textarea
          value={novoComentario}
          onChange={(e) => setNovoComentario(e.target.value)}
          className="input"
          rows="3"
          maxLength="500"
          placeholder={isAuthenticated ? "Compartilhe sua experiência..." : "Faça login para comentar"}
          disabled={!isAuthenticated}
          style={styles.textarea}
        />
        <div style={styles.formFooter}>
          <span style={styles.charCount}>
            {novoComentario.length}/500
          </span>
          {!isAuthenticated ? (
            <button 
              type="button"
              onClick={onAuthClick}
              className="btn btn-primary"
            >
              Fazer Login
            </button>
          ) : (
            <button type="submit" className="btn btn-accent">
              <Send size={18} />
              Publicar
            </button>
          )}
        </div>
        {error && <div style={styles.error}>{error}</div>}
      </form>

      <div style={styles.comentariosList}>
        {comentarios.length === 0 ? (
          <p style={styles.emptyState}>
            Não existem comentários sobre esse local!
          </p>
        ) : (
          comentarios.map((comentario) => (
            <div key={comentario.id} style={styles.comentarioCard}>
              <div style={styles.comentarioHeader}>
                <div style={styles.userInfo}>
                  <div style={styles.avatar}>
                    <User size={20} />
                  </div>
                  <div>
                    <strong style={styles.userName}>{comentario.usuarioNome}</strong>
                    <span style={styles.date}>{formatarData(comentario.data)}</span>
                  </div>
                </div>
                {podeExcluir(comentario.usuarioId) && (
                  <button 
                    onClick={() => handleDeleteComentario(comentario.id)}
                    style={styles.deleteBtn}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <p style={styles.comentarioTexto}>{comentario.texto}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  novoComentarioForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  textarea: {
    resize: 'vertical'
  },
  formFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  charCount: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)'
  },
  error: {
    backgroundColor: '#fee',
    color: '#c33',
    padding: '0.75rem',
    borderRadius: '6px',
    fontSize: '0.9rem'
  },
  comentariosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  emptyState: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    padding: '2rem',
    fontSize: '1rem'
  },
  comentarioCard: {
    padding: '1rem',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '8px',
    border: '1px solid var(--border-color)'
  },
  comentarioHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.75rem'
  },
  userInfo: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center'
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userName: {
    fontSize: '0.95rem',
    color: 'var(--text-primary)',
    display: 'block'
  },
  date: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    marginLeft: '0.5rem'
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: '#dc3545',
    cursor: 'pointer',
    padding: '0.25rem'
  },
  comentarioTexto: {
    color: 'var(--text-primary)',
    lineHeight: '1.6',
    margin: 0
  }
};

export default ComentariosList;