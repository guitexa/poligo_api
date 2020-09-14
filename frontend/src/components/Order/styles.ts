import styled from 'styled-components';

interface ServiceRowProps {
  color: string;
}

interface AddServiceButtonProps {
  color: string;
}

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
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50px;
  right: 0;
  left: 0;
  width: 100vw;
  bottom: 0;
  background: #fff;
  font-size: 13px;
  overflow: hidden;
`;

export const PrimaryContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SecondaryContent = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  position: relative;
`;

export const AddServiceButton = styled.button<AddServiceButtonProps>`
  width: 32px;
  height: 32px;
  background: #888;
  border-radius: 50%;
  border: 5px solid #fff;
  display: flex;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  outline: none;
  position: absolute;
  left: calc(50% - 16.5px);
  margin-bottom: -14px;
  transition: 0.2s all;

  &:hover {
    background: ${({ color }) => color};
  }

  svg {
    color: #fff;
    width: 14px;
    height: 14px;
    margin: 4px;
  }
`;

export const TitlesForm = styled.div`
  width: 40%;
  padding-right: 10px;

  p {
    color: #888;
    line-height: 18px;
    text-align: right;
  }
`;

export const DataForm = styled.div`
  width: 60%;

  p {
    font-size: 12px;
    color: #222;
    line-height: 18px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    svg {
      width: 13px;
      height: 13px;
      color: #888;
      padding: 0 0.5px;

      & + span {
        margin-left: 5px;
      }
    }

    span {
      & + svg {
        margin-left: 4px;
      }
    }
  }
`;

export const CompanyData = styled.div`
  width: 50%;
  padding: 15px;
  border-bottom: 1px solid #999;
  border-right: 1px solid #999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OrderData = styled.div`
  width: 50%;
  padding: 15px;
  border-bottom: 1px solid #999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DeliveryData = styled.div`
  width: 50%;
  padding: 15px;
  height: 120px;
  border-bottom: 1px solid #999;
  border-right: 1px solid #999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BillingData = styled.div`
  width: 50%;
  padding: 15px;
  height: 120px;
  border-bottom: 1px solid #999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ServicesOrderContent = styled.div`
  width: 100%;
  padding-bottom: 30px;
  overflow-y: auto;
`;

export const TitleRow = styled.div`
  width: 100%;
  padding: 15px;
  display: flex;
  height: 35px;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  text-decoration: underline;
`;

export const ServiceRow = styled.div<ServiceRowProps>`
  width: 100%;
  padding: 10px 15px;
  display: flex;
  height: 24px;
  align-items: center;
  justify-content: space-between;
  cursor: default;

  &:hover {
    background: ${({ color }) => color};
    color: #fff;

    button {
      svg {
        color: #ffffff70;
      }
    }
  }

  > div {
    padding-left: 6px;
  }
`;

export const ServiceName = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const ServiceDescription = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const ServiceValue = styled.div`
  width: 15%;
  max-width: 180px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    background: transparent;
    outline: none;
    border: none;
    height: 24px;

    &:hover {
      svg {
        color: #fff;
      }
    }

    svg {
      width: 18px;
      height: 18px;
      color: transparent;
      padding: 0 0.5px;
      margin-left: 5px;
    }
  }
`;
