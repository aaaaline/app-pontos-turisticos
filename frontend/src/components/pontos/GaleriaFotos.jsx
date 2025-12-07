const GaleriaFotos = ({ fotos }) => {
  if (fotos.length === 0) {
    return (
      <div style={styles.emptyState}>
        <p>Nenhuma foto disponível ainda.</p>
      </div>
    );
  }

  return (
    <div style={styles.grid}>
      {fotos.map((foto, index) => (
        <div key={foto.id} style={styles.fotoContainer}>
          <img 
            src={foto.url} 
            alt={foto.titulo || `Foto ${index + 1}`}
            style={styles.foto}
          />
          {foto.titulo && (
            <p style={styles.titulo}>{foto.titulo}</p>
          )}
        </div>
      ))}
    </div>
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