import { createGlobalStyle } from 'styled-components';

import Background from '../assets/bg.png';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  #root {
    background: url(${Background}) no-repeat center center fixed;
    background-size: cover;
    height: 100vh;
    width: 100vw;
  }

  body {
    background: #222;
    color: #f2f2f2;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Calibri', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong, b {
    font-weight: bold;
  }
  button {
    cursor: pointer;
  }
`;
