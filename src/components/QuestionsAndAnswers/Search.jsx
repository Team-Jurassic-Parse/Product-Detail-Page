import React, { useState } from 'react';

function Search({ handleChange }) {
  return (
    <div>
      <input type="text" placeholder="Have a question? Search for answers" onChange={handleChange} />
    </div>
  );
}

export default Search;
