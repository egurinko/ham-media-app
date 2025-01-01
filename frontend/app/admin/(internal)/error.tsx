'use client';

import { Alert } from '@/app/components/atoms/Alert';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <Alert visual="error">{error.message}</Alert>
    </div>
  );
}
