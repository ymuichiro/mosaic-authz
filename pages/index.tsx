import Login from '@/components/moleculs/login';
import MosaicAuth from '@/components/moleculs/mosaic-auth';
import { useSession } from 'next-auth/react';

/**
 * Application Home
 */
export default function Home(): JSX.Element {
  const session = useSession();

  if (session.status === 'authenticated') {
    return <MosaicAuth />;
  } else {
    return <Login />;
  }
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
