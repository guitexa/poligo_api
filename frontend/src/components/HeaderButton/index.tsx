import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { FaPlus } from 'react-icons/fa';

import { Container } from './styles';

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string | React.ComponentType<IconBaseProps>;
  color: string;
  add?: boolean;
  show: boolean;
  handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  children,
  icon,
  icon: Icon,
  color,
  add,
  show,
  handleClick,
  ...rest
}) => {
  return (
    <>
      {show && (
        <Container color={color} {...rest} onClick={handleClick}>
          {typeof icon === 'string' ? (
            <img src={icon} alt="" />
          ) : (
            <Icon size={21} />
          )}
          {add && (
            <div>
              <FaPlus size={6} color={color} />
            </div>
          )}
          {children}
        </Container>
      )}
    </>
  );
};

export default HeaderButton;
