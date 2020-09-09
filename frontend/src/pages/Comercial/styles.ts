import styled from 'styled-components';

export const OrderOverlapping = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 200;

  & > button {
    position: absolute;
    top: 8px;
    right: 15px;
  }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
