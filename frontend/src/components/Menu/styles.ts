import styled from 'styled-components';
import { shade } from 'polished';

import Logotipo from '../../assets/logotipo.svg';

export const Container = styled.div`
  width: 70px;
  height: 50px;
  background: url(${Logotipo}) no-repeat center center;
  background-size: 40px 40px;
  cursor: pointer;

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
    background: #d9b420;

    &:hover {
      background: ${shade(0.1, '#d9b420')};
    }
  }

  #sub-menu {
    width: calc(182px + 40px);
    position: absolute;
    top: 50px;
    left: 0;
    /* opacity: 0;
    visibility: hidden; */
    transition: 0.2s all;

    a {
      display: inline-flex;
      padding: 10px 20px;
      text-decoration: none;
      color: #f2f2f2;
      margin-top: 1px;

      & + a {
        margin-top: 2px;
      }

      img {
        width: 50px;
      }

      div {
        margin-left: 20px;

        strong {
          font-size: 15px;
        }

        p {
          font-size: 12px;
        }
      }
    }
  }

  #icon {
    width: 50px;
    height: 50px;
  }
`;
