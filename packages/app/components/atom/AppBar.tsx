import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { MdMenu } from 'react-icons/md';
import { useRouter } from 'next/router';
import { authPath } from '@/services/Navigaion';
import { useSession } from 'next-auth/react';

export default function AppBar() {
  const router = useRouter();
  const session = useSession();

  const handleAuth = () => {
    if (session.status === 'authenticated') {
      router.push(authPath.signOut());
    } else if (session.status === 'unauthenticated') {
      router.push(authPath.signIn());
    }
  };

  return (
    <MuiAppBar position='fixed'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
          <MdMenu />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Button variant='outlined' onClick={handleAuth}>
          {session.status === 'authenticated' ? 'Sign Out' : session.status === 'loading' ? 'Loading...' : 'Sign In'}
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
}
