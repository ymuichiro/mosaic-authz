import AppLogo from '@/assets/logo/white.png';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next/types';
import { rootPath } from '@/services/Navigaion';

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const logoSwitch = (providerName: string) => {
    switch (providerName) {
      case 'GitHub':
        return 'https://authjs.dev/img/providers/github.svg';
      default:
        return 'https://authjs.dev/img/providers/github.svg';
    }
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
              SignIn
            </Typography>
            <Divider style={{ width: '100%' }} />
            {Object.values(providers).map((provider) => (
              <Button
                fullWidth
                key={provider.name}
                style={{ justifyContent: 'flex-start' }}
                color='neutral'
                onClick={() => signIn(provider.id, { callbackUrl: rootPath.home() })}
              >
                <Image src={logoSwitch(provider.name)} alt={provider.name} width={20} height={20} />
                Sign in with {provider.name}
              </Button>
            ))}
          </CardContent>
        </Card>
      }
    </div>
  );
}

export async function getServerSideProps(_: GetServerSidePropsContext) {
  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
