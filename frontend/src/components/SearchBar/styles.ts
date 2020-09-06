import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 15px 15px 15px;
  background: #fff;
  position: absolute;
  top: 50px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
`;

export const Date = styled.div`
  width: 10%;

  label {
    line-height: 0px;
    margin-left: 2px;
    font-size: 12px;
  }

  .MuiInputLabel-formControl {
    transform: translate(0, 18px) scale(1);
  }
  .MuiInputLabel-shrink {
    transform: translate(0, 1.5px) scale(0.7);
  }

  #date-picker-dialog-helper-text,
  #date-picker-inline-helper-text {
    display: none;
  }

  .MuiInputBase-input {
    font-size: 0.8rem;
    height: 1.8em;
    width: 100%;
    padding: 0px 0 0 2px;
    margin-right: -10px;
  }

  .MuiIconButton-root {
    padding: 6px;
    margin: 0 -2px -2px 0;
  }

  .MuiSvgIcon-root {
    font-size: 1.1rem;
  }

  .MuiInputBase-root {
    margin-top: 4px;
  }
`;

export const CompanyName = styled.div`
  width: 27%;

  .MuiFormControl-root {
    width: 100%;
  }

  label {
    line-height: 0px;
    margin-left: 2px;
    font-size: 12px;
  }

  .MuiInputLabel-formControl {
    transform: translate(0, 19px) scale(1);
  }
  .MuiInputLabel-shrink {
    transform: translate(0, 1.5px) scale(0.7);
  }

  #date-picker-dialog-helper-text,
  #date-picker-inline-helper-text {
    display: none;
  }

  .MuiInputBase-input {
    font-size: 0.8rem;
    height: 1.8em;
    width: 100%;
    padding: 0px 30px 0 2px;
  }

  .MuiIconButton-root {
    padding: 4px;
    margin: 0 0 -2px -28px;
  }

  .MuiSvgIcon-root {
    font-size: 1.23rem;
    color: #0000008a;
  }

  .MuiInputBase-root {
    margin-top: 4px;
  }
`;

export const Service = styled.div`
  width: 24%;

  .MuiFormControl-root {
    width: 100%;
  }

  label {
    line-height: 0px;
    margin-left: 2px;
    font-size: 12px;
  }

  .MuiInputLabel-formControl {
    transform: translate(0, 19px) scale(1);
  }
  .MuiInputLabel-shrink {
    transform: translate(0, 1.5px) scale(0.7);
  }

  #date-picker-dialog-helper-text,
  #date-picker-inline-helper-text {
    display: none;
  }

  .MuiInputBase-input {
    font-size: 0.8rem;
    height: 1.8em;
    width: 100%;
    padding: 0px 30px 0 2px;
  }

  .MuiIconButton-root {
    padding: 4px;
    margin: 0 0 -2px -28px;
  }

  .MuiSvgIcon-root {
    font-size: 1.23rem;
    color: #0000008a;
  }

  .MuiInputBase-root {
    margin-top: 4px;
  }
`;

export const Seller = styled.div`
  width: 14%;

  label {
    line-height: 0px;
    margin-left: 2px;
    font-size: 12px;
  }

  .MuiInputLabel-formControl {
    transform: translate(0, 18px) scale(1);
  }
  .MuiInputLabel-shrink {
    transform: translate(0, 1.5px) scale(0.7);
  }

  #date-picker-dialog-helper-text,
  #date-picker-inline-helper-text {
    display: none;
  }

  .MuiInputBase-input {
    font-size: 0.8rem;
    height: 1.8em;
    width: 100%;
    padding: 0px 30px 0 2px;
  }

  .MuiIconButton-root {
    padding: 4px;
    margin: 0 0 -2px -28px;
  }

  .MuiSvgIcon-root {
    font-size: 1.3rem;
    color: #0000008a;
  }

  .MuiInputBase-root {
    margin-top: 4px;
  }

  .MuiFormControl-root {
    margin: 0;
    max-width: 100%;
    min-width: 100%;
  }

  .MuiSelect-icon {
    top: 10%;
  }

  .MuiSelect-select:focus {
    background-color: transparent;
  }
`;

export const Value = styled.div`
  width: 9.5%;

  .MuiFormControl-root {
    width: 100%;
  }

  .MuiIconButton-root {
    padding: 4px;
    margin: 0 0 -2px -4px;
  }

  .MuiTypography-root {
    margin: 2px 0 1px 2px;
    font-size: 0.75rem;
  }

  #date-picker-dialog-helper-text,
  #date-picker-inline-helper-text {
    display: none;
  }

  label {
    line-height: 0px;
    margin-left: 2px;
    font-size: 12px;
  }

  .MuiInputLabel-formControl {
    transform: translate(0, 19px) scale(1);
  }
  .MuiInputLabel-shrink {
    transform: translate(0, 1.5px) scale(0.7);
  }

  .MuiInputBase-input {
    font-size: 0.8rem;
    height: 1.8em;
    width: 75%;
    padding: 0px 30px 0 0;
  }

  div:nth-child(1) > div:nth-child(2) {
    margin-right: -30px;
  }

  .MuiSvgIcon-root {
    font-size: 1.23rem;
    color: #0000008a;
  }

  div:nth-child(1) > div:nth-child(2) > .MuiSvgIcon-root {
    margin-bottom: -2px;
  }

  .MuiInputBase-root {
    margin-top: 4px;
    width: 100px;
  }
`;

export const Status = styled.div`
  width: 8%;

  label {
    line-height: 0px;
    margin-left: 2px;
    font-size: 12px;
  }

  .MuiInputLabel-formControl {
    transform: translate(0, 18px) scale(1);
  }
  .MuiInputLabel-shrink {
    transform: translate(0, 1.5px) scale(0.7);
  }

  #date-picker-dialog-helper-text,
  #date-picker-inline-helper-text {
    display: none;
  }

  .MuiInputBase-input {
    font-size: 0.8rem;
    height: 1.8em;
    width: 100%;
    padding: 0px 30px 0 2px;
  }

  .MuiIconButton-root {
    padding: 4px;
    margin: 0 0 -2px -28px;
  }

  .MuiSvgIcon-root {
    font-size: 1.3rem;
    color: #0000008a;
  }

  .MuiInputBase-root {
    margin-top: 4px;
  }

  .MuiFormControl-root {
    margin: 0;
    max-width: 100%;
    min-width: 100%;
  }

  .MuiSelect-icon {
    top: 10%;
  }

  .MuiSelect-select:focus {
    background-color: transparent;
  }
`;
