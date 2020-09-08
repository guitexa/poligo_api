import styled from 'styled-components';

interface ContentProps {
  color: string;
}

export const Outside = styled.div`
  z-index: 100;

  button {
    position: absolute;
    top: 8px;
    right: 15px;
  }
`;

export const Container = styled.div`
  position: absolute;
  display: flex;
  top: 110px;
  right: 0;
  left: 0;
  width: 100vw;
  min-height: calc(100vh - 110px);
  max-height: calc(100vh - 110px);
  overflow: hidden;
  z-index: 0;
`;

export const Content = styled.div`
  width: 100%;
  overflow-y: scroll;
  background: #fff;
`;

export const RowResult = styled.button<ContentProps>`
  padding: 0 5px 0 18px;
  margin: 2px 0;
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: transparent;
  outline: none;
  border: none;

  &:hover {
    background: ${({ color }) => color};
    color: #fff;

    svg {
      color: #fff;
    }
  }

  div {
    font-size: 13px;
    padding: 0 4px 0 2px;
  }
`;

export const Date = styled.div`
  display: flex;
  align-items: center;
  width: 8.88%;
  justify-content: center;
`;

export const CompanyName = styled.div`
  display: flex;
  align-items: center;
  width: 26.48%;
`;

export const Service = styled.div`
  display: flex;
  align-items: center;
  width: 23.55%;
`;

export const Seller = styled.div`
  display: flex;
  align-items: center;
  width: 13.47%;
`;

export const Value = styled.div`
  display: flex;
  align-items: center;
  width: 10.46%;
  justify-content: space-between;
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
  width: 7.37%;
  justify-content: center;

  svg {
    width: 15px;
    height: 15px;
    padding: 0.5px;
  }

  .fa-times {
    width: 19px;
    height: 19px;
    margin-right: 0.5px;
    color: #f00;
  }

  .fa-check {
    color: #1b914f;
  }

  .fa-clock {
    color: #999;
  }
`;
