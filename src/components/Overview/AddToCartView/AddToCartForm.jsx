import styled from 'styled-components';

const AddToCartForm = styled.form`
text-align: center;
overflow-y: scroll;
-ms-overflow-style: none;
scrollbar-width: none;
&::-webkit-scrollbar {
  display: none;
}
max-height: 20vh;
`;

export default AddToCartForm;
