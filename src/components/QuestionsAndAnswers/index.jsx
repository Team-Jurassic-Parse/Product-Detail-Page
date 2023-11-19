import React, { useState, useEffect } from 'react';

import useServerFetch from '../../hooks/useServerFetch.js'; //eslint-disable-line
import QuestionsList from './QuestionsList.jsx'; //eslint-disable-line

function QuestionsAndAnswers({ productId }) {//eslint-disable-line
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const answerFetchController = new AbortController();
  const [questionId, setQuestionId] = useState('');
  const questionFetchController = new AbortController();

  console.log('this is the productId:', productId);
  useEffect(() => {
    if (productId) {
      useServerFetch('get', `qa/questions?product_id=${productId}`, {}, questionFetchController)
        .then((response) => {
          console.log('this is the response for question get:', response.data);
          console.log('this is the id to the above question:', response.data.results[0].question_id);
          setQuestions(response.data);
          setQuestionId(response.data.results[0]);
          console.log('this is the question after setquesitons:', questions);
        })
        .catch((err) => {
          console.log('this is the err for getting questions:', err);
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
      <QuestionsList questions={questions} />
    </>
  );
}

export default QuestionsAndAnswers;
