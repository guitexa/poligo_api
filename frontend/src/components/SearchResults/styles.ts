import styled from 'styled-components';

interface ContentProps {
  color: string;
}

export const OrderOverlapping = styled.div`
  z-index: 100;

  & > button {
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
  bottom: 0;
  overflow: hidden;
  z-index: 0;
  background: #fff;
`;

export const Content = styled.div`
  width: 100%;
  overflow-y: scroll;
`;

export const RowResult = styled.button<ContentProps>`
  padding: 0 0 0 15px;
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

  div {
  }

  &:hover {
    background: ${({ color }) => color};
    color: #fff;

    svg {
      color: #fff;
    }
  }

  > div {
    font-size: 13px;
    padding: 0 5px 0 5px;

    & + div {
      margin-left: 10px;
    }
  }
`;

export const DateField = styled.div`
  width: 9.5%;
  max-width: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const CompanyName = styled.div`
  flex: 1;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const Service = styled.div`
  flex: 1;
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const Seller = styled.div`
  width: 14%;
  max-width: 200px;
  display: flex;
  align-items: center;
  text-align: left;
`;

export const Value = styled.div`
  width: 11%;
  max-width: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Status = styled.div`
  width: 8%;
  max-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 15px;
    height: 15px;
    padding: 0.5px;
  }

  .fa-clock {
    color: #999;
  }

  .fa-check {
    color: #1b914f;
  }

  .fa-times {
    width: 19px;
    height: 19px;
    color: #f00;
  }
`;
