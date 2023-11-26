import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx'; //eslint-disable-line
import AnswerModal from './AnswerModal.jsx'; // eslint-disable-line
import Modal from '../UI/Modal.jsx'; // eslint-disable-line
import useServerFetch from '../../hooks/useServerFetch.js'; //eslint-disable-line

const Wrapper = styled.div`
  background: white;
  padding: 10px 25px;
  font-size: 19px;
  font-weight: bold;
`;

const InnerWrapper = styled.div`
  background: lightgrey;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const AddQuestionBtn = styled.button`
  position: relative;
  top: 0;
  right: 0;
  font-weight: normal;
`;

function Question({ question, questionId, productName = 'placeholder product name' }) { //eslint-disable-line
  const [showForm, setShowForm] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const answerFetchController = new AbortController();

  const openModal = () => {
    setShowForm(true);
  };

  const closeModal = () => {
    setShowForm(false);
  };

  const handleSeeMoreAnswers = () => {
    setCurrentAnswers(answers);
    setIsExpanded(true);
  };

  const handleCollapseAnswers = () => {
    setCurrentAnswers(answers.slice(0, 2));
    setIsExpanded(false);
  };

  const totalAnswers = Object.keys(question.answers).length;

  const handleFetch = () => {
    if (questionId) {
      useServerFetch('get', `qa/questions/${questionId}/answers?count=${totalAnswers}`, {}, answerFetchController)
        .then((response) => {
          const sortResponse = response.data.results.sort((a, b) => b.helpfulness - a.helpfulness);
          setAnswers(sortResponse);
          setCurrentAnswers(sortResponse.slice(0, 2));
        })
        .catch(() => setAnswers(null));
    }
    return (() => {
      answerFetchController.abort();
    });
  };

  useEffect(() => {
    handleFetch();
  }, [questionId]);

  return question ? (
    <Wrapper key={questionId}>
      <InnerWrapper>
        Q:
        {' '}
        {question.question_body}
        <AddQuestionBtn onClick={openModal}>Add Answer</AddQuestionBtn>
        <AnswersList
          currentAnswers={currentAnswers}
          totalAnswers={totalAnswers}
          handleSeeMoreAnswers={handleSeeMoreAnswers}
          isExpanded={isExpanded}
          handleCollapseAnswers={handleCollapseAnswers}
        />
        {showForm && (
        <Modal handleClose={closeModal}>
          <AnswerModal
            productName={productName}
            questionBody={question.question_body}
            questionId={questionId}
          />
        </Modal>
        )}
      </InnerWrapper>
    </Wrapper>
  ) : (
    <div> Loading questions </div>
  );
}

export default Question;
