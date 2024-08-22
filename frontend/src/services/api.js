import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';  // バックエンドのURLに合わせて変更してください

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getArticles = () => {
  return api.get('/articles/');
};

export const getArticle = (id) => {
  return api.get(`/articles/${id}/`);
};

export const createArticle = (articleData) => {
  return api.post('/articles/', articleData);
};

export const updateArticle = (id, articleData) => {
  return api.put(`/articles/${id}/`, articleData);
};

export const deleteArticle = (id) => {
  return api.delete(`/articles/${id}/`);
};

export default api;