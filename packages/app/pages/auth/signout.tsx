import AppLogo from '@/assets/logo/white.png';
import { authPath } from '@/services/Navigaion';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70svh',
        flexDirection: 'column',
        marginTop: '10svh',
        gap: '3rem',
      }}
    >
      <Fade in={true} timeout={{ enter: 3000 }}>
        <Image src={AppLogo} alt='Application Logo' width={200} height={200} style={{ borderRadius: '100%' }} />
      </Fade>
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
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return { redirect: { destination: authPath.signIn() } };
  }

  return {
    props: {},
  };
}
