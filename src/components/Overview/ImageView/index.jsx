import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';

function UnstyledImageView({ currentStyle, view, setView, currentImg, setCurrentImg, start, setStart }) {

  const [zooming, setZooming] = useState(false);

  const displayedThumbnails = React.useMemo(() => {
    const newThumbs = [];
    if (currentStyle) {
      currentStyle.photos.slice(start, start + 4).map((photo) => {
        if (photo && photo.thumbnail_url) {
          newThumbs.push(photo.thumbnail_url);
        }
      });
    }
    return newThumbs;
  }, [start, currentStyle]);

  const [mousePos, setMousePos] = useState({});

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.layerX, y: event.layerY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove,
      );
    };
  }, []);

  useEffect(() => {
    if (currentStyle) {
      setStart(0);
    }
  }, [currentStyle]);

  const imgStyle = {
    display: 'block',
    height: '80vh',
    width: '100%',
    objectFit: 'contain',
    objectPosition: view === 'expanded' && zooming ? `calc(125% - ${mousePos.x}px) calc(40vh - ${mousePos.y}px)` : 'center center',
    marginLeft: 'auto',
    marginRight: 'auto',
    gridRowStart: '1',
    gridColumnStart: '1',
    transform: view === 'expanded' && zooming ? 'scale(2.5)' : 'scale(1)',
    cursor: view === 'expanded' && !zooming ? 'cell' : 'pointer',
  };

  const imageViewStyle = {
    marginRight: view === 'default' ? '20px' : '0px',
    backgroundColor: 'lightgray',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: '1fr',
  };

  const imgSelectorStyle = {
    backgroundColor: 'transparent',
    height: `calc( ${displayedThumbnails.length} * (min(10vh, 5vw)) + 90px)`,
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
    overflow: 'hidden',
  };

  const arrowStyle = {
    border: 'none',
    backgroundColor: 'white',
    color: 'gray',
    cursor: 'pointer',
  };

  const rightArrowStyle = {
    position: 'relative',
    gridRowStart: '1',
    gridColumnStart: '1',
    display: 'grid',
    height: '35px',
    width: '35px',
    border: 'none',
    borderRadius: '20px',
    fontSize: '30px',
    cursor: 'pointer',
    color: '#000000a0',
    backgroundColor: '#eeeeeea0',
    top: 'calc(40vh - 17.5px)',
    left: 'calc(100% - 50px)',
  };

  const leftArrowStyle = {
    position: 'relative',
    gridRowStart: '1',
    gridColumnStart: '1',
    display: 'grid',
    height: '35px',
    width: '35px',
    border: 'none',
    borderRadius: '20px',
    fontSize: '30px',
    cursor: 'pointer',
    color: '#000000a0',
    backgroundColor: '#eeeeeea0',
    top: 'calc(40vh - 17.5px)',
    left: 'calc(min(10vh, 5vw) + 24px)',
  };

  const exitButtonStyle = {
    position: 'relative',
    gridRowStart: '1',
    gridColumnStart: '1',
    display: 'grid',
    height: '35px',
    width: '35px',
    border: 'none',
    borderRadius: '20px',
    fontSize: '30px',
    cursor: 'pointer',
    color: '#fffffa0',
    background: 'none',
    left: 'calc(100% - 50px)',
    top: '3px',
    transform: 'scale(1.2, 1)',
  };

  return (
    <div
      style={imageViewStyle}
      onClick={() => {
        if (view === 'default') {
          setView('expanded');
        }
      }}
    >
      {currentStyle && currentStyle.photos && (
        <img
          style={imgStyle}
          src={currentStyle.photos[currentImg].url}
          alt={currentStyle.name}
          onClick={() => {
            if (view === 'expanded') {
              setZooming(!zooming);
            }
          }}
        />
      )}
      {currentStyle && (
      <>
        <div style={imgSelectorStyle}>
          {start > 0 ? (
            <button
              type="button"
              style={arrowStyle}
              onClick={(e) => {
                e.stopPropagation();
                setStart(start - 1);
              }}
            >
              <p style={{ transform: 'scale(2, 1)' }}>˄</p>
            </button>
          ) : <div style={{ visibility: 'hidden', backgroundColor: 'transparent', color: 'transparent' }} />}
          {displayedThumbnails.map((item, index) => (
            <img
              style={{
                height: 'calc(min(10vh, 5vw))',
                width: 'calc(min(10vh, 5vw))',
                objectFit: 'cover',
                objectPosition: 'center center',
                borderBottom: start + index === currentImg ? '2px solid black' : '2px solid white',
                borderTop: start + index === currentImg ? '2px solid black' : index === 0 && '2px solid white',
                borderLeft: start + index === currentImg ? '2px solid black' : '2px solid white',
                borderRight: start + index === currentImg ? '2px solid black' : '2px solid white',
              }}
              alt={currentImg}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImg(start + index);
              }}
              src={item}
              key={item}
            />
          ))}
          {start + 4 < currentStyle.photos.length
            && (
              <button
                style={arrowStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  setStart(start + 1);
                }}
                type="button"
              >
                <p style={{ transform: 'scale(2, 1)' }}>˅</p>
              </button>
            )}
        </div>
        {currentStyle.photos && currentImg < currentStyle.photos.length - 1 && (
          <button
            type="button"
            style={rightArrowStyle}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImg(currentImg + 1);
            }}
          >
            <p style={{
              transform: 'scale(1, 1.5)',
              position: 'relative',
              top: '-30px',
              left: '2px',
            }}
            >
              {'>'}
            </p>
          </button>
        )}
        {currentStyle.photos && currentImg > 0 && (
          <button
            type="button"
            style={leftArrowStyle}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImg(currentImg - 1);
            }}
          >
            <p style={{
              transform: 'scale(1, 1.5)',
              position: 'relative',
              top: '-30px',
              right: '2px',
            }}
            >
              {'<'}
            </p>
          </button>
        )}
        {view === "expanded" && (
          <button
            type="button"
            style={exitButtonStyle}
            onClick={(e) => {
              e.stopPropagation();
              setView('default');
            }}
          >
            x
          </button>
        )}
      </>
      )}
    </div>
  );
}

const ImageView = styled(UnstyledImageView)`

`;

export default ImageView;
