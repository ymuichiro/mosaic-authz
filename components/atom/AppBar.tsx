import LogoDark from '@/assets/logo/logo-wide-dark.png';
import { authPath } from '@/services/Navigaion';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
        <Box sx={{ display: 'flex', flexGrow: 1 }} component={Link} href='/'>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Image src={LogoDark} height={40} width={200} alt='logo' style={{ flexGrow: 1 }} />
          </div>
        </Box>
        <Button variant='outlined' onClick={handleAuth}>
          {session.status === 'authenticated' ? 'Sign Out' : session.status === 'loading' ? 'Loading...' : 'Sign In'}
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
}
