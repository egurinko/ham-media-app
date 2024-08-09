import * as React from 'react';
import { css } from '@/styled/css';
import type { SystemProperties } from '@/styled/types/style-props';
import type { FC } from 'react';

type Props = {
  source: React.ReactElement;
  width?: SystemProperties['width'];
  height?: SystemProperties['height'];
};

export const Icon: FC<Props> = ({ source, width, height }) => {
  const icon = React.cloneElement(source);

  return (
    <div
      className={css({
        display: 'inline-block',
        verticalAlign: 'middle',
        width,
        height,
      })}
    >
      {icon}
    </div>
  );
};
