
import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import defaultImage from './default.png';

import general from '../sampleJSON/general.json'
import business from '../sampleJSON/business.json'
import entertainment from '../sampleJSON/entertainment.json'
import health from '../sampleJSON/health.json'
import science from '../sampleJSON/science.json'
import sports from '../sampleJSON/sports.json'
import technology from '../sampleJSON/technology.json'


export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  /*useEffect(() => {
    setLoading(true);
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles);
        setTotalResults(data.totalResults);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
    document.title = `NewsMate-${props.category}`;
  }, [props.country, props.category, props.apiKey, props.pageSize]);

  const fetchMoreData = () => {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const newArticles = articles.concat(data.articles);
        setArticles(newArticles);
        setPage(page + 1);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
 */

  const fetchMoreData = () => {
    // Calculate the index range for the next page
    const startIndex = (page - 1) * props.pageSize;
    const endIndex = startIndex + props.pageSize;
  
    // Get the articles for the next page based on the calculated range
    const nextArticles = articles.slice(startIndex, endIndex);
  
    // Update the page number
    setPage(page + 1);
  
    // Append the next articles to the existing articles
    setArticles([...articles, ...nextArticles]);
  };
  

  const setArticlesByCategory = () => {
    switch (props.category) {
      case 'general':
        setArticles(general.articles);
        setTotalResults(general.articles.length);
        break;
      case 'business':
        setArticles(business.articles);
        setTotalResults(business.articles.length);
        break;
      case 'entertainment':
        setArticles(entertainment.articles);
        setTotalResults(entertainment.articles.length);
        break;
      case 'sports':
        setArticles(sports.articles);
        setTotalResults(sports.articles.length);
        break;
      case 'health':
        setArticles(health.articles);
        setTotalResults(health.articles.length);
        break;
      case 'technology':
        setArticles(technology.articles);
        setTotalResults(technology.articles.length);
        break;
      case 'science':
        setArticles(science.articles);
        setTotalResults(science.articles.length);
        break;
      default:
        // Set default articles if category doesn't match
        setArticles(general.articles);
        setTotalResults(general.articles.length);
        break;
    }
  };

  useEffect(() => {
    setLoading(true);
    setArticlesByCategory();
    setLoading(false);
  }, [props.category]);
  



  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMoreData}
      hasMore={articles.length !== totalResults}
      loader={<Spinner />}
      scrollableTarget="scrollableDiv"
    >
      {loading && <Spinner />}
      <div className="container my-5 mb-4 mt-5">
        <div className="row container" style={{ marginTop: "100px" }}>
          {articles.map((article, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <NewsItem
                title={article.title ? article.title.slice(0, 50) : ' '}
                description={article.description ? article.description.slice(0, 88) : ''}
                myurl={article.url}
                imageUrl={article.urlToImage? article.urlToImage: defaultImage}
                author={article.author? article.author : 'Anonymous'}
                date={article.publishedAt}
                text={article.title ? article.title: ''}
              />
            </div>
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
}

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
