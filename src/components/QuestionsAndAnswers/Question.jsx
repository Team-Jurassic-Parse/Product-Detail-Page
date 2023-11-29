import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx'; //eslint-disable-line
import AnswerModal from './AnswerModal.jsx'; // eslint-disable-line
import Modal from '../UI/Modal.jsx'; // eslint-disable-line
import useServerFetch from '../../hooks/useServerFetch.js'; //eslint-disable-line

// const Wrapper = styled.div`
// background: white;
// padding: 10px 25px;
// font-size: 19px;
// font-weight: bold;
// `;

// const HelpfulWrapper = styled.span`
//   font-weight: normal;
//   font-size: 16px;
//   text-decoration: ${helpful ? 'none' : 'underline'};
//   cursor: ${helpful ? 'default' : 'point'};
// `;

const OuterWrapper = styled.div`
  background: white;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 2px solid black;
`;

// const InnerWrapper= styled.div'
// ';

const AddAnswerBtn = styled.button`
  background: #000000;
  display: table;
  width: 110px;
  height: 30px;
  margin-top: 10px;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  opacity: 1;
  transition: background 0.2s ease;
  border-radius: 50px;
  text-align: center;
  &:hover {
    opacity: 0.5;
  }
`;

function Question({
  question,
  questionId,
  productName = 'placeholder product name',
}) {
  //eslint-disable-line
  const [showForm, setShowForm] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [helpful, setHelpful] = useState(false);
  const [helpfulness, setHelpfulness] = useState(question.question_helpfulness);
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

  const handleHelpful = (id) => {
    if (!helpful) {
      useServerFetch('put', `qa/questions/${id}/helpful`, {})
        .then(() => {
          setHelpfulness(helpfulness + 1);
          setHelpful(true);
        })
        .catch((err) => console.error(err));
    }
  };

  const totalAnswers = Object.keys(question.answers).length;

  const handleFetch = () => {
    if (questionId) {
      useServerFetch(
        'get',
        `qa/questions/${questionId}/answers?count=${totalAnswers}`,
        {},
        answerFetchController
      )
        .then((response) => {
          const sortResponse = response.data.results.sort(
            (a, b) => b.helpfulness - a.helpfulness
          );
          setAnswers(sortResponse);
          setCurrentAnswers(sortResponse.slice(0, 2));
        })
        .catch(() => setAnswers(null));
    }
    return () => {
      answerFetchController.abort();
    };
  };

  useEffect(() => {
    handleFetch();
  }, [questionId]);

  return question ? (
    <div>
      <OuterWrapper>
        Q: {question.question_body}
        <span
          style={{
            fontWeight: 'normal',
            fontSize: '16px',
            position: 'relative',
            left: '90px',
            textDecoration: helpful ? 'none' : 'underline',
            cursor: helpful ? 'default' : 'pointer',
          }}
          onClick={() => {
            handleHelpful(questionId);
          }}
        >
          Helpful? ({helpfulness})
        </span>
        <AddAnswerBtn onClick={openModal}>Add Answer</AddAnswerBtn>
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
              closeModal={closeModal}
            />
          </Modal>
        )}
      </OuterWrapper>
    </div>
  ) : (
    <div> Loading questions </div>
  );
}

export default Question;
