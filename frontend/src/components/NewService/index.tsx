import React, { useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { Container, ModalContainer, Content } from './styles';

interface NewServiceProps {
  setNewServiceOpen(e: boolean): void;
}

const NewService: React.FC<NewServiceProps> = ({ setNewServiceOpen }) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setNewServiceOpen(false));

  function eventKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      setNewServiceOpen(false);
    }
  }
  document.onkeydown = eventKeyDown;

  return (
    <>
      <ModalContainer ref={ref}>
        HelloWorld, HelloWorld, HelloWorld, HelloWorld, HelloWorldHelloWorld,
        HelloWorld, HelloWorld, HelloWorld, HelloWorldHelloWorld, HelloWorld,
        HelloWorld, HelloWorld, HelloWorldHelloWorld, HelloWorld, HelloWorld,
        HelloWorld, HelloWorldHelloWorld, HelloWorld, HelloWorld, HelloWorld,
        HelloWorldHelloWorld, HelloWorld, HelloWorld, HelloWorld,
        HelloWorldHelloWorld, HelloWorld, HelloWorld, HelloWorld,
        HelloWorldHelloWorld, HelloWorld, HelloWorld, HelloWorld,
        HelloWorldHelloWorld, HelloWorld, HelloWorld, HelloWorld,
        HelloWorldHelloWorld, HelloWorld, HelloWorld, HelloWorld, HelloWorld
      </ModalContainer>
      <Container />
    </>
  );
};

export default NewService;
