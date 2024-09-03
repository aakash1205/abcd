import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './NewsCards.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';


const NewsCards = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    const fetchNews = async () => {

      
      const url = 'https://newsapi.org/v2/everything?q=apple&from=2024-07-25&to=2024-07-25&sortBy=popularity&apiKey=ca24ace7039848c2990434c011e1b3df';

      try {
        const response = await axios.get(url);
        // console.log('Full response:', response); 

        if (response.data && response.data.status === 'ok') {
          const articlesWithImages = response.data.articles.filter(article => article.urlToImage !== null);
          console.log('Filtered Articles:', articlesWithImages); 
          setArticles(articlesWithImages.slice(0, 30)); 
        } else {
          console.log('No articles found');
          setError('No articles found');
        }
      } catch (error) {
        console.error('Error fetching the news:', error); 
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  
   
  
  if (error) return <div>Error: {error}</div>;

  return (
<>
    <Header/> 
    <div className="  news-cards   ">
      {articles.map((article, index) => (
        <div key={index} className="news-card">
          <img src={article.urlToImage} alt={article.title} className="news-image" />
          <div className="news-content ">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            <small>Published on: {new Date(article.publishedAt).toLocaleString()}</small>
          </div>
        </div>
      ))}
    </div>
    <button  className='bg-gradient-to-r  to-purple-500 px-6 py-6 text-center shadow-lg rounded-lg my-6 from-neutral-800 text-white '  onClick={logout} >Logout</button>


    </>
  );
};

export default NewsCards;
