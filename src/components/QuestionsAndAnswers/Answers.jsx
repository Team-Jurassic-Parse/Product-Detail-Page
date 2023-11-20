import React, { useState } from 'react';

function Answers({ questionId }) {
  const [answers, setAnswers] = useState([]);
  const answerFetchController = new AbortController();
  return (
    <div>
      Answer here
    </div>
  );
}

export default Answers;
