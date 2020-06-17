import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  border-radius: 5px;
  width: 100%;

  svg {
    margin: 0 10px 0 12px;
    color: #aaa;
  }

  input {
    padding: 10px 0;
    background-color: transparent;
    border: none;
    flex: 1;

    &::placeholder {
      color: #aaa;
    }
  }

    & + div {
      margin-top: 10px;
    }
  }
`;
