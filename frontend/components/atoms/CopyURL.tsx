import { LinkIcon } from '@chakra-ui/icons';
import { useClipboard, Button } from '@chakra-ui/react';
import { useState } from 'react';

const CopyURL: React.FC<NoProps> = () => {
  const [copyingText, _setCopyingText] = useState(location.href);
  const { hasCopied, onCopy } = useClipboard(copyingText);

  return (
    <Button float="right" size="sm" leftIcon={<LinkIcon />} onClick={onCopy}>
      {hasCopied ? 'コピー完了' : 'URLをコピー'}
    </Button>
  );
};

export { CopyURL };
