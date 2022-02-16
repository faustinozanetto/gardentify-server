import { Text } from '@chakra-ui/react';
import BaseLayout from '../components/layout/BaseLayout';

const Home = () => {
  return (
    <BaseLayout
      headProps={{
        title: 'Home',
        description: 'This is the description of the home page',
        url: '/',
      }}
    >
      <Text>Gardentify</Text>
    </BaseLayout>
  );
};

export default Home;
