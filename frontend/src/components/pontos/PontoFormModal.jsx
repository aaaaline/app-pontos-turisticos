import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const PontoFormModal = ({ isOpen, onClose, onSuccess, pontoEdit }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    cidade: '',
    estado: '',
    pais: 'Brasil',
    latitude: '',
    longitude: '',
    endereco: '',
    comoChegar: '',
    tipo: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (pontoEdit) {
      setFormData({
        nome: pontoEdit.nome || '',
        descricao: pontoEdit.descricao || '',
        cidade: pontoEdit.cidade || '',
        estado: pontoEdit.estado || '',
        pais: pontoEdit.pais || 'Brasil',
        latitude: pontoEdit.latitude || '',
        longitude: pontoEdit.longitude || '',
        endereco: pontoEdit.endereco || '',
        comoChegar: pontoEdit.comoChegarTexto || pontoEdit.comoChegar || '',
        tipo: pontoEdit.tipo || ''
      });
    }
  }, [pontoEdit]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validações obrigatórias
    if (!formData.nome.trim()) {
      setError('Nome é obrigatório');
      return;
    }
    if (!formData.cidade.trim()) {
      setError('Cidade é obrigatória');
      return;
    }
    if (!formData.descricao.trim()) {
      setError('Descrição é obrigatória');
      return;
    }

    try {
      console.log('Salvando ponto:', formData);
      
      if (onSuccess) onSuccess(formData);
      onClose();
      
      setFormData({
        nome: '',
        descricao: '',
        cidade: '',
        estado: '',
        pais: 'Brasil',
        latitude: '',
        longitude: '',
        endereco: '',
        comoChegar: '',
        tipo: ''
      });
      
      alert(pontoEdit ? 'Ponto atualizado com sucesso!' : 'Ponto cadastrado com sucesso!');
    } catch (err) {
      setError('Erro ao salvar.');
    }
  };

  const handleClose = () => {
    setFormData({
      nome: '',
      descricao: '',
      cidade: '',
      estado: '',
      pais: 'Brasil',
      latitude: '',
      longitude: '',
      endereco: '',
      comoChegar: '',
      tipo: ''
    });
    setError('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={styles.modalLarge}>
        <div style={styles.header}>
          <h2>{pontoEdit ? 'Editar Ponto Turístico' : 'Novo Ponto Turístico'}</h2>
          <button onClick={handleClose} style={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Nome *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="input"
                placeholder="Ex: Parque Vaca Brava"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Tipo</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="input"
              >
                <option value="">Selecione...</option>
                <option value="parque">Parque</option>
                <option value="museu">Museu</option>
                <option value="praia">Praia</option>
                <option value="monumento">Monumento</option>
                <option value="igreja">Igreja</option>
                <option value="mirante">Mirante</option>
                <option value="shopping">Shopping</option>
                <option value="restaurante">Restaurante</option>
                <option value="cachoeira">Cachoeira</option>
                <option value="trilha">Trilha</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Cidade *</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                className="input"
                placeholder="Ex: Goiânia"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Estado</label>
              <input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="input"
                placeholder="Ex: GO"
                maxLength="2"
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>País</label>
            <input
              type="text"
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              className="input"
              placeholder="Ex: Brasil"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Descrição *</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="input"
              rows="4"
              placeholder="Descreva o ponto turístico"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Endereço</label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="input"
              placeholder="Ex: Av. T-2, Setor Bueno"
            />
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Latitude</label>
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="input"
                placeholder="Ex: -16.7108822"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Longitude</label>
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="input"
                placeholder="Ex: -49.2647891"
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Como Chegar</label>
            <textarea
              name="comoChegar"
              value={formData.comoChegar}
              onChange={handleChange}
              className="input"
              rows="3"
              placeholder="Descreva como chegar ao local..."
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
              {pontoEdit ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  modalLarge: {
    maxWidth: '700px',
    maxHeight: '90vh',
    overflowY: 'auto'
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

export default PontoFormModal;
