import styled from 'styled-components';

interface ContainerProps {
  color: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 60px;
  position: fixed;
  top: 50px;
  right: 0;
  left: 0;
  padding: 0 15px 15px 15px;
  background: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  z-index: 0;

  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-color: ${({ color }) => color};
  }
`;

export const Date = styled.div`
  width: 9.5%;

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
    height: 1.95em;
    padding: 0px 0 0 3px;
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
    height: 1.95em;
    padding: 0px 25px 0 3px;
  }

  .MuiTypography-root {
    margin: 2px 0 1px 2px;
    font-size: 0.75rem;
  }

  .MuiInputBase-root {
    margin-top: 4px;
    width: calc(100% + 28px);
  }

  .MuiIconButton-root {
    padding: 3px;
    margin: 0 0px -1px 2px;
  }

  .MuiSvgIcon-root {
    font-size: 1.23rem;
    color: #0000008a;
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
    height: 1.95em;
    padding: 0px 25px 0 3px;
  }

  .MuiTypography-root {
    margin: 2px 0 1px 2px;
    font-size: 0.75rem;
  }

  .MuiInputBase-root {
    margin-top: 4px;
    width: calc(100% + 28px);
  }

  .MuiIconButton-root {
    padding: 3px;
    margin: 0 0px -1px 2px;
  }

  .MuiSvgIcon-root {
    font-size: 1.23rem;
    color: #0000008a;
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
    transform: translate(0.5px, 1.5px) scale(0.7);
  }

  #date-picker-dialog-helper-text,
  #date-picker-inline-helper-text {
    display: none;
  }

  .MuiInputBase-input {
    font-size: 0.8rem;
    height: 1.95em;
    padding: 0px 30px 0 3px;
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

  .MuiSelect-select.MuiSelect-select {
    padding-right: 20px;
    margin-left: -4px;
  }
`;

export const Value = styled.div`
  width: 11%;

  .MuiFormControl-root {
    width: 100%;
  }

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
    height: 1.95em;
    padding: 0px 25px 0 3px;
  }

  .MuiTypography-root {
    margin: 2px 0 1px 2px;
    font-size: 0.75rem;
  }

  .MuiInputBase-root {
    margin-top: 4px;
    width: calc(100% + 28px);
  }

  .MuiIconButton-root {
    padding: 3px;
    margin: 0 0px -1px 2px;
  }

  .MuiSvgIcon-root {
    font-size: 1.23rem;
    color: #0000008a;
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
    transform: translate(0.5px, 1.5px) scale(0.7);
  }

  #date-picker-dialog-helper-text,
  #date-picker-inline-helper-text {
    display: none;
  }

  .MuiInputBase-input {
    font-size: 0.8rem;
    height: 1.95em;
    padding: 0px 30px 0 3px;
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

  .MuiSelect-select.MuiSelect-select {
    padding-right: 20px;
    margin-left: -4px;
  }
`;
