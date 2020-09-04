import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    position: fixed;
    right: 15px;
    top: 15px;
    background-color: transparent;
    border: none;
    opacity: 0.5;
    transition: all 0.2s;
    color: #fff;

    &:hover {
      opacity: 1;
    }
  }
`;
