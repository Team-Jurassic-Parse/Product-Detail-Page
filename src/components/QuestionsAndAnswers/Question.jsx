import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import AnswersList from './AnswersList.jsx';
import AnswerModal from './AnswerModal.jsx';
import Modal from '../UI/Modal.jsx';
import useServerFetch from '../../hooks/useServerFetch.js';

const OuterWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 2px solid #D3D3D3;
`;

const InnerWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 70% 30%;
`;

const AddAnswerBtn = styled.button`
  background: #000000;
  display: inline-block;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 110px;
  height: 30px;
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
  productName,
}) {
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
          toast.success('Upvote Successful');
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
            (a, b) => b.helpfulness - a.helpfulness,
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
        <InnerWrapper>
          <h3>
            Q: {question.question_body}
          </h3>
          <div
            style={{
              display: 'inline-block',
              textAlign: 'right',
              paddingRight: '32px',
            }}
          >
            <div
              style={{
                float: 'right',
                marginTop: '27px',
                marginBottom: '25px',
                marginLeft: '10px',
              }}
              onClick={() => {
                handleHelpful(questionId);
              }}
            >
              Helpful? <span style={{
                textDecoration: helpful ? 'none' : 'underline',
                cursor: helpful ? 'default' : 'pointer',
                opacity: helpful? '0.5' : 'default'
                }}>
                Yes</span>
                {' '}({helpfulness})
            </div>
            <AddAnswerBtn onClick={openModal}>Add Answer</AddAnswerBtn>
          </div>
        </InnerWrapper>
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
