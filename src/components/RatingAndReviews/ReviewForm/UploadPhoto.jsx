import React, { useId } from 'react';
import styled from 'styled-components';
import ButtonWrapper from '../../UI/StyledButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ImageInput = styled.input`
  display: none;
`;

const Thumbnail = styled.img`
  height: 100px;
  width: 100px;
`;

function UploadPhoto({ images, handleImageChange }) {
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
        data-testid="file-input"
      />
      {images.length < 5 && (
        <ButtonWrapper
          type="button"
          width="120px"
          onClick={() => document.getElementById(`${id}-imageInput`).click()}
        >
          Upload Photo
        </ButtonWrapper>
      )}
      {images.map((image) => (<Thumbnail key={image} src={image} alt={image} />))}
    </Wrapper>
  );
}

export default UploadPhoto;
