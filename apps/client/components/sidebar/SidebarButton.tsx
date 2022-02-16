import { Button, HStack, Text, Tooltip } from '@chakra-ui/react';
import useMediaQuery from 'apps/client/hooks/useMediaQuery';

interface SidebarButtonProps {
  label: string;
  href: string;
  onClick?: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = (props) => {
  const isMediumOrMore = useMediaQuery('(min-width: 80em');

  return (
    <Tooltip
      label={props.label}
      placement={'right'}
      aria-label={props.label}
      isDisabled={isMediumOrMore}
    >
      <Button
        as={'a'}
        variant={'ghost'}
        borderRadius={'md'}
        size={'lg'}
        color={'white'}
        width={'100%'}
        justifyContent={'center'}
        href={props.href}
      >
        <HStack alignItems={'center'}>
          {isMediumOrMore && <Text>{props.label}</Text>}
        </HStack>
      </Button>
    </Tooltip>
  );
};

export default SidebarButton;
