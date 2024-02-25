import { NavigationLink } from '@/app/components/atoms/NavigationLink';
import { Typography } from '@/app/components/atoms/Typography';
import HospitalIcon from '@/assets/hospital.svg';
import UserProfileIcon from '@/assets/user_profile.svg';
import { css } from '@/styled/css';
import {
  ADMIN_INTERNAL_USERS_PATH,
  ADMIN_HOSPIALS_PATH,
  ADMIN_MAKERS_PATH,
  ADMIN_PRODUCTS_PATH,
  ADMIN_PRODUCT_TAG_GROUPS_PATH,
  ADMIN_STOCK_REQUESTS_PATH,
} from '@/utils/routes';
import type { FC } from 'react';

export const Navigation: FC<NoProps> = () => (
  <nav
    className={css({
      width: '100%',
    })}
  >
    <ul
      className={css({
        width: '100%',
        display: 'flex',
        flexDir: 'column',
        alignItems: 'flex-start',
        gap: 'md',
      })}
    >
      <li
        className={css({
          width: '100%',
        })}
      >
        <NavigationLink
          href={ADMIN_INTERNAL_USERS_PATH}
          text="ユーザ"
          icon={<UserProfileIcon />}
        />
      </li>
      <li
        className={css({
          width: '100%',
        })}
      >
        <NavigationLink
          href={ADMIN_HOSPIALS_PATH}
          text="病院"
          icon={<HospitalIcon />}
        />
      </li>
      <li
        className={css({
          width: '100%',
        })}
      >
        <Typography
          variant="subhead"
          className={css({
            pl: 'sm',
            pb: 'xs',
          })}
        >
          在庫管理
        </Typography>
        <ul
          className={css({
            width: '100%',
            display: 'flex',
            flexDir: 'column',
            alignItems: 'flex-start',
            gap: 'xs',
          })}
        >
          <li
            className={css({
              width: '100%',
            })}
          >
            <NavigationLink href={ADMIN_MAKERS_PATH} text="メーカー" />
          </li>
          <li
            className={css({
              width: '100%',
            })}
          >
            <NavigationLink href={ADMIN_PRODUCTS_PATH} text="商品" />
          </li>
          <li
            className={css({
              width: '100%',
            })}
          >
            <NavigationLink
              href={ADMIN_PRODUCT_TAG_GROUPS_PATH}
              text="商品タグ"
            />
          </li>
          <li
            className={css({
              width: '100%',
            })}
          >
            <NavigationLink
              href={ADMIN_STOCK_REQUESTS_PATH}
              text="在庫リクエスト"
            />
          </li>
        </ul>
      </li>
    </ul>
  </nav>
);
