import { css } from '@/styled/css';
import type { FC, PropsWithChildren } from 'react';

type Props = {
  listStyleType?: 'circle' | 'disc' | 'square';
};

export const List: FC<PropsWithChildren<Props>> = ({
  children,
  listStyleType,
}) => <ul className={css({ listStyleType, ml: '5' })}>{children}</ul>;
