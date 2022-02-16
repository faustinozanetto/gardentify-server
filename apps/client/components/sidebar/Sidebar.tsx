import { Container, Text, Flex } from '@chakra-ui/react';
import useMediaQuery from 'apps/client/hooks/useMediaQuery';
import SidebarButton from './SidebarButton';

interface SidebarProps {}

interface SidebarButtonData {
  name: string;
  href: string;
  // TODO: set proper icon type.
  icon: any;
}

const SidebarButtons: SidebarButtonData[] = [
  {
    name: 'Home',
    href: '/',
    icon: 'home',
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
  },
];

const Sidebar: React.FC<SidebarProps> = (props) => {
  const isSmallOrLess = useMediaQuery('(max-width: 30em');
  const isMediumOrMore = useMediaQuery('(min-width: 80em');

  return (
    <Flex
      as="nav"
      display={isSmallOrLess ? 'none' : 'flex'}
      flexDir={'column'}
      position={'fixed'}
      float={'left'}
      height={'100%'}
      backgroundColor={'#111827'}
      padding={4}
    >
      {/* Title */}
      <Flex
        flexDir={'row'}
        justifyContent={'center'}
        alignContent={'center'}
        alignItems={'center'}
        marginBottom={4}
      >
        <Text
          as={'h1'}
          fontWeight={700}
          fontSize={'1.75rem'}
          color={'white'}
          textAlign={'center'}
        >
          Gardentify
        </Text>
      </Flex>
      {/* Buttons */}
      <Flex flexDir={'column'} flexGrow={1} alignItems={'center'}>
        {SidebarButtons.map((link, index) => {
          return (
            <SidebarButton key={index} label={link.name} href={link.href} />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
