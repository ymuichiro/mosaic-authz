import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Content(props: Props): JSX.Element {
  return (
    <>
      <Toolbar />
      <Container maxWidth={'xl'}>
        <div
          style={{
            height: 'calc(100svh - 64px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={5}
            rowGap={5}
            style={{ width: '100%' }}
          >
            {props.children}
          </Grid>
        </div>
      </Container>
    </>
  );
}
