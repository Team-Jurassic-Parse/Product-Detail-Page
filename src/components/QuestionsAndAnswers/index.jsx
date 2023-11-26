import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useServerFetch from '../../hooks/useServerFetch.js'; //eslint-disable-line
import QuestionsList from './QuestionsList.jsx'; //eslint-disable-line

const SearchBar = styled.input`

`;

const BtnWrapper = styled.button`
`;

function QuestionsAndAnswers({ productId }) {//eslint-disable-line
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [displayNum, setDisplayNum] = useState(2);
  const [query, setQuery] = useState('');
  const questionFetchController = new AbortController();

  const handleChange = (e) => {
    if (e.target.value.length >= 3) {
      setQuery(e.target.value);
    } else {
      setQuery('');
    }
  };

  const handleMoreAnsweredQuestions = () => {
    if (totalQuestions !== displayNum) {
      setDisplayNum(displayNum + 2);
    }
  };

  useEffect(() => {
    if (productId) {
      useServerFetch('get', `qa/questions?product_id=${productId}&count=20`, {}, questionFetchController)
        .then((response) => {
          setQuestions(response.data.results);
          setCurrentQuestions(response.data.results.slice(0, displayNum));
          setTotalQuestions(response.data.results.length);
        })
        .catch(() => {
          setQuestions(null);
        });
    }
    // console.log('this is the searchbar:', query);
    return (() => {
      questionFetchController.abort();
    });
  }, [productId, displayNum]);
  return (
    <>
      <h4>QUESTIONS & ANSWERS </h4>
      <SearchBar type="text" placeholder="Have a question? Search for answers..." onChange={(e) => handleChange(e)} />
      <QuestionsList questions={questions} query={query} currentQuestions={currentQuestions} />
      {totalQuestions > 2 && currentQuestions.length < totalQuestions && <BtnWrapper type="button" onClick={handleMoreAnsweredQuestions}>More answered questions</BtnWrapper>}
      <BtnWrapper type="button">Add a question</BtnWrapper>
    </>
  );
}

export default QuestionsAndAnswers;
