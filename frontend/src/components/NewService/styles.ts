import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  display: flex;
  top: 50px;
  right: 0;
  left: 0;
  width: 100vw;
  min-height: calc(100vh - 50px);
  max-height: calc(100vh - 50px);
  overflow: hidden;
  z-index: 100;
  background: #000;
  opacity: 0.7;
`;

export const ModalContainer = styled.div`
  position: absolute;
  width: 60%;
  background: #ffffff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  z-index: 200;
`;

export const Content = styled.div`
  padding: 15px;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
