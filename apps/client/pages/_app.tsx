import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { appWithTranslation } from 'next-i18next';

const GardentifyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Component />
    </ChakraProvider>
  );
};

export default appWithTranslation(GardentifyApp);
