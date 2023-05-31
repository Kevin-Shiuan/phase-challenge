import styled from 'styled-components';

export const RenameInput = styled.input`
  background-color: transparent;
  border-radius: 0.25rem;
  outline: 2px solid;
  outline-offset: 0.25rem;
  font-size: 1rem;
  font-family: inherit;
  color: inherit;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline-color: #3182ce;
  }
`;
