import finished from '@/assets/done.json';
import Content from '@/components/atom/Content';
import Link from '@/components/atom/Link';
import { MosaicCheckedContext } from '@/pages/_app';
import { getFinished } from '@/services/fetcher';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Lottie from 'lottie-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

/**
 * Mosaic Auth
 */
export default function Mosaic(): JSX.Element {
  const session = useSession();
  const router = useRouter();
  const context = React.useContext(MosaicCheckedContext);
  const { data, error } = useSWR('get-finished', getFinished);

  if (error) throw new Error();

  // if (session.status === 'loading') {
  //   return <div />;
  // }

  // if (session.status === 'unauthenticated') {
  //   router.push('/');
  //   return <div />;
  // }

  // if (session.status === 'authenticated' && !context.isMosaicChecked) {
  //   router.push('/mosaic');
  //   return <div />;
  // }

  return (
    <Content>
      <Grid item xs={12}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Lottie animationData={finished} style={{ height: '300px' }} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ maxWidth: '300px' }}>
            <Typography variant='h6' align='left'>
              Finished!! &#129516;
            </Typography>
            <Typography variant='subtitle1' align='left' gutterBottom>
              Please close this screen. You can now enter the secret room on discord.
            </Typography>
            <Link href={data?.callback || '/'}>go back discord</Link>
          </div>
        </div>
      </Grid>
    </Content>
  );
}
