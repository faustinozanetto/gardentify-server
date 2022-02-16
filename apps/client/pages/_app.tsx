import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

const GardentifyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Component />
    </ChakraProvider>
  );
};

export default GardentifyApp;
