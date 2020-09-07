import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { FaPlus } from 'react-icons/fa';

import { Container } from './styles';

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string | React.ComponentType<IconBaseProps>;
  color: string;
  add: boolean;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  children,
  icon,
  icon: Icon,
  color,
  add,
  ...rest
}) => {
  return (
    <Container color={color} {...rest}>
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
  );
};

export default HeaderButton;
