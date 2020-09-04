import styled from 'styled-components';

interface ContainerProps {
  color: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 50px;
  background: ${({ color }) => color};
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  color: #f2f2f2;
  font-size: 20px;
`;
