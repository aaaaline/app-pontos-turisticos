import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('app_user') || 'null');
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('app_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', {
    email: credentials.email,
    password: credentials.senha
  }),
  register: (userData) => api.post('/auth/register', {
    name: userData.nome,
    email: userData.email,
    password: userData.senha,
    role: userData.role || 'USER'
  }),
  logout: () => api.post('/auth/logout'),
};

export const pontosAPI = {
  // Busca com paginação e filtros
  getAll: (params = {}) => {
    const queryParams = {
      page: params.page || 0,
      size: params.size || 10,
      sort: params.sort || 'nome,asc',
      nome: params.nome || undefined,
      cidade: params.cidade || undefined,
      estado: params.estado || undefined,
      tipo: params.tipo || undefined,
    };
    
    Object.keys(queryParams).forEach(key => 
      queryParams[key] === undefined && delete queryParams[key]
    );
    
    return api.get('/pontos-turisticos', { params: queryParams });
  },
  
  getById: (id) => api.get(`/pontos-turisticos/${id}`),
  
  create: (data) => api.post('/pontos-turisticos', {
    nome: data.nome,
    descricao: data.descricao,
    cidade: data.cidade,
    estado: data.estado,
    pais: data.pais || 'Brasil',
    latitude: data.latitude,
    longitude: data.longitude,
    endereco: data.endereco,
    comoChegarTexto: data.comoChegarTexto,
    tipo: data.tipo
  }),
  
  update: (id, data) => api.put(`/pontos-turisticos/${id}`, {
    nome: data.nome,
    descricao: data.descricao,
    cidade: data.cidade,
    estado: data.estado,
    pais: data.pais || 'Brasil',
    latitude: data.latitude,
    longitude: data.longitude,
    endereco: data.endereco,
    comoChegarTexto: data.comoChegarTexto,
    tipo: data.tipo
  }),
  
  delete: (id) => api.delete(`/pontos-turisticos/${id}`),
  
  // Exportação e Importação
  exportJSON: () => api.get('/pontos-turisticos/export/json', {
    responseType: 'text'
  }),
  
  exportXML: () => api.get('/pontos-turisticos/export/xml', {
    responseType: 'text'
  }),
  
  exportCSV: () => api.get('/pontos-turisticos/export/csv', {
    responseType: 'text'
  }),
  
  importJSON: (file) => {
    const formData = new FormData();
    formData.append('arquivo', file);
    return api.post('/pontos-turisticos/import/json', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  importXML: (file) => {
    const formData = new FormData();
    formData.append('arquivo', file);
    return api.post('/pontos-turisticos/import/xml', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  importCSV: (file) => {
    const formData = new FormData();
    formData.append('arquivo', file);
    return api.post('/pontos-turisticos/import/csv', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
};

export const fotosAPI = {
  getAll: () => api.get('/fotos'),
  getById: (id) => api.get(`/fotos/${id}`),
  create: (data) => api.post('/fotos', data),
  update: (id, data) => api.put(`/fotos/${id}`, data),
  delete: (id) => api.delete(`/fotos/${id}`),
  upload: (pontoId, file) => {
    const formData = new FormData();
    formData.append('arquivo', file);
    return api.post(`/fotos/upload/${pontoId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
};

export const avaliacoesAPI = {
  create: (data) => api.post('/avaliacoes', {
    pontoTuristicoId: String(data.pontoTuristicoId),
    nota: data.nota,
    comentario: data.comentario || ''
  }),
  
  update: (id, data) => api.put(`/avaliacoes/${id}`, {
    pontoTuristicoId: String(data.pontoTuristicoId),
    nota: data.nota,
    comentario: data.comentario || ''
  }),
  
  delete: (id) => api.delete(`/avaliacoes/${id}`),
  
  getMedia: (pontoId) => api.get(`/avaliacoes/media/${pontoId}`),
  
  getByUserAndPonto: (pontoId) => 
    api.get(`/avaliacoes/usuario/ponto/${pontoId}`)
};

export const comentariosAPI = {
  create: (data) => api.post('/comentarios', {
    pontoTuristicoId: String(data.pontoTuristicoId),
    texto: data.texto,
    metadata: data.metadata || {
      device: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop',
      language: 'pt'
    }
  }),
  
  update: (id, data) => api.put(`/comentarios/${id}`, {
    texto: data.texto,
    metadata: data.metadata
  }),
  
  delete: (id) => api.delete(`/comentarios/${id}`),
  
  getByPonto: (pontoId) => api.get(`/comentarios/${String(pontoId)}`),
  
  addResposta: (comentarioId, resposta) => 
    api.post(`/comentarios/${comentarioId}/responder`, {
      texto: resposta.texto
    })
};

export const hospedagensAPI = {
  create: (data) => api.post('/hospedagens', {
    nome: data.nome,
    endereco: data.endereco,
    telefone: data.telefone,
    tipo: data.tipo,
    precoMedio: data.precoMedio,
    site: data.site,
    pontoTuristicoId: data.pontoTuristicoId
  }),
  
  update: (id, data) => api.put(`/hospedagens/${id}`, {
    nome: data.nome,
    endereco: data.endereco,
    telefone: data.telefone,
    tipo: data.tipo,
    precoMedio: data.precoMedio,
    site: data.site,
    pontoTuristicoId: data.pontoTuristicoId
  }),
  
  delete: (id) => api.delete(`/hospedagens/${id}`),
  
  getAll: () => api.get('/hospedagens'),
  
  getById: (id) => api.get(`/hospedagens/${id}`),
  
  getByPonto: (pontoId) => 
    api.get('/hospedagens', { params: { pontoTuristicoId: pontoId } })
};

export default api;