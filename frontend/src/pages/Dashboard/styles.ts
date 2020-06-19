import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    position: fixed;
    left: 15px;
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

const enterEffect = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${enterEffect} 1s;

  > div {
    padding: 40px 35px;
    border-radius: 5px;
    transition: all 0.5s;
    background-color: #ffffff15;
    border: 1px solid #ffffff50;

    &:hover {
      background-color: #ffffff30;
      border: 1px solid #ffffff60;
    }

    img {
      width: 350px;
    }
  }
`;
