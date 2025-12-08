import { useState } from 'react';
import { X, Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';

const UploadFotoModal = ({ isOpen, onClose, pontoId, onSuccess, fotosExistentes = [] }) => {
  const [arquivos, setArquivos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [titulos, setTitulos] = useState({});
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const MAX_FOTOS = 10;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setError('');

    const totalFotos = fotosExistentes.length + arquivos.length + files.length;
    if (totalFotos > MAX_FOTOS) {
      setError(`Máximo de ${MAX_FOTOS} fotos por ponto.`);
      return;
    }

    // Validar cada arquivo
    const validFiles = [];
    const newPreviews = [];

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError('Formato não permitido.');
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError(`Tamanho excedido.`);
        continue;
      }

      validFiles.push(file);
    }

    setArquivos([...arquivos, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    const newArquivos = arquivos.filter((_, i) => i !== index);
    setArquivos(newArquivos);
    
    const newTitulos = { ...titulos };
    delete newTitulos[index];
    setTitulos(newTitulos);
    
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (arquivos.length === 0) {
      setError('Selecione um arquivo.');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('pontoId', pontoId);

      arquivos.forEach((file, index) => {
        formData.append('fotos', file);
      });

      // Enviar para a API
      // await uploadFotos(pontoId, formData);
      
      // Simulação de upload (remover quando backend estiver pronto)
      await new Promise(resolve => setTimeout(resolve, 1500));

      alert(`${arquivos.length} foto(s) enviada(s) com sucesso!`);
      
      if (onSuccess) {
        onSuccess();
      }
      
      handleClose();
    } catch (err) {
      console.error('Erro ao fazer upload:', err);
      setError('Erro ao enviar fotos.');
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setArquivos([]);
    setPreviews([]);
    setTitulos({});
    setError('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        className="modal" 
        onClick={(e) => e.stopPropagation()} 
        style={styles.modal}
      >
        <div style={styles.header}>
          <h2>Upload de Fotos</h2>
          <button onClick={handleClose} style={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>

        <div style={styles.info}>
          <AlertCircle size={16} color="#007BFF" />
          <span>
            Máximo 10 fotos por ponto.
          </span>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.uploadArea}>
            <input
              type="file"
              id="fileInput"
              multiple
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileSelect}
              style={styles.fileInput}
              disabled={uploading}
            />
            <label 
              htmlFor="fileInput" 
              style={styles.uploadLabel}
            >
              <Upload size={32} color="#007BFF" />
              <span style={styles.uploadText}>
                Clique para selecionar fotos
              </span>
              <span style={styles.uploadSubtext}>
                ou arraste e solte aqui
              </span>
            </label>
          </div>

          {error && (
            <div style={styles.error}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div style={styles.actions}>
            <button 
              type="button"
              onClick={handleClose}
              className="btn btn-outline"
              disabled={uploading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-accent"
              disabled={uploading || arquivos.length === 0}
            >
              {uploading ? (
                <>
                  Enviando...
                </>
              ) : (
                <>
                  <Upload size={18} />
                  Enviar {arquivos.length} Foto{arquivos.length !== 1 ? 's' : ''}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    maxWidth: '700px',
    maxHeight: '90vh',
    overflow: 'auto'
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
  info: {
    display: 'flex',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: '#E7F3FF',
    borderRadius: '6px',
    fontSize: '0.9rem',
    color: '#004085',
    marginBottom: '1.5rem',
    alignItems: 'flex-start'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  uploadArea: {
    position: 'relative'
  },
  fileInput: {
    display: 'none'
  },
  uploadLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    padding: '3rem 2rem',
    border: '2px dashed #007BFF',
    borderRadius: '8px',
    backgroundColor: '#F8FCFF',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  uploadLabelDisabled: {
    border: '2px dashed #ccc',
    backgroundColor: '#f5f5f5',
    cursor: 'not-allowed'
  },
  uploadText: {
    fontSize: '1.1rem',
    fontWeight: '500',
    color: 'var(--text-primary)'
  },
  uploadSubtext: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)'
  },
  previewContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  previewTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: 0
  },
  previewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '1rem'
  },
  previewItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  previewImageContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: '100%',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid var(--border-color)'
  },
  previewImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  removeBtn: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    background: 'rgba(220, 53, 69, 0.9)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  tituloInput: {
    fontSize: '0.85rem'
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
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
  },
  uploadLabelDisabled: {
    border: '2px dashed #ccc',
    backgroundColor: '#f5f5f5',
    cursor: 'not-allowed'
  }, 
};

export default UploadFotoModal;