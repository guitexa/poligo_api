import React from 'react';
import { IconBaseProps } from 'react-icons';

import { FaPlus } from 'react-icons/fa';

import { Container } from './styles';

interface HeaderButtonAddProps {
  icon: string | React.ComponentType<IconBaseProps>;
  color: string;
}

const HeaderButtonAdd: React.FC<HeaderButtonAddProps> = ({
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
      <div>
        <FaPlus size={6} color={color} />
      </div>
    </Container>
  );
};

export default HeaderButtonAdd;
