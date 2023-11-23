import React, { useState, useEffect } from 'react';

import useServerFetch from '../../hooks/useServerFetch.js'; //eslint-disable-line
import QuestionsList from './QuestionsList.jsx'; //eslint-disable-line
import Search from './Search.jsx'; //eslint-disable-line

function QuestionsAndAnswers({ productId }) {//eslint-disable-line
  const [questions, setQuestions] = useState([]);
  const questionFetchController = new AbortController();

  useEffect(() => {
    if (productId) {
      useServerFetch('get', `qa/questions?product_id=40345`, {}, questionFetchController)
        .then((response) => {
          setQuestions(response.data.results);
        })
        .catch(() => {
          setQuestions(null);
        });
    }
    return (() => {
      questionFetchController.abort();
    });
  }, [productId]);
  return (
    <>
      <h4>QUESTIONS & ANSWERS </h4>
      <Search />
      <QuestionsList questions={questions} />
      <button type="button">Add a question</button>
    </>
  );
}

export default QuestionsAndAnswers;
