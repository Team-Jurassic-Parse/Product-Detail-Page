/* eslint-disable */
import ReactDOM from 'react-dom/client';
import React from 'react';
import './styles.css';
import Overview from './components/Overview/index.jsx';
import QuestionsAndAnswers from './components/QuestionsAndAnswers/index.jsx';
import RatingAndReviews from './components/RatingAndReviews/index.jsx';
import RelatedProducts from './components/RelatedProducts/index.jsx';
import useServerFetch from './hooks/useServerFetch.js'; //eslint-disable-line
import useReviewRating from './hooks/ReviewStars/useReviewsRating.js';

function App() {
  const [productId, setProductId] = React.useState('');
  const [styleId, setStyleId] = React.useState('');
  const initialProductFetcher = new AbortController();
  const {productReview, status: reviewsStatus, error: reviewsError} = useReviewRating(productId);

  React.useEffect(() => {
    useServerFetch('get', `products`, {}, initialProductFetcher)
      .then((res) => {
        setProductId(res.data[0].id);
      })
      .catch((err) => {
        console.error(err);
      });

    return (() => {
      initialProductFetcher.abort();
    });
  }, []);


  return (
    <div style={{padding: 12}}>
      <h1 className="heading"> {productId} </h1>
      <div className="content">
        <Overview productId={productId} styleId={styleId} setStyleId={setStyleId}/>
        <QuestionsAndAnswers productId={productId}/>
        <RatingAndReviews productId={productId} productReview={productReview} status={reviewsStatus} error={reviewsError} />
        <RelatedProducts productId={productId} setProductId={setProductId} styleId={styleId}/>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
