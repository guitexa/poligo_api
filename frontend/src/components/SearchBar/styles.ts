import styled from 'styled-components';

interface ContainerProps {
  color: string;
}

interface StatusProps {
  value: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 45px;
  position: fixed;
  top: 50px;
  right: 0;
  left: 0;
  padding: 0 15px;
  background: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  z-index: 0;
  overflow: hidden;

  .MuiInput-underline::after,
  .MuiInput-underline:hover:not(.Mui-disabled)::before {
    border-color: ${({ color }) => color};
  }

  > div {
    & + div {
      margin-left: 10px;
    }
  }
`;

export const Date = styled.div`
  width: 9.5%;
  max-width: 100px;

  label {
    line-height: 0px;
    margin-left: 2px;
    font-size: 12px;
  }

  .MuiInputLabel-formControl {
    transform: translate(0, 17px) scale(1.1);
  }
  .MuiInputLabel-shrink {
    transform: translate(0.5px, 1.5px) scale(0.9);
  }

  #date-picker-dialog-helper-text,
  #date-picker-inline-helper-text {
    display: none;
  }

  .MuiInputBase-input {
    font-size: 0.8rem;
    height: 1.85em;
    padding: 0px 0 0 4px;
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
  flex: 1;

  .MuiFormControl-root {
    width: 100%;
  }

  label {
    line-height: 0px;
    margin-left: 2px;
    font-size: 12px;
  }

  .MuiInputLabel-formControl {
    transform: translate(0, 16.5px) scale(1.1);
  }
  .MuiInputLabel-shrink {
    transform: translate(0px, 1px) scale(0.9);
  }

  #date-picker-dialog-helper-text,
  #date-picker-inline-helper-text {
    display: none;
  }

  .MuiInputBase-input {
    font-size: 0.8rem;
    height: 1.95em;
    padding: 0px 25px 0 4px;
    margin-bottom: -1px;
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
  flex: 1;

  .MuiFormControl-root {
    width: 100%;
  }

  label {
    line-height: 0px;
    margin-left: 2px;
    font-size: 12px;
  }

  .MuiInputLabel-formControl {
    transform: translate(0, 16.5px) scale(1.1);
  }
  .MuiInputLabel-shrink {
    transform: translate(0px, 1px) scale(0.9);
  }

  #date-picker-dialog-helper-text,
  #date-picker-inline-helper-text {
    display: none;
  }

  .MuiInputBase-input {
    font-size: 0.8rem;
    height: 1.95em;
    padding: 0px 25px 0 4px;
    margin-bottom: -1px;
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
  max-width: 200px;

  .MuiAutocomplete-root {
    width: 100%;
  }

  .MuiInput-underline::after {
    border-color: ${({ color }) => color};
  }

  .MuiFormLabel-root.Mui-focused {
    color: ${({ color }) => color};
  }

  label {
    line-height: 0px;
    margin-left: 2px;
    font-size: 12px;
  }

  .MuiInputLabel-formControl {
    transform: translate(0, 28px) scale(1.1);
  }
  .MuiInputLabel-shrink {
    transform: translate(0px, 12px) scale(0.9);
  }

  .MuiAutocomplete-endAdornment {
    top: calc(50% - 15px);
    margin-right: 2px;
  }

  .MuiInputBase-input {
    font-size: 0.8rem;
    height: 1.85em;
    padding: 0px 30px 0 3px;
  }

  .MuiAutocomplete-inputRoot[class*='MuiInput-root']
    .MuiAutocomplete-input:first-child {
    padding: 0 0 0 4px;
    margin-bottom: -1.5px;
  }
`;

export const Value = styled.div`
  width: 11%;
  max-width: 120px;

  .MuiFormControl-root {
    width: 100%;
  }

  label {
    line-height: 0px;
    margin-left: 2px;
    font-size: 12px;
  }

  .MuiInputLabel-formControl {
    transform: translate(0px, 17px) scale(1.1);
  }
  .MuiInputLabel-shrink {
    transform: translate(1px, 1.5px) scale(0.9);
  }

  #date-picker-dialog-helper-text,
  #date-picker-inline-helper-text {
    display: none;
  }

  .MuiInputBase-input {
    font-size: 0.8rem;
    height: 1.95em;
    padding: 0px 25px 0 4px;
    margin-bottom: -1px;
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

export const Status = styled.div<StatusProps>`
  width: 8%;
  max-width: 80px;

  .MuiListItem-root.Mui-selected,
  .MuiListItem-root.Mui-selected:hover {
    background-color: #222;
  }

  .MuiFormControl-root {
    width: 100%;
    margin: 0;
  }

  .MuiInput-underline::after {
    border-color: ${({ color }) => color};
  }

  .MuiFormLabel-root.Mui-focused {
    color: ${({ color }) => color};
  }

  label {
    line-height: 0px;
    margin-left: 2px;
    font-size: 12px;
  }

  .MuiInputBase-input {
    font-size: 0.9rem;
    height: 1.55em;
    padding: 0px 30px 0 4px;
    margin-bottom: -3px;
    display: flex;
    justify-content: center;
  }

  .MuiInputLabel-formControl {
    transform: translate(1px, 24px) scale(1.1);
  }
  .MuiInputLabel-shrink {
    transform: ${({ value }) =>
      value
        ? 'translate(0.5px, 8px) scale(0.9)'
        : 'translate(1px, 24px) scale(1.1)'};
  }

  .MuiSelect-icon {
    top: calc(50% - 15px);
    margin-right: 2px;
  }

  .MuiSelect-select:focus {
    background: transparent;
  }
`;
