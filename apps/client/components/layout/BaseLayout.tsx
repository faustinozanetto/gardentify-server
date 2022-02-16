import { Box, Flex, Grid } from '@chakra-ui/react';
import Sidebar from '../sidebar/Sidebar';
import BaseLayoutContent from './BaseLayoutContent';
import BaseLayoutHead, { BaseLayoutHeadProps } from './BaseLayoutHead';

interface BaseLayoutProps {
  children: React.ReactNode;
  headProps: BaseLayoutHeadProps;
}

const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
  return (
    <Grid role="main" gridTemplateRows={'1fr'} minHeight="100vh">
      {/* SEO Head */}
      <BaseLayoutHead {...props.headProps} />
      {/* Sidebar */}
      <Box position={'relative'}>
        <Sidebar />
      </Box>

      {/* Main content */}
      <Flex flexDir={'column'} minHeight="100vh">
        <BaseLayoutContent>{props.children}</BaseLayoutContent>
      </Flex>
    </Grid>
  );
};

export default BaseLayout;
