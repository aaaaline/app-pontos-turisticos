import { useState } from 'react';
import { Home, Phone, DollarSign, ExternalLink, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const HospedagensList = ({ pontoId }) => {
  const { isAuthenticated } = useAuth();
  
  // Mock de hospedagens
  const [hospedagens] = useState([
    {
      id: 1,
      nome: 'Hotel Central Plaza',
      endereco: 'Av. Goiás, 1234 - Centro',
      telefone: '(62) 3241-5678',
      precoMedio: 250,
      tipo: 'hotel',
      linkReserva: 'https://booking.com'
    },
    {
      id: 2,
      nome: 'Pousada Aconchego',
      endereco: 'Rua das Flores, 567',
      telefone: '(62) 3245-9012',
      precoMedio: 150,
      tipo: 'pousada',
      linkReserva: 'https://booking.com'
    },
    {
      id: 3,
      nome: 'Hostel da Praça',
      endereco: 'Praça Central, 89',
      telefone: '(62) 99876-5432',
      precoMedio: 80,
      tipo: 'hostel',
      linkReserva: 'https://booking.com'
    }
  ]);

  const getTipoLabel = (tipo) => {
    const tipos = {
      hotel: 'Hotel',
      pousada: 'Pousada',
      hostel: 'Hostel'
    };
    return tipos[tipo] || tipo;
  };

  const getTipoColor = (tipo) => {
    const cores = {
      hotel: '#007BFF',
      pousada: '#28a745',
      hostel: '#FFA500'
    };
    return cores[tipo] || '#6c757d';
  };

  const handleAddHospedagem = () => {
    if (!isAuthenticated) {
      alert('Faça login para adicionar hospedagens');
      return;
    }
    // TODO: Abrir modal de adicionar hospedagem
  };

  return (
    <div style={styles.container}>
      {isAuthenticated && (
        <button 
          onClick={handleAddHospedagem}
          className="btn btn-outline"
          style={styles.addBtn}
        >
          <Plus size={18} />
          Adicionar Hospedagem
        </button>
      )}

      {hospedagens.length === 0 ? (
        <p style={styles.emptyState}>
          Nenhuma hospedagem cadastrada ainda.
        </p>
      ) : (
        <div style={styles.list}>
          {hospedagens.map((hospedagem) => (
            <div key={hospedagem.id} style={styles.card}>
              <div style={styles.header}>
                <h4 style={styles.nome}>{hospedagem.nome}</h4>
                <span 
                  style={{
                    ...styles.tipoBadge,
                    backgroundColor: getTipoColor(hospedagem.tipo) + '20',
                    color: getTipoColor(hospedagem.tipo)
                  }}
                >
                  {getTipoLabel(hospedagem.tipo)}
                </span>
              </div>

              <div style={styles.info}>
                <div style={styles.infoItem}>
                  <Home size={16} color="#6c757d" />
                  <span>{hospedagem.endereco}</span>
                </div>

                {hospedagem.telefone && (
                  <div style={styles.infoItem}>
                    <Phone size={16} color="#6c757d" />
                    <a href={`tel:${hospedagem.telefone}`} style={styles.link}>
                      {hospedagem.telefone}
                    </a>
                  </div>
                )}

                <div style={styles.infoItem}>
                  <DollarSign size={16} color="#6c757d" />
                  <span>
                    <strong>R$ {hospedagem.precoMedio.toFixed(2)}</strong> / noite (média)
                  </span>
                </div>
              </div>

              {hospedagem.linkReserva && (
                <a 
                  href={hospedagem.linkReserva}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={styles.reservaBtn}
                >
                  Ver Disponibilidade
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  addBtn: {
    width: '100%',
    justifyContent: 'center'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  emptyState: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    padding: '2rem 1rem',
    fontSize: '0.95rem'
  },
  card: {
    padding: '1rem',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '0.5rem'
  },
  nome: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: 0,
    flex: 1
  },
  tipoBadge: {
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)'
  },
  link: {
    color: 'var(--primary-color)',
    textDecoration: 'none'
  },
  reservaBtn: {
    width: '100%',
    justifyContent: 'center',
    fontSize: '0.9rem',
    padding: '0.5rem'
  }
};

export default HospedagensList;