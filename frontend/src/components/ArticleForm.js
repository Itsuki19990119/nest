import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createArticle, getArticle, updateArticle } from '../services/api';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await getArticle(id);
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (err) {
      setError('記事の取得中にエラーが発生しました。');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateArticle(id, { title, content });
      } else {
        await createArticle({ title, content });
      }
      navigate('/');
    } catch (err) {
      setError('記事の保存中にエラーが発生しました。');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? '記事編集' : '新規記事作成'}</h2>
      {error && <div>{error}</div>}
      <div>
        <label htmlFor="title">タイトル:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">内容:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">保存</button>
    </form>
  );
};

export default ArticleForm;