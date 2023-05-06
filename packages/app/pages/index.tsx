import authentication from '@/assets/authentication.json';
import { authPath } from '@/services/Navigaion';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Lottie from 'lottie-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { getActivePublicKey, isAllowedSSS, requestSignEncription, setMessage } from 'sss-module';

/**
 * Application Home
 */
export default function Home(): JSX.Element {
  const session = useSession();
  const [isEnableSSS, setIsEnableSSS] = React.useState<boolean>(false);

  useEffect(() => {
    if (isAllowedSSS()) {
      setIsEnableSSS(true);
    }
  }, []);

  if (session.status === 'authenticated') {
    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100svh',
            flexDirection: 'column',
            gap: '5svh',
          }}
        >
          <Lottie animationData={authentication} style={{ height: '300px' }} />
          <Button
            style={{ maxWidth: '300px' }}
            fullWidth
            disabled={!isEnableSSS}
            onClick={async () => {
              const message = 'Prove me right.';
              const userPublicKey = getActivePublicKey();
              const systemPublicKey = process.env.NEXT_PUBLIC_SYMBOL_ADMIN_PUBLIC_KEY;
              if (!systemPublicKey) throw new Error('NEXT_PUBLIC_SYMBOL_ADMIN_PUBLIC_KEY is not defined');
              setMessage(message, systemPublicKey);
              const { payload } = await requestSignEncription();
              await fetch('/api/authz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userPublicKey, token: payload }),
              });
            }}
          >
            Wallet Auth
          </Button>
          {!isEnableSSS && (
            <Typography color='error' variant='caption' align='center' gutterBottom>
              SSSを右クリックして有効化してください
            </Typography>
          )}
          <Typography variant='body1'>Mosaic の所有を証明します</Typography>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100svh',
            flexDirection: 'column',
            gap: '5svh',
          }}
        >
          <Lottie animationData={authentication} style={{ height: '300px' }} />
          <Button LinkComponent={Link} href={authPath.signIn()} style={{ maxWidth: '300px' }} fullWidth>
            Login
          </Button>
          <Typography variant='body1'>まずは discord で認証して下さい</Typography>
        </div>
      </>
    );
  }
}
