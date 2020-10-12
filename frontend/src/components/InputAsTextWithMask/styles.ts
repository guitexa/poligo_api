import styled from 'styled-components';

interface InputProps {
  isErrored: boolean;
}

export const Container = styled.div<InputProps>`
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-bottom: ${({ isErrored }) =>
    isErrored ? '1px solid #9D1309' : '1px solid transparent'};
  transition: all 0.2s;

  & + div {
    margin-top: 10px;
  }

  input {
    width: 100%;
    min-width: 50px;
    color: #222;
    background-color: transparent;
    flex: 1;
    border: none;
    font-size: 13px;
    line-height: 1.6em;
    color: #222;

    &::placeholder {
      font-size: 13px;
      color: #333;
    }
  }
`;
