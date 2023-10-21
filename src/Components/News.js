
import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import defaultImage from './default.png';

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
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
