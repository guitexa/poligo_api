import React, { InputHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputAsTextProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const InputAsText: React.FC<InputAsTextProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { error, fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error}>
      <input ref={inputRef} {...rest} />
    </Container>
  );
};

export default InputAsText;
