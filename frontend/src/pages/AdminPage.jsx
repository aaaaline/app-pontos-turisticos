import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Upload, FileJson, FileType, FileCode, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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

  const pontosMock = [
    {
      id: 1,
      nome: "Parque Vaca Brava",
      descricao: "Um dos principais parques de Goiânia",
      cidade: "Goiânia",
      estado: "GO",
      pais: "Brasil",
      latitude: -16.7108822,
      longitude: -49.2647891,
      endereco: "Av. T-2, Setor Bueno"
    },
    {
      id: 2,
      nome: "Feira da Lua",
      descricao: "Tradicional feira de artesanato",
      cidade: "Goiânia",
      estado: "GO",
      pais: "Brasil",
      latitude: -16.6869,
      longitude: -49.2648,
      endereco: "Praça do Sol"
    }
  ];

  const convertToJSON = (data) => {
    return JSON.stringify(data, null, 2);
  };

  const convertToCSV = (data) => {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ].join('\n');
    
    return csv;
  };

  const convertToXML = (data) => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<pontosTuristicos>\n';
    
    data.forEach(ponto => {
      xml += '  <ponto>\n';
      Object.entries(ponto).forEach(([key, value]) => {
        xml += `    <${key}>${value}</${key}>\n`;
      });
      xml += '  </ponto>\n';
    });
    
    xml += '</pontosTuristicos>';
    return xml;
  };

  const handleExport = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // TODO: Fazer requisição para para buscar dados reais
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let content;
      let mimeType;
      let fileExtension;

      switch (exportFormat) {
        case 'json':
          content = convertToJSON(pontosMock);
          mimeType = 'application/json';
          fileExtension = 'json';
          break;
        case 'csv':
          content = convertToCSV(pontosMock);
          mimeType = 'text/csv';
          fileExtension = 'csv';
          break;
        case 'xml':
          content = convertToXML(pontosMock);
          mimeType = 'application/xml';
          fileExtension = 'xml';
          break;
        default:
          throw new Error('Formato não suportado');
      }

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
        text: `Dados exportados!` 
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Erro ao exportar dados.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const parseJSON = (text) => {
    return JSON.parse(text);
  };

  const parseCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) throw new Error('CSV inválido');

    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index];
      });
      data.push(obj);
    }

    return data;
  };

  const parseXML = (text) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');
    
    if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
      throw new Error('XML inválido');
    }

    const pontos = xmlDoc.getElementsByTagName('ponto');
    const data = [];

    for (let i = 0; i < pontos.length; i++) {
      const ponto = pontos[i];
      const obj = {};
      
      for (let j = 0; j < ponto.children.length; j++) {
        const child = ponto.children[j];
        obj[child.tagName] = child.textContent;
      }
      
      data.push(obj);
    }

    return data;
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const extension = file.name.split('.').pop().toLowerCase();
    if (!['json', 'csv', 'xml'].includes(extension)) {
      setMessage({ 
        type: 'error', 
        text: 'Formato de arquivo não suportado.' 
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
      const text = await importFile.text();
      let data;

      switch (importFormat) {
        case 'json':
          data = parseJSON(text);
          break;
        case 'csv':
          data = parseCSV(text);
          break;
        case 'xml':
          data = parseXML(text);
          break;
        default:
          throw new Error('Formato não suportado');
      }

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Arquivo não contém dados válidos');
      }

      // TODO: Enviar dados para API
      console.log('Dados importados:', data);
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage({ 
        type: 'success', 
        text: `${data.length} ponto(s) turístico(s) importado(s) com sucesso!` 
      });
      setImportFile(null);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: `Erro ao importar: ${error.message}` 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.subtitle}>
          Importar ou Exportar dados de pontos turísticos
        </h1>
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
                onClick={() => setExportFormat('csv')}
                style={{
                  ...styles.formatButton,
                  ...(exportFormat === 'csv' ? styles.formatButtonActive : {})
                }}
              >
                <FileType size={20} />
                CSV
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
                accept=".json,.csv,.xml"
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
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    color: '#007BFF',
    border: '1px solid #007BFF',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '1.5rem',
    transition: 'all 0.2s'
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#212529',
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
    marginBottom: '3rem'
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
    marginBottom: '1rem'
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#212529',
    margin: 0
  },
  cardDescription: {
    color: '#6c757d',
    fontSize: '0.95rem',
    marginBottom: '1.5rem',
    lineHeight: '1.5'
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
    padding: '0.75rem',
    backgroundColor: '#E7F3FF',
    border: '1px solid #B3D9FF',
    borderRadius: '6px',
    fontSize: '0.85rem',
    color: '#004085',
    marginBottom: '1.5rem'
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
  },
  helpSection: {
    backgroundColor: '#F8F9FA',
    border: '1px solid #E9ECEF',
    borderRadius: '12px',
    padding: '2rem'
  },
  helpTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '1.5rem'
  },
  formatHelp: {
    display: 'grid',
    gap: '1.5rem'
  },
  formatHelpItem: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start'
  }
};

export default AdminPage;