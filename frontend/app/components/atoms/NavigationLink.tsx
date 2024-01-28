'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/app/components/atoms/Icon';
import { css } from '@/styled/css';
import type { FC } from 'react';

type Props = {
  href: string;
  text: string;
  icon?: React.ReactElement;
};

export const NavigationLink: FC<Props> = ({ href, text, icon }) => {
  const pathname = usePathname();
  const current = pathname?.includes(href);

  return (
    <Link
      href={href}
      className={css({
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 'sm',
        borderRadius: 'full',
        py: 'sm',
        px: 'lg',
        bgColor: current ? 'surface.container-highest' : 'transparent',
        _hover: {
          bgColor: 'surface.container-highest',
        },
      })}
    >
      {icon && <Icon source={icon} width="20px" height="20px" />}
      {text}
    </Link>
  );
};
