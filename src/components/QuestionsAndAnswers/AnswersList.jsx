import React from 'react';
import styled from 'styled-components';
import Answers from './Answers.jsx';

const AnswerListWrapper = styled.div`
  background: white;
  min-height: 50px;
  max-height: 50vh;
  padding: 10px 25px;
  overflow: auto;
`;

const BtnWrapper = styled.button`
  background: #000000;
  display: table;
  width: 180px;
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

function AnswersList({
  currentAnswers,
  totalAnswers,
  handleSeeMoreAnswers,
  handleCollapseAnswers,
  isExpanded,
}) {
  return (
    <div>
      <AnswerListWrapper>
        {currentAnswers.map((answer) => (
          <Answers key={answer.answer_id} answer={answer} />
        ))}
      </AnswerListWrapper>
      {totalAnswers > 2 && currentAnswers.length < totalAnswers && (
        <BtnWrapper type="button" onClick={handleSeeMoreAnswers}>
          See More Answers
        </BtnWrapper>
      )}
      {totalAnswers > 2 && currentAnswers.length === totalAnswers && (
        <BtnWrapper type="button" onClick={handleCollapseAnswers}>
          Collapse Answers
        </BtnWrapper>
      )}
      <br />
    </div>
  );
}

export default AnswersList;
