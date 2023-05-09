import AppLogo from '@/assets/logo/logo.png';
import Content from '@/components/atom/Content';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getServerSession } from 'next-auth/next';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import type { GetServerSidePropsContext } from 'next/types';
import { authOptions } from '../api/auth/[...nextauth]';

export default function SignOut() {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <Content>
      <Grid item xs={12}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Fade in={true} timeout={{ enter: 3000 }}>
            <Image src={AppLogo} alt='Application Logo' width={200} height={200} style={{ borderRadius: '100%' }} />
          </Fade>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {
            <Card elevation={1} style={{ width: '90%', maxWidth: '250px' }}>
              <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Typography variant='h6' align='center'>
                  SignOut
                </Typography>
                <Divider style={{ width: '100%' }} />
                <Typography variant='caption' color='textSecondary' align='center'>
                  Are you sure you want to sign out?
                </Typography>
                <Button color='error' onClick={handleSignOut}>
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          }
        </div>
      </Grid>
    </Content>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return { redirect: { destination: '/auth/signin' } };
  }

  return {
    props: {},
  };
}
