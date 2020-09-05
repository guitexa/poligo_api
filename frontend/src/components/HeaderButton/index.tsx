import React from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface HeaderButtonProps {
  icon: string | React.ComponentType<IconBaseProps>;
  color: string;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  icon,
  icon: Icon,
  color,
}) => {
  return (
    <Container color={color}>
      {typeof icon === 'string' ? (
        <img src={icon} alt="" />
      ) : (
        <Icon size={18} />
      )}
    </Container>
  );
};

export default HeaderButton;
