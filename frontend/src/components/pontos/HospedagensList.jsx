import { useState, useEffect } from 'react';
import { Home, Phone, DollarSign, ExternalLink, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { hospedagensAPI } from '../../services/api';
import HospedagemFormModal from './HospedagemFormModal';

const HospedagensList = ({ pontoId }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  const [hospedagens, setHospedagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [hospedagemEdit, setHospedagemEdit] = useState(null);

  useEffect(() => {
    loadHospedagens();
  }, [pontoId]);

  const loadHospedagens = async () => {
    try {
      setLoading(true);
      const response = await hospedagensAPI.getAll();
      const hospedagensData = response.data || [];
      const hospedagensDoPonto = hospedagensData.filter(h => 
        h.pontoTuristico && h.pontoTuristico.id === parseInt(pontoId)
      );
      setHospedagens(hospedagensDoPonto);
    } catch (err) {
      console.error('Erro ao carregar hospedagens:', err);
    } finally {
      setLoading(false);
    }
  };

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
    setHospedagemEdit(null);
    setShowModal(true);
  };

  const handleEditHospedagem = (hospedagem) => {
    setHospedagemEdit(hospedagem);
    setShowModal(true);
  };

  const handleDeleteHospedagem = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta hospedagem?')) return;
    
    try {
      await hospedagensAPI.delete(id);
      await loadHospedagens();
      alert('Hospedagem excluída com sucesso!');
    } catch (err) {
      console.error('Erro ao excluir hospedagem:', err);
      alert('Erro ao excluir hospedagem. Tente novamente.');
    }
  };

  const handleHospedagemSuccess = async (novaHospedagem) => {
    try {
      const hospedagemData = {
        nome: novaHospedagem.nome,
        endereco: novaHospedagem.endereco,
        telefone: novaHospedagem.telefone,
        tipo: novaHospedagem.tipo,
        site: novaHospedagem.linkReserva,
        precoMedio: novaHospedagem.precoMedio,
        pontoTuristicoId: parseInt(pontoId)
      };

      if (hospedagemEdit) {
        await hospedagensAPI.update(hospedagemEdit.id, hospedagemData);
      } else {
        await hospedagensAPI.create(hospedagemData);
      }
      
      await loadHospedagens();
    } catch (err) {
      console.error('Erro ao salvar hospedagem:', err);
      alert('Erro ao salvar hospedagem. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <p style={styles.loadingText}>Carregando hospedagens...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {isAuthenticated && (
        <button 
          onClick={handleAddHospedagem}
          className="btn btn-outline"
          style={styles.addBtn}
        >
          <Plus size={18} />
          Adicionar
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
                <div style={styles.headerLeft}>
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
                
                {isAuthenticated && (
                  <div style={styles.actionButtons}>
                    <button 
                      onClick={() => handleEditHospedagem(hospedagem)}
                      style={styles.iconBtn}
                      title="Editar"
                    >
                      <Edit size={16} color="#007BFF" />
                    </button>
                    {isAdmin && (
                      <button 
                        onClick={() => handleDeleteHospedagem(hospedagem.id)}
                        style={styles.iconBtn}
                        title="Excluir"
                      >
                        <Trash2 size={16} color="#dc3545" />
                      </button>
                    )}
                  </div>
                )}
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

                {hospedagem.precoMedio && (
                  <div style={styles.infoItem}>
                    <DollarSign size={16} color="#6c757d" />
                    <span>
                      <strong>R$ {parseFloat(hospedagem.precoMedio).toFixed(2)}</strong> / noite (média)
                    </span>
                  </div>
                )}
              </div>

              {hospedagem.site && (
                <a 
                  href={hospedagem.site}
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

      {showModal && (
        <HospedagemFormModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setHospedagemEdit(null);
          }}
          onSuccess={handleHospedagemSuccess}
          hospedagemEdit={hospedagemEdit}
          pontoId={pontoId}
        />
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
  loadingText: {
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
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: 1,
    flexWrap: 'wrap'
  },
  nome: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: 0
  },
  tipoBadge: {
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  },
  actionButtons: {
    display: 'flex',
    gap: '0.5rem'
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: 'background 0.2s'
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