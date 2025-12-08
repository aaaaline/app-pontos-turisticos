import { useState } from 'react';
import { Upload } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import UploadFotoModal from './UploadFotoModal';

const GaleriaFotos = ({ pontoId, fotos, onFotosUpdated, onAuthClick }) => {
  const { isAuthenticated } = useAuth();
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUpload = () => {
    if (!isAuthenticated) {
      onAuthClick();
      return;
    }
    setShowUploadModal(true);
  };

  const handleUploadSuccess = () => {
    if (onFotosUpdated) {
      onFotosUpdated();
    }
  };

  if (fotos.length === 0) {
    return (
      <>
        <div style={styles.emptyState}>
          <p>Nenhuma foto salva.</p>
          {isAuthenticated && (
            <button 
              onClick={handleUpload}
              className="btn btn-accent"
              style={{ marginTop: '1rem' }}
            >
              <Upload size={18} />
              Adicionar
            </button>
          )}
        </div>

        {showUploadModal && (
          <UploadFotoModal
            isOpen={showUploadModal}
            onClose={() => setShowUploadModal(false)}
            pontoId={pontoId}
            fotosExistentes={fotos}
            onSuccess={handleUploadSuccess}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div style={styles.grid}>
        {fotos.map((foto, index) => (
          <div key={foto.id} style={styles.fotoContainer}>
            <img 
              src={foto.url} 
              alt={`${index + 1}`}
              style={styles.foto}
            />
          </div>
        ))}
      </div>

      {showUploadModal && (
        <UploadFotoModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          pontoId={pontoId}
          fotosExistentes={fotos}
          onSuccess={handleUploadSuccess}
        />
      )}
    </>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem'
  },
  fotoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  foto: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid var(--border-color)'
  },
  titulo: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    margin: 0,
    textAlign: 'center'
  },
  emptyState: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    padding: '2rem',
    fontSize: '1rem'
  }
};

export default GaleriaFotos;