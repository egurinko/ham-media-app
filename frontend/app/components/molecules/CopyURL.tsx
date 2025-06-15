'use client';

import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';
import { Button } from '@/app/components/atoms/Button';
import { Icon } from '@/app/components/atoms/Icon';
import LinkIcon from '@/assets/link.svg';
import type { FC } from 'react';

export const CopyURL: FC<NoProps> = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [copyingText, setCopyingText] = useState('');

  useEffect(() => {
    if (window) {
      setCopyingText(window.location.href);
    }
  }, []);

  const handleCopy = () => {
    const didCopy = copy(copyingText);
    setIsCopied(didCopy);
  };

  return (
    <Button type="button" visual="outlined" size="sm" onClick={handleCopy}>
      <Icon source={<LinkIcon />} width="18px" height="18px" />

      {isCopied ? 'コピー完了' : 'URLをコピー'}
    </Button>
  );
};
