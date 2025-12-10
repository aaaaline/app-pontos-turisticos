import { useState } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';
import { fotosAPI } from '../../services/api';

const UploadFotoModal = ({ isOpen, onClose, pontoId, onSuccess, fotosExistentes = [] }) => {
  const [arquivos, setArquivos] = useState([]);
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
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (arquivos.length === 0) {
      setError('Selecione pelo menos um arquivo.');
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = arquivos.map(file => 
        fotosAPI.upload(pontoId, file)
      );

      await Promise.all(uploadPromises);

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

          {arquivos.length > 0 && (
            <div style={styles.previewContainer}>
              <h3 style={styles.previewTitle}>
                Arquivos selecionados ({arquivos.length})
              </h3>
              <div style={styles.fileList}>
                {arquivos.map((file, index) => (
                  <div key={index} style={styles.fileItem}>
                    <span style={styles.fileName}>{file.name}</span>
                    <span style={styles.fileSize}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                    {!uploading && (
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        style={styles.removeFileBtn}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

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
  fileList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  fileItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '6px',
    border: '1px solid var(--border-color)'
  },
  fileName: {
    flex: 1,
    fontSize: '0.9rem',
    color: 'var(--text-primary)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginRight: '1rem'
  },
  fileSize: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    marginRight: '0.5rem'
  },
  removeFileBtn: {
    background: 'none',
    border: 'none',
    color: '#dc3545',
    cursor: 'pointer',
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
  }
};

export default UploadFotoModal;
