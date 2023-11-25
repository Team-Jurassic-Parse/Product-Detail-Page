import React, { useState } from 'react';
import styled from 'styled-components';
import Answers from './Answers.jsx'; //eslint-disable-line
import AnswerModal from './AnswerModal.jsx';
import Modal from '../UI/Modal.jsx'; // eslint-disable-line

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

function QuestionsList({ questions, productName = 'placeholder product name' }) { //eslint-disable-line
  const [showForm, setShowForm] = useState(false);

  const openModal = () => {
    setShowForm(true);
  };

  const closeModal = () => {
    setShowForm(false);
  };

  return questions ? (
    <Wrapper>
      {questions.map((question) => { //eslint-disable-line
        const questionId = question.question_id;
        return (
          <InnerWrapper key={questionId}>
            Q:
            {question.question_body}
            <AddQuestionBtn onClick={openModal}>Add Answer</AddQuestionBtn>
            <Answers questionId={questionId} />
            {showForm && (
            <Modal handleClose={closeModal}>
              <AnswerModal productName={productName} questionBody={question.question_body}/>
            </Modal>
          )}
          </InnerWrapper>
        );
      })}
      <button type="button">More answered questions</button>
    </Wrapper>
  ) : (
    <div> Loading questions </div>
  );
}

export default QuestionsList;
