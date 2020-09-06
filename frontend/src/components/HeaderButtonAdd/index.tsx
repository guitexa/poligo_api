import React from 'react';
import { IconBaseProps } from 'react-icons';
import { Link } from 'react-router-dom';

import { FaPlus } from 'react-icons/fa';

import { Container } from './styles';

interface HeaderButtonAddProps {
  icon: string | React.ComponentType<IconBaseProps>;
  color: string;
  link: string;
}

const HeaderButtonAdd: React.FC<HeaderButtonAddProps> = ({
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
        <div>
          <FaPlus size={6} color={color} />
        </div>
      </Container>
    </Link>
  );
};

export default HeaderButtonAdd;
