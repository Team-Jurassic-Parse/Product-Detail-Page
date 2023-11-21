import React, { useState } from 'react';
import styled from 'styled-components';
import FormHeading from './ReviewForm/FormHeading.jsx'; // eslint-disable-line
import OverallRating from './ReviewForm/OverallRating.jsx'; // eslint-disable-line
import Recomended from './ReviewForm/Recomended.jsx'; // eslint-disable-line
import Characteristics from './ReviewForm/Characteristics.jsx'; // eslint-disable-line
import UploadPhoto from './ReviewForm/UploadPhoto.jsx'; // eslint-disable-line

const Wrapper = styled.form`
  background: white;
  padding: 24px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ReviewSummary = styled.textarea``;
const ReviewBody = styled.textarea``;
const SumbitBtn = styled.button``;

function ReviewForm({ productName }) { // eslint-disable-line
  const [rating, setRating] = useState(5);
  const [recomended, setRecomended] = useState(true);
  const [characteristics, setCharacteristics] = useState({
    size: null,
    width: null,
    comfort: null,
    quality: null,
    length: null,
    fit: null,
  });
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [images, setImages] = useState([]);

  const handleChangeRating = (val) => { setRating(val); };
  const handleImageChange = (newImgs) => { setImages((curImgs) => [...curImgs, ...newImgs]); };

  return (
    <Wrapper>
      <FormHeading productName={productName} />
      <OverallRating rating={rating} handleChangeRating={handleChangeRating} />
      <Recomended recomended={recomended} setRecomended={setRecomended} />
      <Characteristics characteristics={characteristics} setCharacteristics={setCharacteristics} />
      <ReviewSummary value={summary} onChange={(e) => setSummary(e.target.value)} />
      <ReviewBody value={body} onChange={(e) => setBody(e.target.value)} />
      <UploadPhoto images={images} handleImageChange={handleImageChange} />
      <SumbitBtn>Submit</SumbitBtn>
    </Wrapper>
  );
}

export default ReviewForm;
