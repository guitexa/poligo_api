import React from 'react';
import { IconBaseProps } from 'react-icons';
import { Link } from 'react-router-dom';

import { Container } from './styles';

interface HeaderButtonProps {
  icon: string | React.ComponentType<IconBaseProps>;
  color: string;
  link: string;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  icon,
  icon: Icon,
  color,
  link,
}) => {
  return (
    <Link to={link}>
      <Container color={color}>
        {typeof icon === 'string' ? (
          <img src={icon} alt="" />
        ) : (
          <Icon size={21} />
        )}
      </Container>
    </Link>
  );
};

export default HeaderButton;
