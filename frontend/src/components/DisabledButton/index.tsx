import React from 'react';

import { Container } from './styles';

const DisabledButton: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default DisabledButton;
