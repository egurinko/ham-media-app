'use client';

import { Alert } from '@/app/components/atoms/Alert';
import { Button } from '@/app/components/atoms/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <Alert visual="error">{error.message}</Alert>
      <Button onClick={() => reset()} visual="tonal">
        もう一度削除してみる
      </Button>
    </div>
  );
}
