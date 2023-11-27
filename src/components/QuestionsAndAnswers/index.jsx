import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useServerFetch from '../../hooks/useServerFetch.js'; //eslint-disable-line
import QuestionsList from './QuestionsList.jsx'; //eslint-disable-line
import QuestionModal from './QuestionModal.jsx'; //eslint-disable-line
import Modal from '../UI/Modal.jsx'; // eslint-disable-line

const SearchBar = styled.input`
  width: 50%;
  height: 30px;
  border: 1px solid black;
  font-size: 21px;
  cursor: text;
  padding: 10px;
`;

const BtnWrapper = styled.button`
  border: 1px solid black;
  border-radius: 15px;
  text-align: center;
  color: black;
  font-size: 16px;
  padding: 10px;
  background-color: yellow;
  cursor: pointer;
  &: hover {
    background-color: lightblue;
  }
`;

function QuestionsAndAnswers({ productId }) {//eslint-disable-line
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [displayNum, setDisplayNum] = useState(2);
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const questionFetchController = new AbortController();

  const openModal = () => {
    setShowForm(true);
  };

  const closeModal = () => {
    setShowForm(false);
  };

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
      <SearchBar type="search" placeholder="Have a question? Search for answers..." onChange={(e) => handleChange(e)} />
      <QuestionsList questions={questions} query={query} currentQuestions={currentQuestions} />
      {totalQuestions > 2 && currentQuestions.length < totalQuestions && <BtnWrapper type="button" onClick={handleMoreAnsweredQuestions}>More answered questions</BtnWrapper>}
      <BtnWrapper type="button" onClick={openModal}>Add a question</BtnWrapper>
      {showForm && (
        <Modal handleClose={closeModal}>
          <QuestionModal productName="placeholder" productId={productId} />
        </Modal>
      )}
    </>
  );
}

export default QuestionsAndAnswers;
