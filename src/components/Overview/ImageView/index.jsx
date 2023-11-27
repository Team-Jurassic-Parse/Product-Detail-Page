import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel'; //eslint-disable-line


function UnstyledImageView({ currentStyle }) { // eslint-disable-line
  if(currentStyle){
    // console.log('picture', currentStyle.photos[0].url)
  }

  const [currentImg, setCurrentImg] = useState(0);
  const [start, setStart] = useState(0);

  const displayedThumbnails = React.useMemo(() => {
    const newThumbs = [];
    if(currentStyle) {
      currentStyle.photos.slice(start, start + 4).map((photo) => {
        if(photo && photo.thumbnail_url) {
          newThumbs.push(photo.thumbnail_url)
        }
      })
    }
    return newThumbs;
  }, [start, currentStyle])


  useEffect(() => {
    if(currentStyle) {
      setStart(0);
    }
  }, [currentStyle])


  const imgStyle = {
    display: 'block',
    height: '80vh',
    width: '100%',
    objectFit: 'contain',
    objectPosition: 'center center',
    marginLeft: 'auto',
    marginRight: 'auto',
    gridRowStart: '1',
    gridColumnStart: '1'
  }

  const imageViewStyle = {
    marginRight: '20px',
    backgroundColor: 'lightgray',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: '1fr'
  }

  const imgSelectorStyle = {
    backgroundColor: 'transparent',
    height: 'calc(' + displayedThumbnails.length + ' * (min(10vh, 5vw)) + 90px)',
    width: 'calc(min(10vh, 5vw) + 4px)',
    gridRowStart: '1',
    gridColumnStart: '1',
    display: 'grid',
    position: 'relative',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '40px 1fr 1fr 1fr 1fr 40px',
    borderRadius: 'min(2vh, 1vw)',
    top: 'calc(20vh - 40px)',
    left: '1vw',
    overflow: 'hidden'
  }

  const arrowStyle = {
    border: 'none',
    backgroundColor: 'white',
    color: 'gray',
    cursor: 'pointer'
  }

  const thumbnailStyle = {
    height: 'calc(min(10vh, 5vw))',
    width: 'calc(min(10vh, 5vw))',
    objectFit: 'cover',
    objectPosition: 'center center',
  }


  return (
    <div style={imageViewStyle}>
      {currentStyle && <img style={imgStyle} src={currentStyle.photos[currentImg].url} alt={currentStyle.name}></img>}
      {currentStyle && <div style={imgSelectorStyle}>
        {start > 0 ? <button
          style={arrowStyle}
          onClick={() => setStart(start - 1)}
        >
          ˄
        </button> : <div style={{visibility: 'hidden', backgroundColor: 'transparent', color: 'transparent'}}></div>}
        {displayedThumbnails.map((item, index) =>
          <img style={{
              height: 'calc(min(10vh, 5vw))',
              width: 'calc(min(10vh, 5vw))',
              objectFit: 'cover',
              objectPosition: 'center center',
              borderBottom: start + index === currentImg ? '2px solid black' : '2px solid white',
              borderTop: start + index === currentImg ? '2px solid black' : index === 0 && '2px solid white',
              borderLeft: start + index === currentImg ? '2px solid black' : '2px solid white',
              borderRight: start + index === currentImg ? '2px solid black' : '2px solid white',
            }}
            onClick={() => setCurrentImg(start + index)}
            src={item}></img>
        )}
        {start + 4 < currentStyle.photos.length && <button style={arrowStyle} onClick={() => setStart(start + 1)}>˅</button>}
      </div>}
    </div>
  );
}

const ImageView = styled(UnstyledImageView)`

`;

export default ImageView;
