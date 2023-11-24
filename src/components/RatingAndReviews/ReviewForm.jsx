import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import FormHeading from './ReviewForm/FormHeading.jsx'; // eslint-disable-line
import OverallRating from './ReviewForm/OverallRating.jsx'; // eslint-disable-line
import Recomended from './ReviewForm/Recomended.jsx'; // eslint-disable-line
import Characteristics from './ReviewForm/Characteristics.jsx'; // eslint-disable-line
import UploadPhoto from './ReviewForm/UploadPhoto.jsx'; // eslint-disable-line

const Wrapper = styled.form`
  background: white;
  max-width: 680px;
  padding: 24px 36px;
  display: flex;
  gap: 12px;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

const ReviewSummary = styled.textarea``;
const ReviewBody = styled.textarea``;
const InfoInput = styled.input``;
const SumbitBtn = styled.input``;

const initialCharacteristics = {
  size: null,
  width: null,
  comfort: null,
  quality: null,
  length: null,
  fit: null,
};

function ReviewForm({ productName, productId }) { // eslint-disable-line
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [recomended, setRecomended] = useState('yes');
  const [characteristics, setCharacteristics] = useState(
    initialCharacteristics
  );
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleChangeRating = (val) => {
    setRating(val);
  };
  const handleImageChange = (newImgs) => {
    setImages((curImgs) => [...curImgs, ...newImgs]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRating(5);
    setRecomended('yes');
    setCharacteristics(initialCharacteristics);
    setSummary('');
    setBody('');
    setImages([]);
    setName('');
    setEmail('');
    // const objToPost = {
    //   product_id: Number(productId),
    //   rating,
    //   summary,
    //   body,
    //   recomended: recomended === 'yes',
    //   name,
    //   email,
    //   photos: images,
    //   characteristics,
    // };
    // FIXME: Fake data for testing.
    const objToPost = {
      product_id: 40344,
      rating: 4,
      summary: 'Test',
      body: 'Test',
      recommend: false,
      name: 'nick',
      email: 'mail@mail.com',
      photos: ['urlplaceholder/style_1_photo_number.jpg'],
      characteristics: {
        135219: 3,
        135220: 3,
        135221: 3,
        135222: 3,
      },
    };
    axios
      .post(
        'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews',
        objToPost,
        {
          headers: {
            Authorization: process.env.AUTH_TOKEN,
          },
        }
      )
      .then((res) => {
        setIsSubmitting(false);
        alert(JSON.stringify(res)); // FIXME: GIVE A SUCCESS TOAST
      })
      .catch((err) => {
        setIsSubmitting(false);
        alert(err.message); // FIXME: GIVE A Error TOAST
      });
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      {isSubmitting ? (
        <div>Loading...</div>
      ) : (
        <>
          <FormHeading productName={productName} />
          <OverallRating
            rating={rating}
            handleChangeRating={handleChangeRating}
          />
          <Recomended recomended={recomended} setRecomended={setRecomended} />
          <Characteristics
            characteristics={characteristics}
            setCharacteristics={setCharacteristics}
          />
          <ReviewSummary
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Review Summary. Up to 60 characters"
            maxLength={60}
            required
          />
          <ReviewBody
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Review Body. Up to 1000 characters"
            maxLength={1000}
            required
          />
          <UploadPhoto images={images} handleImageChange={handleImageChange} />
          <InfoInput
            type="text"
            value={name}
            placeholder="Your Nickname"
            onChange={(e) => setName(e.target.value)}
          />
          <InfoInput
            type="email"
            value={email}
            placeholder="Your email: example@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </>
      )}
      <SumbitBtn
        type="submit"
        value={isSubmitting ? 'Submitting...' : 'Submit'}
        disabled={isSubmitting}
      />
    </Wrapper>
  );
}

export default ReviewForm;
