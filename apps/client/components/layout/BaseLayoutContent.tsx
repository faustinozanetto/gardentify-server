import { Container } from '@chakra-ui/react';
import React from 'react';

interface BaseLayoutContent {
  children: React.ReactNode;
}

const BaseLayoutContent: React.FC<BaseLayoutContent> = (props) => {
  return <Container>{props.children}</Container>;
};

export default BaseLayoutContent
