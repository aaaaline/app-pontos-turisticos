import { useState } from 'react';
import { Star, X } from 'lucide-react';
import { avaliacoesAPI } from '../../services/api';

const AvaliacaoForm = ({ pontoId, avaliacaoExistente, onClose, onSuccess }) => {
  const [nota, setNota] = useState(avaliacaoExistente?.nota || 0);
  const [notaHover, setNotaHover] = useState(0);
  const [comentario, setComentario] = useState(avaliacaoExistente?.comentario || '');
  const [error, setError] = useState('');
  const [isEnviando, setIsEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (nota === 0) {
      setError('Selecione uma nota de 1 a 5 estrelas');
      return;
    }

    if (comentario.length > 500) {
      setError('O comentário deve ter no máximo 500 caracteres');
      return;
    }

    setIsEnviando(true);

    try {
      const avaliacaoData = {
        pontoTuristicoId: pontoId,
        nota,
        comentario
      };

      if (avaliacaoExistente) {
        await avaliacoesAPI.update(avaliacaoExistente.id, avaliacaoData);
      } else {
        await avaliacoesAPI.create(avaliacaoData);
      }
      
      if (onSuccess) onSuccess();
      if (onClose) onClose();
      
      alert(avaliacaoExistente ? 'Avaliação atualizada!' : 'Avaliação enviada com sucesso!');
    } catch (err) {
      console.error('Erro ao enviar avaliação:', err);
      const message = err.response?.data?.message || 
                     err.response?.data?.error || 
                     'Erro ao enviar avaliação. Tente novamente.';
      setError(message);
    } finally {
      setIsEnviando(false);
    }
  };

  return (
    <div className="card" style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>
          {avaliacaoExistente ? 'Editar Avaliação' : 'Avaliar este local'}
        </h3>
        {onClose && (
          <button onClick={onClose} style={styles.closeBtn}>
            <X size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Sua nota *</label>
          <div style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNota(star)}
                onMouseEnter={() => setNotaHover(star)}
                onMouseLeave={() => setNotaHover(0)}
                style={styles.starButton}
                disabled={isEnviando}
              >
                <Star
                  size={40}
                  fill={star <= (notaHover || nota) ? '#FFA500' : 'none'}
                  color={star <= (notaHover || nota) ? '#FFA500' : '#E9ECEF'}
                  style={styles.star}
                />
              </button>
            ))}
          </div>
          {nota > 0 && (
            <p style={styles.notaTexto}>
              {nota === 1 && 'Muito ruim'}
              {nota === 2 && 'Ruim'}
              {nota === 3 && 'Regular'}
              {nota === 4 && 'Bom'}
              {nota === 5 && 'Excelente'}
            </p>
          )}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Comentário (opcional)
            <span style={styles.charCount}>
              {comentario.length}/500
            </span>
          </label>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="input"
            rows="5"
            maxLength="500"
            placeholder="Compartilhe sua experiência sobre este local..."
            style={styles.textarea}
            disabled={isEnviando}
          />
        </div>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <div style={styles.actions}>
          {onClose && (
            <button 
              type="button"
              onClick={onClose}
              className="btn btn-outline"
              disabled={isEnviando}
            >
              Cancelar
            </button>
          )}
          <button 
            type="submit" 
            className="btn btn-accent"
            disabled={isEnviando}
          >
            {isEnviando ? 'Enviando...' : (avaliacaoExistente ? 'Atualizar Avaliação' : 'Enviar Avaliação')}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '1.5rem'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '600',
    margin: 0
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  label: {
    fontWeight: '500',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  charCount: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontWeight: 'normal'
  },
  starsContainer: {
    display: 'flex',
    gap: '0.5rem'
  },
  starButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.25rem',
    transition: 'transform 0.2s ease'
  },
  star: {
    transition: 'all 0.2s ease'
  },
  notaTexto: {
    color: '#FFA500',
    fontWeight: '500',
    fontSize: '1.1rem',
    margin: 0
  },
  textarea: {
    resize: 'vertical',
    minHeight: '120px'
  },
  error: {
    backgroundColor: '#fee',
    color: '#c33',
    padding: '0.75rem',
    borderRadius: '6px',
    fontSize: '0.9rem'
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end'
  }
};

export default AvaliacaoForm;