/* eslint-disable */
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import React from 'react';
import './styles.css';
import Overview from './components/Overview/index.jsx';
import QuestionsAndAnswers from './components/QuestionsAndAnswers/index.jsx';
import RatingAndReviews from './components/RatingAndReviews/index.jsx';
import RelatedProducts from './components/RelatedProducts/index.jsx';

function App() {
  const [productId, setProductId] = React.useState('');
  const [styleId, setStyleId] = React.useState('');

  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
    headers: {
      Authorization: process.env.AUTH_TOKEN,
    },
  })
    .then((res) => {
      setProductId(res.data[0].id);
    })
    .catch((err) => {
      console.error(err);
    });


  return (
    <div style={{padding: 12}}>
      <h1 className="heading"> {productId} </h1>
      <div className="content">
        <Overview productId={productId} styleId={styleId} setStyleId={setStyleId}/>
        <QuestionsAndAnswers productId={productId}/>
        <RatingAndReviews productId={productId}/>
        <RelatedProducts productId={productId} setProductId={setProductId} styleId={styleId}/>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
