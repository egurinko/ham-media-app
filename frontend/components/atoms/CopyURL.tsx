import { LinkIcon } from '@chakra-ui/icons';
import { useClipboard, Button } from '@chakra-ui/react';
import { useState, memo } from 'react';
import type { FC } from 'react';

const CopyURL: FC<NoProps> = () => {
  const [copyingText, _setCopyingText] = useState(location.href);
  const { hasCopied, onCopy } = useClipboard(copyingText);

  return (
    <Button float="right" size="sm" leftIcon={<LinkIcon />} onClick={onCopy}>
      {hasCopied ? 'コピー完了' : 'URLをコピー'}
    </Button>
  );
};

const Memoed = memo(CopyURL);

export { Memoed as CopyURL };
