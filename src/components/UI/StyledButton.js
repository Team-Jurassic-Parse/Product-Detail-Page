import styled from 'styled-components';

const ButtonWrapper = styled.button`
  display: block;
  background: #000000;
  width: ${(p) => p.width || '100%'};
  height: ${(p) => p.height || '30px'};
  color: #fff;
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

export default ButtonWrapper;
