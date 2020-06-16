import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-color: #ffffff50;
  padding: 40px 35px;
  border-radius: 5px;
  border: 1px solid #ffffff80;

  animation: ${enterEffect} 1s;

  img {
    width: 250px;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin: 30px 10px 0 10px;
    justify-content: center;
    align-items: center;
    flex: 1;

    a {
      margin-top: 3px;
      color: #00000080;
      font-size: 12px;
      text-decoration: none;
      align-self: flex-start;
      transition: all 0.2s;

      &:hover {
        color: #000;
      }
    }

    button {
      background-color: #0181ca;
      color: #fff;
      margin-top: 25px;
      border-radius: 3px;
      border: none;
      padding: 8px 60px;
      font-size: 18px;
      transition: all 0.2s;

      &:hover {
        background-color: ${shade(0.3, '#0181ca')};
      }
    }
  }
`;
