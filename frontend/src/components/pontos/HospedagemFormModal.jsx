import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const HospedagemFormModal = ({ isOpen, onClose, onSuccess, hospedagemEdit, pontoId }) => {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    precoMedio: '',
    tipo: 'hotel',
    linkReserva: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (hospedagemEdit) {
      setFormData({
        nome: hospedagemEdit.nome || '',
        endereco: hospedagemEdit.endereco || '',
        telefone: hospedagemEdit.telefone || '',
        precoMedio: hospedagemEdit.precoMedio || '',
        tipo: hospedagemEdit.tipo || '',
        linkReserva: hospedagemEdit.linkReserva || ''
      });
    }
  }, [hospedagemEdit]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!formData.nome.trim()) {
      setError('Nome é obrigatório');
      return;
    }
    if (!formData.endereco.trim()) {
      setError('Endereço é obrigatório');
      return;
    }
    if (!formData.precoMedio || formData.precoMedio <= 0) {
      setError('Preço médio deve ser maior que zero');
      return;
    }

    try {
      // TODO: Fazer requisição para API
      const hospedagemData = {
        ...formData,
        pontoId,
        precoMedio: parseFloat(formData.precoMedio)
      };
      
      console.log('Salvando hospedagem:', hospedagemData);
      
      if (onSuccess) onSuccess(hospedagemData);
      onClose();
      
      setFormData({
        nome: '',
        endereco: '',
        telefone: '',
        precoMedio: '',
        tipo: 'hotel',
        linkReserva: ''
      });
      
      alert(hospedagemEdit ? 'Hospedagem atualizada com sucesso!' : 'Hospedagem cadastrada com sucesso!');
    } catch (err) {
      setError('Erro ao salvar.');
    }
  };

  const handleClose = () => {
    setFormData({
      nome: '',
      endereco: '',
      telefone: '',
      precoMedio: '',
      tipo: 'hotel',
      linkReserva: ''
    });
    setError('');
    onClose();
  };

  const modalContent = (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={styles.modal}>
        <div style={styles.header}>
          <h2>{hospedagemEdit ? 'Editar Hospedagem' : 'Nova Hospedagem'}</h2>
          <button onClick={handleClose} style={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nome *</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="input"
              placeholder="Ex: Hotel Central Plaza"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Tipo *</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="input"
            >
              <option value="hotel">Hotel</option>
              <option value="pousada">Pousada</option>
              <option value="hostel">Hostel</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Endereço *</label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="input"
              placeholder="Ex: Av. Goiás, 1234 - Centro"
            />
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Telefone</label>
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className="input"
                placeholder="(62) 3241-5678"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Preço Médio (R$) *</label>
              <input
                type="number"
                name="precoMedio"
                value={formData.precoMedio}
                onChange={handleChange}
                className="input"
                placeholder="250.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Link de Reserva</label>
            <input
              type="url"
              name="linkReserva"
              value={formData.linkReserva}
              onChange={handleChange}
              className="input"
              placeholder="https://booking.com"
            />
          </div>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <div style={styles.actions}>
            <button 
              type="button"
              onClick={handleClose}
              className="btn btn-outline"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-accent">
              {hospedagemEdit ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const styles = {
  modal: {
    maxWidth: '600px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
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
    gap: '1rem'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontWeight: '500',
    color: 'var(--text-primary)',
    fontSize: '0.95rem'
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
    justifyContent: 'flex-end',
    marginTop: '1rem'
  }
};

export default HospedagemFormModal;