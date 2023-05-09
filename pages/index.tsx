import authentication from '@/assets/authentication.json';
import Content from '@/components/atom/Content';
import { MosaicCheckedContext } from '@/pages/_app';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Lottie from 'lottie-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

/**
 * Application Home
 */
export default function Home(): JSX.Element {
  const session = useSession();
  const router = useRouter();
  const context = React.useContext(MosaicCheckedContext);

  if (session.status === 'loading') {
    return <div />;
  }

  if (session.status === 'authenticated') {
    if (context.isMosaicChecked) {
      router.push('/finish');
    }
    router.push('/mosaic');
    return <div />;
  }

  return (
    <Content>
      <Grid item xs={12} sm={12} md={6}>
        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'center', md: 'flex-end' } }}>
          <Lottie animationData={authentication} style={{ height: '300px' }} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', sm: 'center', md: 'flex-start' },
          }}
        >
          <Button LinkComponent={Link} href={'/auth/signin'} style={{ maxWidth: '300px' }} fullWidth>
            Login
          </Button>
          <div style={{ height: '1rem' }} />
          <Typography
            variant='body1'
            color='textSecondary'
            sx={{ textAlign: { xs: 'center', sm: 'center', md: 'start' } }}
          >
            discord account required.
          </Typography>
          <Typography
            variant='body1'
            color='textSecondary'
            sx={{ textAlign: { xs: 'center', sm: 'center', md: 'start' } }}
          >
            This authentication works only with PC browsers.
          </Typography>
        </Box>
      </Grid>
    </Content>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
