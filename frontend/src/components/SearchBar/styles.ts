import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px 15px 3px 15px;
  background: #fff;
  position: absolute;
  top: 50px;
  display: flex;
  align-items: center;

  label {
    line-height: 0px;
    margin-left: 2px;
  }

  .MuiInputLabel-formControl {
    transform: translate(0, 17px) scale(1);
  }
  .MuiInputLabel-shrink {
    transform: translate(0, 1.5px) scale(0.7);
  }

  #date-picker-dialog-helper-text,
  #date-picker-inline-helper-text {
    display: none;
  }

  .MuiInputBase-input {
    font-size: 0.85rem;
    height: 1.8em;
    width: 60px;
    padding: 2px 0 0 2px;
    margin-right: -10px;
  }

  .MuiIconButton-root {
    padding: 6px;
    margin: 0 -4px -3px 0;
  }

  .MuiSvgIcon-root {
    font-size: 1.1rem;
  }

  .MuiInputBase-root {
    margin-top: 4px;
  }
`;
