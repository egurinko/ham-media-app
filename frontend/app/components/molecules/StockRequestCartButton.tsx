'use client';

import Link from 'next/link';
import { Icon } from '@/app/components/atoms/Icon';
import { IconButton } from '@/app/components/atoms/IconButton';
import { Typography } from '@/app/components/atoms/Typography';
import { useCart } from '@/app/utils/hooks/useCart';
import CartIcon from '@/assets/cart.svg';
import { css } from '@/styled/css';
import { ADMIN_STOCK_REQUESTS_NEW_PATH } from '@/utils/routes';
import type { FC } from 'react';

export const StockRequestCartButton: FC<NoProps> = () => {
  const { count } = useCart();

  return (
    <Link
      href={ADMIN_STOCK_REQUESTS_NEW_PATH}
      passHref
      className={css({
        position: 'fixed',
        right: '20px',
        bottom: '20px',
      })}
    >
      <IconButton
        visual="tonal"
        className={css({
          position: 'relative',
          boxShadow: 'xs',
        })}
      >
        <Icon source={<CartIcon />} width={35} height={35} />
        <Typography
          variant="body2"
          bold
          className={css({
            position: 'absolute',
            top: '5px',
          })}
        >
          {count}
        </Typography>
      </IconButton>
    </Link>
  );
};
