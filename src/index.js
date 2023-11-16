/* eslint-disable */

import ReactDOM from 'react-dom/client';
import React from 'react';
import './styles.css';
import Overview from './components/Overview/index.jsx';
import QuestionsAndAnswers from './components/QuestionsAndAnswers/index.jsx';
import RatingAndReviews from './components/RatingAndReviews/index.jsx';
import RelatedProducts from './components/RelatedProducts/index.jsx';

function App() {
  const [productId, setProductId] = React.useState('');

  return (
    <>
      <h1 className="heading"> app! </h1>
      <div className="content">
        <Overview />
        <QuestionsAndAnswers />
        <RatingAndReviews />
        <RelatedProducts />
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
