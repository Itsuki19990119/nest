import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticle, deleteArticle } from '../services/api';

const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await getArticle(id);
      setArticle(response.data);
      setLoading(false);
    } catch (err) {
      setError('記事の取得中にエラーが発生しました。');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(id);
      navigate('/');
    } catch (err) {
      setError('記事の削除中にエラーが発生しました。');
    }
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>{error}</div>;
  if (!article) return <div>記事が見つかりません。</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <button onClick={() => navigate(`/articles/${id}/edit`)}>編集</button>
      <button onClick={handleDelete}>削除</button>
    </div>
  );
};

export default ArticleDetail;