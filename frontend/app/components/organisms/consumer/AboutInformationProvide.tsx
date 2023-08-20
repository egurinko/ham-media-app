import { List } from '@/app/components/atoms/List';
import { Typography } from '@/app/components/atoms/Typography';
import { TitleCard } from '@/app/components/molecules/TitleCard';
import { css } from '@/styled/css';
import type { FC } from 'react';

type Props = Record<string, never>;

export const AbountInformationProvide: FC<Props> = () => (
  <TitleCard title="情報提供について">
    <div>
      <Typography variant="body1" display="inline">
        掲載されている病院、掲載されていない病院について何か情報がありましたら、
      </Typography>
      <a
        className={css({ color: 'primary.main', display: 'inline' })}
        href="https://ham-media.net/contactus/"
      >
        お問い合わせ
      </a>
      <Typography variant="body1" display="inline">
        より情報をご提供いただけると幸いです。
      </Typography>
    </div>
    <div className={css({ mt: '4' })}>
      <Typography variant="body1">以下の情報は即時反映いたします。</Typography>
      <List listStyleType="circle">
        <li>掲載されていない病院</li>
        <li>掲載されている病院のハムスター取扱有無（取扱をやめたなど）</li>
      </List>
    </div>
    <div className={css({ mt: '4' })}>
      <Typography variant="body1">
        以下の情報は一旦ハムメディア内部で蓄積します。蓄積した情報をもとに議論・調査を重ねた上で反映を行いますので時間を要します。
      </Typography>
      <List listStyleType="circle">
        <li>掲載されている病院の善し悪し</li>
      </List>
    </div>
  </TitleCard>
);
