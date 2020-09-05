import styled from 'styled-components';
import { shade } from 'polished';

import Logotipo from '../../assets/logotipo.svg';

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
  padding-right: 20px;
  justify-content: space-between;
  z-index: 99999;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Menu = styled.div`
  width: 70px;
  height: 50px;
  background: url(${Logotipo}) no-repeat center center;
  background-size: 40px 40px;
  cursor: pointer;
  z-index: 99999;

  &:hover {
    #sub-menu {
      opacity: 1;
      visibility: visible;
    }
  }

  #comercial {
    background: #004a82;

    &:hover {
      background: ${shade(0.1, '#004a82')};
    }
  }

  #technical-area {
    background: #1c8f07;

    &:hover {
      background: ${shade(0.1, '#1c8f07')};
    }
  }

  #billing {
    background: #c9a100;

    &:hover {
      background: ${shade(0.1, '#c9a100')};
    }
  }

  #exit {
    background: #111;

    &:hover {
      background: #000;
    }
  }

  #sub-menu {
    width: 220px;
    position: absolute;
    top: 50px;
    left: 0;
    opacity: 0;
    visibility: hidden;
    transition: 0.2s all;
    padding-top: 1px;

    a {
      display: inline-flex;
      padding: 10px 15px;
      text-decoration: none;
      color: #fff;
      transition: 0.2s all;

      img {
        width: 40px;
      }

      div {
        margin-left: 12px;

        .title {
          font-size: 16px;
        }

        .text {
          font-size: 10px;
          line-height: 11px;
        }
      }
    }

    button {
      display: inline-flex;
      padding: 10px 20px;
      text-decoration: none;
      color: #fff;
      align-items: center;
      position: initial;
      opacity: initial;
      outline: none;
      border: none;

      img {
        margin-left: 5px;
        width: 20px;
      }

      .title {
        font-size: 16px;
        margin-left: 20px;
      }
    }
  }

  #icon {
    width: 50px;
    height: 50px;
  }
`;

export const Title = styled.div`
  color: #fff;
  font-size: 20px;
`;

export const Cover = styled.div`
  width: 100vw;
  height: 100vh;
  background: #00000099;
  z-index: 9999;
`;
