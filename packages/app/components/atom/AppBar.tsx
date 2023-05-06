import { authPath } from '@/services/Navigaion';
import MuiAppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { MdMenu } from 'react-icons/md';

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
          Mosaic AuthZ
        </Typography>
        <Button variant='outlined' onClick={handleAuth}>
          {session.status === 'authenticated' ? 'Sign Out' : session.status === 'loading' ? 'Loading...' : 'Sign In'}
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
}
