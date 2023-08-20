import { css } from '@/styled/css';
import { Footer } from './Footer';
import { Header } from './Header';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div
      className={css({
        bgColor: 'background.main',
        minH: '100vh',
      })}
    >
      <Header />
      <div className={css({ p: 2, maxW: '800px', mx: 'auto' })}>
        <main className={css({ my: 4 })}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
