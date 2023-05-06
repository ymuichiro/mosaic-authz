import authentication from '@/assets/authentication.json';
import { authPath } from '@/services/Navigaion';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Lottie from 'lottie-react';
import Link from 'next/link';

export default function Login(): JSX.Element {
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
