import Image from 'next/image';
import { Icon } from '@/app/components/atoms/Icon';
import { Typography } from '@/app/components/atoms/Typography';
import SearchIcon from '@/assets/search.svg';
import { css } from '@/styled/css';
import type { FC } from 'react';

export const Hero: FC<NoProps> = () => (
  <>
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        m: { base: 'sm', md: 'md' },
        mb: { base: 'md', md: 'xl' },
      })}
    >
      <Image
        src="/hamster_reading.png"
        alt="ハムスターの読書"
        width={105}
        height={60}
        priority={true}
      />
      <div>
        <Typography
          bold={true}
          className={css({
            mb: 1,
          })}
          variant="headlineS"
        >
          ハムスター受付病院
        </Typography>
        <div
          className={css({
            bgColor: 'primary.main',
            color: 'white',
            px: 'xs',
            borderRadius: 'sm',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'xs',
          })}
        >
          <Typography bold={true} variant="subhead">
            検索
          </Typography>
          <Icon source={<SearchIcon />} width={18} height={18} />
        </div>
      </div>
    </div>
    <div
      className={css({
        mb: 'xs',
        color: 'text.secondary',
        textAlign: 'center',
      })}
    >
      <Typography bold={true} variant="body2" display="block">
        症状が改善されない場合は、
      </Typography>
      <Typography bold={true} variant="body2" display="block">
        セカンドオピニオンもご検討ください
      </Typography>
    </div>
  </>
);
