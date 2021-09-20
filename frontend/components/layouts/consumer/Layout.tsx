import Head from './Head';
import Footer from './Footer';

type Props = {
  title?: string;
};

const Layout: React.FC<Props> = ({ title = 'Ham ω Media', children }) => (
  <div>
    <Head title={title} />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
