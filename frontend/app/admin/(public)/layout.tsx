import { css } from '@/styled/css';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div
      className={css({
        bgColor: 'background.main',
        minH: '100vh',
        color: 'background.on-main',
      })}
    >
      {children}
    </div>
  );
}
