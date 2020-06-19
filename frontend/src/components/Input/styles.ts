import styled from 'styled-components';

import MaterialTooltip from '../MaterialTooltip';

interface InputProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<InputProps>`
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  border: 1px solid ${({ isFocused }) => (isFocused ? '#222' : '#fff')};
  transition: all 0.2s;

  > svg {
    margin: 10px 14px;
    color: ${({ isFocused, isFilled }) =>
      isFocused || isFilled ? '#222' : '#ccc'};
    transition: all 0.2s;
  }

  input {
    width: 100%;
    color: #333;
    background-color: transparent;
    flex: 1;
    padding: 10px 0;
    border: none;

    &::placeholder {
      color: #ccc;
    }
  }

  & + div {
    margin-top: 10px;
  }
`;

export const Tooltip = styled(MaterialTooltip)`
  height: 20px;

  svg {
    color: #c53030;
    margin: 0 12px 0 10px;
  }
`;
