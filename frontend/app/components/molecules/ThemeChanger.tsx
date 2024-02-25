'use client';

import { useTheme } from 'next-themes';
import { Icon } from '@/app/components/atoms/Icon';
import { IconButton } from '@/app/components/atoms/IconButton';
import MoonIcon from '@/assets/moon.svg';
import SunIcon from '@/assets/sun.svg';

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      {theme === 'dark' ? (
        <IconButton visual="outlined" onClick={() => setTheme('light')}>
          <Icon source={<SunIcon />} width="20px" height="20px" />
        </IconButton>
      ) : (
        <IconButton visual="outlined" onClick={() => setTheme('dark')}>
          <Icon source={<MoonIcon />} width="20px" height="20px" />
        </IconButton>
      )}
    </div>
  );
};
