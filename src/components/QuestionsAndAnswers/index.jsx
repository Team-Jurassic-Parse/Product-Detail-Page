import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useServerFetch from '../../hooks/useServerFetch.js'; //eslint-disable-line
import QuestionsList from './QuestionsList.jsx'; //eslint-disable-line
import QuestionModal from './QuestionModal.jsx'; //eslint-disable-line
import Modal from '../UI/Modal.jsx'; // eslint-disable-line

const SearchBar = styled.input`
  width: 30%;
  height: 40px;
  border: 2px solid black;
  font-size: 21px;
  cursor: text;
  padding: 10px;
  border-radius: 50px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  margin-left: 25%
`;

const BtnWrapper = styled.button`
  background: #000000;
  display: table;
  width: 200px;
  height: 30px;
  color: #fff;
  margin-bottom: 10px;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  opacity: 1;
  transition: background 0.2s ease;
  border-radius: 50px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  margin-left: 25%
  &:hover {
    opacity: 0.5;
  }
`;

function QuestionsAndAnswers({ productId }) {
  //eslint-disable-line
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
      useServerFetch(
        'get',
        `qa/questions?product_id=${productId}&count=20`,
        {},
        questionFetchController
      )
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
    return () => {
      questionFetchController.abort();
    };
  }, [productId, displayNum]);
  return (
    <>
      <h1 style={{ marginLeft: '25%' }}>QUESTIONS & ANSWERS </h1>
      <SearchBar
        type="search"
        placeholder="Have a question? Search for answers..."
        onChange={(e) => handleChange(e)}
      />
      <QuestionsList
        questions={questions}
        query={query}
        currentQuestions={currentQuestions}
      />
      <div style={{ marginLeft: '25%' }}>
        {totalQuestions > 2 && currentQuestions.length < totalQuestions && (
          <BtnWrapper type="button" onClick={handleMoreAnsweredQuestions}>
            More Answered Questions
          </BtnWrapper>
        )}
        <BtnWrapper type="button" onClick={openModal}>
          Add a Question
        </BtnWrapper>
        {showForm && (
          <Modal handleClose={closeModal}>
            <QuestionModal productName="placeholder" productId={productId} closeModal={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default QuestionsAndAnswers;
