import Image from 'next/image';
import { Card } from '@/app/components/atoms/Card';
import { LoginForm } from '@/app/components/organisms/admin/LoginForm';
import { css } from '@/styled/css';

export default async function Page() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '50px',
        pt: '100px',
      })}
    >
      <Image
        src="/ham_media_logo.png"
        alt="ハムメディアロゴ"
        width="200"
        height="200"
        priority={true}
      />
      <Card
        className={css({
          width: '90%',
          maxWidth: '400px',
          p: '2xl',
        })}
      >
        <LoginForm />
      </Card>
    </div>
  );
}
