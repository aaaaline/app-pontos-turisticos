import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Upload, FileJson, FileType, FileCode, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { pontosAPI } from '../services/api';

const AdminPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [exportFormat, setExportFormat] = useState('json');
  const [importFile, setImportFile] = useState(null);
  const [importFormat, setImportFormat] = useState('json');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  // Redirecionar se não for admin
  if (!isAdmin) {
    navigate('/');
    return null;
  }

  const handleExport = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let response;
      let mimeType;
      let fileExtension;

      switch (exportFormat) {
        case 'json':
          response = await pontosAPI.exportJSON();
          mimeType = 'application/json';
          fileExtension = 'json';
          break;
        case 'xml':
          response = await pontosAPI.exportXML();
          mimeType = 'application/xml';
          fileExtension = 'xml';
          break;
        case 'csv':
          response = await pontosAPI.exportCSV();
          mimeType = 'text/csv';
          fileExtension = 'csv';
          break;
        default:
          throw new Error('Formato não suportado');
      }

      const content = typeof response.data === 'string' 
        ? response.data 
        : JSON.stringify(response.data, null, 2);

      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pontos-turisticos.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setMessage({ 
        type: 'success', 
        text: `Dados exportados com sucesso em formato ${exportFormat.toUpperCase()}!` 
      });
    } catch (error) {
      console.error('Erro ao exportar:', error);
      setMessage({ 
        type: 'error', 
        text: 'Erro ao exportar dados.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const extension = file.name.split('.').pop().toLowerCase();
    if (!['json', 'xml', 'csv'].includes(extension)) {
      setMessage({ 
        type: 'error', 
        text: 'Formato de arquivo não suportado. Use JSON, XML ou CSV.' 
      });
      return;
    }

    setImportFile(file);
    setImportFormat(extension);
    setMessage({ type: '', text: '' });
  };

  const handleImport = async () => {
    if (!importFile) {
      setMessage({ type: 'error', text: 'Selecione um arquivo para importar' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let response;

      switch (importFormat) {
        case 'json':
          response = await pontosAPI.importJSON(importFile);
          break;
        case 'xml':
          response = await pontosAPI.importXML(importFile);
          break;
        case 'csv':
          response = await pontosAPI.importCSV(importFile);
          break;
        default:
          throw new Error('Formato não suportado');
      }

      setMessage({ 
        type: 'success', 
        text: `Dados importados com sucesso!` 
      });
      setImportFile(null);
      
      const fileInput = document.getElementById('fileImport');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Erro ao importar:', error);
      const errorMsg = error.response?.data?.message || 
                      error.response?.data?.error || 
                      error.message || 
                      'Erro desconhecido';
      setMessage({ 
        type: 'error', 
        text: `Erro ao importar: ${errorMsg}` 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.subtitle}>
          Importar ou Exportar dados de pontos turísticos
        </h2>
      </div>

      {message.text && (
        <div style={{
          ...styles.message,
          ...(message.type === 'success' ? styles.messageSuccess : styles.messageError)
        }}>
          {message.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          {message.text}
        </div>
      )}

      <div style={styles.grid}>
        {/* Exportação */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Download size={24} color="#007BFF" />
            <h2 style={styles.cardTitle}>Exportar Dados</h2>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Formato de Exportação</label>
            <div style={styles.formatButtons}>
              <button
                onClick={() => setExportFormat('json')}
                style={{
                  ...styles.formatButton,
                  ...(exportFormat === 'json' ? styles.formatButtonActive : {})
                }}
              >
                <FileJson size={20} />
                JSON
              </button>
              <button
                onClick={() => setExportFormat('xml')}
                style={{
                  ...styles.formatButton,
                  ...(exportFormat === 'xml' ? styles.formatButtonActive : {})
                }}
              >
                <FileCode size={20} />
                XML
              </button>
              <button
                onClick={() => setExportFormat('csv')}
                style={{
                  ...styles.formatButton,
                  ...(exportFormat === 'csv' ? styles.formatButtonActive : {})
                }}
              >
                <FileType size={20} />
                CSV
              </button>
            </div>
          </div>

          <button 
            onClick={handleExport}
            disabled={loading}
            style={{
              ...styles.primaryButton,
              ...(loading ? styles.buttonDisabled : {})
            }}
          >
            <Download size={20} />
            {loading ? 'Exportando...' : 'Exportar Dados'}
          </button>
        </div>

        {/* Importação */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Upload size={24} color="#28a745" />
            <h2 style={styles.cardTitle}>Importar Dados</h2>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Arquivo para Importação</label>
            <div style={styles.fileInputContainer}>
              <input
                type="file"
                accept=".json,.xml,.csv"
                onChange={handleFileSelect}
                style={styles.fileInput}
                id="fileImport"
              />
              <label htmlFor="fileImport" style={styles.fileInputLabel}>
                <Upload size={20} />
                {importFile ? importFile.name : 'Selecionar arquivo'}
              </label>
            </div>
            {importFile && (
              <p style={styles.fileInfo}>
                Formato detectado: <strong>{importFormat.toUpperCase()}</strong>
              </p>
            )}
          </div>

          <button 
            onClick={handleImport}
            disabled={loading || !importFile}
            style={{
              ...styles.successButton,
              ...((loading || !importFile) ? styles.buttonDisabled : {})
            }}
          >
            <Upload size={20} />
            {loading ? 'Importando...' : 'Importar Dados'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    minHeight: 'calc(100vh - 80px)'
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    marginBottom: '0.5rem'
  },
  subtitle: {
    fontSize: '1rem',
    color: '#6c757d',
    margin: 0
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    fontSize: '0.95rem',
    fontWeight: '500'
  },
  messageSuccess: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb'
  },
  messageError: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #E9ECEF',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem'
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#212529',
    margin: 0
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#212529',
    marginBottom: '0.75rem'
  },
  formatButtons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.5rem'
  },
  formatButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    border: '2px solid #E9ECEF',
    borderRadius: '8px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#6c757d'
  },
  formatButtonActive: {
    borderColor: '#007BFF',
    backgroundColor: '#F4FBFF',
    color: '#007BFF'
  },
  fileInputContainer: {
    position: 'relative'
  },
  fileInput: {
    display: 'none'
  },
  fileInputLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    border: '2px dashed #007BFF',
    borderRadius: '8px',
    backgroundColor: '#F4FBFF',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#007BFF'
  },
  fileInfo: {
    marginTop: '0.5rem',
    fontSize: '0.85rem',
    color: '#6c757d'
  },
  infoBox: {
    display: 'flex',
    gap: '0.75rem',
    padding: '1.5rem',
    backgroundColor: '#E7F3FF',
    border: '1px solid #B3D9FF',
    borderRadius: '8px',
    fontSize: '0.9rem',
    color: '#004085',
    alignItems: 'flex-start'
  },
  infoTitle: {
    fontWeight: '600',
    marginBottom: '0.5rem'
  },
  infoList: {
    margin: 0,
    paddingLeft: '1.5rem'
  },
  primaryButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.875rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  successButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.875rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  }
};

export default AdminPage;
