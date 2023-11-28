import React from 'react';
import styled from 'styled-components';
import Answers from './Answers.jsx'; //eslint-disable-line

//adjust css later
const AnswerListWrapper = styled.div`
  background: white;
  min-height: 50px;
  max-height: 50vh;
  padding: 10px 25px;
  overflow-y: scroll;
`;

const BtnWrapper = styled.button`
  cursor: pointer;
  &: hover {
    background-color: lightblue;
  }
`;

function AnswersList({ currentAnswers, totalAnswers, handleSeeMoreAnswers, handleCollapseAnswers, isExpanded }) { //eslint-disable-line

  return (
    <div>
      <AnswerListWrapper>
        {currentAnswers.map((answer) => <Answers key={answer.answer_id} answer={answer} />)}
      </AnswerListWrapper>
      {totalAnswers > 2 && currentAnswers.length < totalAnswers
      && <BtnWrapper type="button" onClick={handleSeeMoreAnswers}>See more answers</BtnWrapper>}
      {totalAnswers > 2 && currentAnswers.length === totalAnswers
      && <BtnWrapper type="button" onClick={handleCollapseAnswers}>Collapse answers</BtnWrapper>}
    </div>

  );
}

export default AnswersList;
