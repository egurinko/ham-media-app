import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import { memo } from 'react';
import type { FC } from 'react';

type Props = {
  href: string;
  title: string;
  isCurrentPath: boolean;
  icon?: React.ReactElement;
};

const NavigationLink: FC<Props> = ({ href, title, isCurrentPath, icon }) => (
  <Link href={href}>
    <a>
      <Box
        display="flex"
        alignItems="center"
        fill={isCurrentPath ? 'primary.main' : 'text.main'}
        color={isCurrentPath ? 'primary.main' : undefined}
        _hover={{
          fill: 'primary.main',
          color: 'primary.main',
        }}
      >
        {icon ? <Box mr="2">{icon}</Box> : null}
        {title}
      </Box>
    </a>
  </Link>
);

const Memoed = memo(NavigationLink);

export { Memoed as NavigationLink };
