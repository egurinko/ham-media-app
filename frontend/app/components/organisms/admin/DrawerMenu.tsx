'use client';

import { Button } from '@/app/components/atoms/Button';
import * as Drawer from '@/app/components/atoms/Drawer';
import { Icon } from '@/app/components/atoms/Icon';
import { IconButton } from '@/app/components/atoms/IconButton';
import { NavigationLink } from '@/app/components/atoms/NavigationLink';
import { Typography } from '@/app/components/atoms/Typography';
import BarsIcon from '@/assets/bars.svg';
import HospitalIcon from '@/assets/hospital.svg';
import UserProfileIcon from '@/assets/user_profile.svg';
import XMarkIcon from '@/assets/xmark.svg';
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

type Props = {
  internalUserName: string;
};

export const DrawerMenu: FC<Props> = ({ internalUserName }) => (
  <Drawer.Root>
    <Drawer.Trigger asChild>
      <IconButton visual="text" size="md">
        <Icon source={<BarsIcon />} width="20px" height="20px" />
      </IconButton>
    </Drawer.Trigger>
    <Drawer.Backdrop />
    <Drawer.Positioner>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.CloseTrigger asChild position="absolute" top="3" right="4">
            <IconButton
              size="md"
              visual="tonal"
              className={css({
                color: 'primary.main',
              })}
            >
              <Icon source={<XMarkIcon />} width="16px" height="16px" />
            </IconButton>
          </Drawer.CloseTrigger>
        </Drawer.Header>
        <Drawer.Body
          className={css({
            height: 'inherit',
            px: 'lg',
            pt: '100px',
          })}
        >
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
                <Drawer.CloseTrigger
                  className={css({
                    width: '100%',
                  })}
                >
                  <NavigationLink
                    href={ADMIN_INTERNAL_USERS_PATH}
                    text="ユーザ"
                    icon={<UserProfileIcon />}
                  />
                </Drawer.CloseTrigger>
              </li>
              <li
                className={css({
                  width: '100%',
                })}
              >
                <Drawer.CloseTrigger
                  className={css({
                    width: '100%',
                  })}
                >
                  <NavigationLink
                    href={ADMIN_HOSPIALS_PATH}
                    text="病院"
                    icon={<HospitalIcon />}
                  />
                </Drawer.CloseTrigger>
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
                    <Drawer.CloseTrigger
                      className={css({
                        width: '100%',
                      })}
                    >
                      <NavigationLink
                        href={ADMIN_MAKERS_PATH}
                        text="メーカー"
                      />
                    </Drawer.CloseTrigger>
                  </li>
                  <li
                    className={css({
                      width: '100%',
                    })}
                  >
                    <Drawer.CloseTrigger
                      className={css({
                        width: '100%',
                      })}
                    >
                      <NavigationLink href={ADMIN_PRODUCTS_PATH} text="商品" />
                    </Drawer.CloseTrigger>
                  </li>
                  <li
                    className={css({
                      width: '100%',
                    })}
                  >
                    <Drawer.CloseTrigger
                      className={css({
                        width: '100%',
                      })}
                    >
                      <NavigationLink
                        href={ADMIN_PRODUCT_TAG_GROUPS_PATH}
                        text="商品タグ"
                      />
                    </Drawer.CloseTrigger>
                  </li>
                  <li
                    className={css({
                      width: '100%',
                    })}
                  >
                    <Drawer.CloseTrigger
                      className={css({
                        width: '100%',
                      })}
                    >
                      <NavigationLink
                        href={ADMIN_STOCK_REQUESTS_PATH}
                        text="在庫リクエスト"
                      />
                    </Drawer.CloseTrigger>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <div
            className={css({
              borderTopWidth: 'thin',
              borderColor: 'outline.main',
              mt: '2xl',
              width: '100%',
              textAlign: 'center',
            })}
          >
            <Typography
              variant="body1"
              className={css({
                my: 'md',
              })}
            >
              {internalUserName}
            </Typography>
            <Button visual="outlined">ログアウト</Button>
          </div>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
);
