import React, { useId } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;
const ImageInput = styled.input`
  display: none;
`;

const Thumbnail = styled.img`
  height: 100px;
  width: 100px;
`;

function UploadPhoto({ images, handleImageChange }) { // eslint-disable-line
  const id = useId();

  const handleInputChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const newImages = selectedFiles.map((file) => URL.createObjectURL(file));
    handleImageChange(newImages);
  };

  return (
    <Wrapper>
      <ImageInput
        type="file"
        accept="image/"
        onChange={handleInputChange}
        multiple
        id={`${id}-imageInput`}
      />
      {images.length < 5 && ( // eslint-disable-line
        <button
          type="button"
          onClick={() => document.getElementById(`${id}-imageInput`).click()}
        >
          Upload Photo
        </button>
      )}
      {images.map((image) => (<Thumbnail key={image} src={image} alt={image} />))} {/* eslint-disable-line */}
    </Wrapper>
  );
}

export default UploadPhoto;
