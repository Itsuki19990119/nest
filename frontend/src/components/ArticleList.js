import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/api';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await getArticles();
      setArticles(response.data);
      setLoading(false);
    } catch (err) {
      setError('記事の取得中にエラーが発生しました。');
      setLoading(false);
    }
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>記事一覧</h2>
      {articles.map((article) => (
        <div key={article.id}>
          <h3>
            <Link to={`/articles/${article.id}`}>{article.title}</Link>
          </h3>
          <p>{article.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;