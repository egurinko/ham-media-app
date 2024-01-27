import { Fragment } from 'react';
import { Breadcrumb } from '@/app/components/atoms/Breadcrumb';
import { BreadcrumbIcon } from '@/app/components/atoms/BreadcrumbIcon';
import { css } from '@/styled/css';
import { Typography } from '../atoms/Typography';
import type { FC } from 'react';

type Props = {
  breadcrumbs: { title: string; href?: string }[];
};

export const Breadcrumbs: FC<Props> = ({ breadcrumbs }) => (
  <div
    className={css({
      display: 'flex',
      alignItems: 'center',
      gap: 'xs',
    })}
  >
    {breadcrumbs.map((breadcrumb) => {
      if (!breadcrumb.href) {
        return (
          <Typography variant="body1" bold={true} key={breadcrumb.title}>
            {breadcrumb.title}
          </Typography>
        );
      }
      return (
        <Fragment key={breadcrumb.title}>
          <Breadcrumb text={breadcrumb.title} href={breadcrumb.href} />
          <BreadcrumbIcon />
        </Fragment>
      );
    })}
  </div>
);
