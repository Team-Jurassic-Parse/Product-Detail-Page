import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useServerFetch from '../../hooks/useServerFetch.js';
import QuestionsList from './QuestionsList.jsx';
import QuestionModal from './QuestionModal.jsx';
import Modal from '../UI/Modal.jsx';

const SearchBar = styled.input`
  width: 30%;
  height: 40px;
  border: 2px solid black;
  font-size: 21px;
  cursor: text;
  padding: 10px;
  border-radius: 50px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  margin: 5px 64px;
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
  &:hover {
    opacity: 0.5;
  }
`;

function QuestionsAndAnswers({ productId, productInfo }) {
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
    return () => {
      questionFetchController.abort();
    };
  }, [productId, displayNum]);
  return (
    <>
      <h2 style={{ margin: '60px 64px 20px' }}>QUESTIONS & ANSWERS </h2>
      <SearchBar
        type="search"
        placeholder="Have a question? Search for answers..."
        onChange={(e) => handleChange(e)}
      />
      <QuestionsList
        questions={questions}
        query={query}
        currentQuestions={currentQuestions}
        productName={productInfo}
      />
      <div style={{ margin: '24px 64px' }}>
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
            <QuestionModal
              productName={productInfo}
              productId={productId}
              closeModal={closeModal}
            />
          </Modal>
        )}
      </div>
    </>
  );
}

export default QuestionsAndAnswers;
