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
  getAll: (params) => api.get('/pontos-turisticos', { params }),
  getById: (id) => api.get(`/pontos-turisticos/${id}`),
  create: (data) => api.post('/pontos-turisticos', data),
  update: (id, data) => api.put(`/pontos-turisticos/${id}`, data),
  delete: (id) => api.delete(`/pontos-turisticos/${id}`),
  exportJSON: () => api.get('/pontos-turisticos/export/json'),
  exportXML: () => api.get('/pontos-turisticos/export/xml'),
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
};

export const fotosAPI = {
  upload: (pontoId, file) => {
    const formData = new FormData();
    formData.append('arquivo', file);
    return api.post(`/fotos/upload/${pontoId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  delete: (fotoId) => api.delete(`/fotos/${fotoId}`),
};

export const avaliacoesAPI = {
  create: (data) => api.post('/avaliacoes', {
    pontoTuristicoId: data.pontoTuristicoId,
    nota: data.nota,
    comentario: data.comentario
  }),
  update: (id, data) => api.put(`/avaliacoes/${id}`, {
    nota: data.nota,
    comentario: data.comentario
  }),
  delete: (id) => api.delete(`/avaliacoes/${id}`),
  getMedia: (pontoId) => api.get(`/avaliacoes/media/${pontoId}`)
};

export const comentariosAPI = {
  create: (data) => api.post('/comentarios', {
    pontoTuristicoId: data.pontoTuristicoId,
    texto: data.texto,
    metadata: data.metadata
  }),
  update: (id, data) => api.put(`/comentarios/${id}`, data),
  delete: (id) => api.delete(`/comentarios/${id}`),
  getByPonto: (pontoId) => api.get(`/comentarios/${pontoId}`),
  addResposta: (comentarioId, resposta) => 
    api.post(`/comentarios/${comentarioId}/responder`, {
      texto: resposta.texto
    }),
};

export const hospedagensAPI = {
  create: (data) => api.post('/hospedagens', data),
  update: (id, data) => api.put(`/hospedagens/${id}`, data),
  delete: (id) => api.delete(`/hospedagens/${id}`),
  getAll: () => api.get('/hospedagens'),
  getById: (id) => api.get(`/hospedagens/${id}`),
};

export default api;