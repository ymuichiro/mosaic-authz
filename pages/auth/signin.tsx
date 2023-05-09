import discord from '@/assets/logo/discord.svg';
import AppLogo from '@/assets/logo/logo.png';
import Content from '@/components/atom/Content';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next/types';

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
                  SignIn
                </Typography>
                <Divider style={{ width: '100%' }} />
                {Object.values(providers).map((provider) => (
                  <Button
                    fullWidth
                    key={provider.name}
                    style={{ justifyContent: 'flex-start' }}
                    color='neutral'
                    onClick={() => signIn(provider.id, { callbackUrl: '/mosaic' })}
                  >
                    <Image src={discord} alt={provider.name} width={20} height={20} />
                    Sign in with {provider.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          }
        </div>
      </Grid>
    </Content>
  );
}

export async function getServerSideProps(_: GetServerSidePropsContext) {
  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
