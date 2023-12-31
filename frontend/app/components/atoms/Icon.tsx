import * as React from 'react';
import { css } from '@/styled/css';
import type { PropertyValue } from '@/styled/types/prop-type';
import type { FC } from 'react';

type Props = {
  source: React.ReactElement;
  width?: PropertyValue<'width'>;
  height?: PropertyValue<'height'>;
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
