import styled from 'styled-components';

interface ContentProps {
  color: string;
}

interface WhatIsCompanyNameProps {
  companyNameOpen: boolean;
}

interface WhatIsCompanyCNPJProps {
  companyCNPJOpen: boolean;
}

export const Container = styled.div`
  position: absolute;
  display: flex;
  top: 50px;
  right: 0;
  left: 0;
  width: 100vw;
  bottom: 0;
  overflow: hidden;
  z-index: 99;
  background: #fff;

  > form {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100vw;
    overflow: hidden;
    display: flex;
  }
`;

export const Content = styled.div<ContentProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 15%;

  .MuiInput-underline:hover:not(.Mui-disabled)::before {
    border-color: ${({ color }) => color};
  }

  .submit-button,
  .disabled-button {
    margin-top: 15px;
  }
`;

export const AskTitle = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;

  div:nth-child(1) {
    position: absolute;
    top: 0;
    right: 100%;
    color: #999;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 5px;
    font-size: 17px;

    svg {
      width: 12px;
      height: 12px;
      margin-top: 1px;
      color: #999;
    }
  }
`;

export const WhatIsCompanyName = styled.div<WhatIsCompanyNameProps>`
  width: 50%;
  display: ${({ companyNameOpen }) => (companyNameOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 5%;

  .MuiAutocomplete-root {
    width: 100%;
  }

  .MuiFormLabel-root.Mui-focused {
    color: ${({ color }) => color};
  }

  .MuiAutocomplete-endAdornment {
    top: calc(50% - 14px);
    margin-right: 2px;
  }

  .MuiInputBase-input {
    font-size: 1rem;
    height: 2em;
    padding: 0px 30px 0 3px;
  }

  .MuiAutocomplete-inputRoot[class*='MuiInput-root'] {
    padding: 0;

    .MuiAutocomplete-input:first-child {
      padding: 0 0 0 4px;
      margin-bottom: -1px;
    }
  }
`;

export const WhatIsCompanyCNPJ = styled.div<WhatIsCompanyCNPJProps>`
  width: 50%;
  display: ${({ companyCNPJOpen }) => (companyCNPJOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 5%;

  .MuiFormControl-root {
    width: 100%;
  }

  .MuiInputBase-input {
    font-size: 1rem;
    height: 2em;
    padding: 0px 30px 0px 4px;
    margin-bottom: -1px;
    /* width: calc(100% + 28px); */
  }

  .MuiInputBase-root {
    width: calc(100% + 28px);
  }

  .MuiIconButton-root {
    padding: 3px;
    margin: 4px 0px 1px 2px;
  }

  .MuiSvgIcon-root {
    font-size: 1.23rem;
    color: #0000008a;
  }

  .MuiGrid-align-items-xs-flex-end {
    align-items: flex-start;
  }

  .MuiGrid-container {
    width: 100%;
    margin: 0;

    .MuiGrid-item:nth-child(1) {
      width: calc(100% - 28px);
    }

    .MuiGrid-item {
      padding: 0;

      & > .MuiSvgIcon-root {
        margin: 0 0 -2px 5px;
      }
    }
  }
`;
